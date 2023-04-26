const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const verify = promisify(jwt.verify).bind(jwt);
const sign = promisify(jwt.sign).bind(jwt);

// Tạo token
let generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            { payload, },
            secretSignature,
            { algorithm: 'HS256', expiresIn: tokenLife, },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};
// giải mã token
let verifyToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};
// Decode lại token hết hạn
let decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
};
// Xác thực người dùng
let middleware = async (req, res, next) => {
    if (!req.headers.x_authorization) {
        return res.status(401).json({
            errCode: 1,
            errMessage: 'Không tìm thấy access token'
        })
    } else {
        const verified = await verifyToken(
            req.headers.x_authorization,
            process.env.ACCESS_TOKEN_SECRET,
        );
        if (!verified) {
            return res.status(401).json({
                errCode: 2,
                errMessage: 'Access token đã hết hạn hoặc sai Access token'
            })
        } else {
            return next();
        }
    }
};
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    decodeToken: decodeToken,
    middleware: middleware,
}