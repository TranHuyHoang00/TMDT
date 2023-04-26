import db from '../models/index';
import bcrypt from 'bcryptjs';
import randToken from 'rand-token';

import { generateToken, decodeToken } from '../auth/auth'

let login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email },
                include: [
                    { model: db.Role, as: "roles", attributes: ['id'], through: { attributes: [], } },
                    { model: db.Status, attributes: ['id', 'name'] }
                ]
            })
            if (!user) {
                resolve({
                    errCode: 3,
                    errMessage: 'Email không tồn tại'
                })
            } else {
                let checkPassWord = await bcrypt.compareSync(password, user.password);
                let payload = {
                    id: user.id,
                    email: user.email
                }
                if (checkPassWord == true) {
                    // Tạo access token
                    let accessToken = await generateToken(
                        payload,
                        process.env.ACCESS_TOKEN_SECRET,
                        process.env.ACCESS_TOKEN_LIFE
                    );
                    if (!accessToken) {
                        resolve({
                            accessToken: accessToken,
                            errCode: 4,
                            errMessage: 'Tạo access token thất bại'
                        })
                    } else {
                        // tạo refresh token
                        let refreshToken = await generateToken(
                            payload,
                            process.env.REFRESH_TOKEN_SECRET,
                            process.env.REFRESH_TOKEN_LIFE
                        );
                        if (!user.refreshToken) {
                            user.refreshToken = refreshToken,
                                await user.save();
                        } else {
                            refreshToken = user.refreshToken;
                        }
                        resolve({
                            accessToken: accessToken,
                            user: user,
                            errCode: 0,
                            errMessage: 'Đăng nhập thành công'
                        })
                    }
                } else {
                    resolve({
                        errCode: 5,
                        errMessage: 'Mật khẩu không chính xác'
                    })
                }
            }

        } catch (e) {
            reject(e)
        }
    })
}
let refresh = (refreshTokenFromBody, accessTokenFromHeader) => {
    return new Promise(async (resolve, reject) => {
        try {
            let decoded = await decodeToken(
                accessTokenFromHeader,
                process.env.ACCESS_TOKEN_SECRET,
            );
            if (!decoded) {
                resolve({
                    errCode: 3,
                    errMessage: 'Access token không hợp lệ'
                })
            } else {
                let user = await db.User.findOne({
                    where: { email: decoded.payload.email },
                })
                if (!user) {
                    resolve({
                        errCode: 4,
                        errMessage: 'Người dùng không tồn tại'
                    })
                } else {
                    if (refreshTokenFromBody !== user.refreshToken) {
                        resolve({
                            errCode: 5,
                            errMessage: 'Refresh token không hợp lệ'
                        })
                    } else {
                        let accessToken = await generateToken(
                            { email: decoded.payload.email },
                            process.env.ACCESS_TOKEN_SECRET,
                            process.env.ACCESS_TOKEN_LIFE,
                        );
                        if (!accessToken) {
                            resolve({
                                errCode: 6,
                                errMessage: 'Tạo Access token thất bại'
                            })
                        } else {
                            resolve({
                                errCode: 0,
                                errMessage: 'Tạo thành công Access token',
                                accessToken: accessToken
                            })
                        }
                    }
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    login: login,
    refresh: refresh,
}