import db from '../models/index';
import bcrypt from 'bcryptjs';
//hashpass
const salt = bcrypt.genSaltSync(10);

let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.email && !data.password) {
                resolve({
                    errCode: 5,
                    errMessage: 'Vui lòng nhập mật khẩu'
                })
            }
            if (!data.email && data.password) {
                resolve({
                    errCode: 7,
                    errMessage: 'Vui lòng nhập tài khoản'
                })
            }
            // Tạo tài khoản
            if (data.email && data.password) {
                let check = await db.User.findOne({
                    where: { email: data.email }
                })
                if (check) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Email đã tồn tại'
                    })
                } else {
                    let hashPassWordFromBcrypt = await bcrypt.hashSync(data.password, salt);
                    let user = await db.User.create({
                        email: data.email,
                        password: hashPassWordFromBcrypt,
                        name: data.name,
                        phone: data.phone,
                        address: data.address,
                        cccd: data.cccd,
                        gender: data.gender,
                        dateOfbirth: data.dateOfbirth,
                        statusId: data.statusId,
                        refreshToken: data.refreshToken
                    })
                    if (user) {
                        for (const i of data.listDataRole) {
                            await db.User_role.create({
                                roleId: i.id,
                                userId: user.id
                            })
                        }
                        resolve({
                            errCode: 0,
                            errMessage: 'Tạo thành công tài khoản'
                        })
                    } else {
                        resolve({
                            errCode: 4,
                            errMessage: 'Tạo thất bại'
                        })
                    }
                }
            }
            // Tạo thông tin
            if (!data.email && !data.password) {
                if (!data.name || !data.phone || !data.cccd || !data.statusId) {
                    resolve({
                        errCode: 6,
                        errMessage: 'Vui lòng nhập đầy đủ thông tin'
                    })
                } else {
                    let user = await db.User.create({
                        name: data.name,
                        phone: data.phone,
                        address: data.address,
                        cccd: data.cccd,
                        gender: data.gender,
                        dateOfbirth: data.dateOfbirth,
                        statusId: data.statusId
                    })
                    if (user) {
                        for (const i of data.listDataRole) {
                            await db.User_role.create({
                                roleId: i.id,
                                userId: user.id
                            })
                        }
                        resolve({
                            errCode: 0,
                            errMessage: 'Tạo thành công thông tin'
                        })
                    } else {
                        resolve({
                            errCode: 4,
                            errMessage: 'Tạo thất bại'
                        })
                    }
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllUser = (roleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = []
            if (!roleId) {
                data = await db.User.findAll({
                    attributes: ['id', 'email', 'name', 'phone', 'address', 'cccd', 'gender', 'statusId', 'dateOfbirth', 'createdAt'],
                    include: [
                        { model: db.Role, as: "roles", attributes: ['id', 'name'], through: { attributes: [], } },
                        { model: db.Status, attributes: ['id', 'name'] }
                    ],
                })
            } else {
                data = await db.User.findAll({
                    attributes: ['id', 'email', 'name', 'phone', 'address', 'cccd', 'gender', 'statusId', 'dateOfbirth', 'createdAt'],
                    include: [
                        { model: db.Role, as: "roles", where: { id: roleId }, attributes: ['id', 'name'], through: { attributes: [], } },
                        { model: db.Status, attributes: ['id', 'name'] }
                    ],
                })
            }
            resolve({
                data,
                errCode: 0,
                errMessage: 'Ok',
            })

        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id User'
                })
            }
            await db.User.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                errMessage: 'Xóa người dùng thành công'
            })
        } catch (e) {
            reject(e)
        }
    })
}
let getUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes: ['id', 'email', 'name', 'phone', 'address', 'cccd', 'gender', 'statusId', 'dateOfbirth', 'createdAt'],
                include: [
                    { model: db.Status, attributes: ['id', 'name'] },
                    { model: db.Role, as: "roles", attributes: ['id', 'name'], through: { attributes: [], } },
                ],
            })
            if (data) {
                resolve({
                    data,
                    errCode: 0,
                    errMessage: 'Ok',
                })
            } else {
                resolve({
                    data,
                    errCode: 3,
                    errMessage: 'Không tồn tại người dùng',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu ID người dùng'
                })
            }
            if (data.phone) {
                if (data.phone.length !== 10) {
                    resolve({
                        errCode: 4,
                        errMessage: 'Số điện thoại phải là 10 số'
                    })
                }
            }
            if (data.cccd) {
                if (data.cccd.length !== 12) {
                    resolve({
                        errCode: 5,
                        errMessage: 'Căn cước công dân phải là 12 số'
                    })
                }
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.email = data.email,
                    user.name = data.name,
                    user.phone = data.phone,
                    user.address = data.address,
                    user.cccd = data.cccd,
                    user.gender = data.gender,
                    user.dateOfbirth = data.dateOfbirth,
                    user.statusId = data.statusId,
                    user.refreshToken = data.refreshToken
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Sửa thành công'
                })
            } else {
                resolve({
                    errCode: 3,
                    errMessage: 'Người dùng không tồn tại'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    deleteUser: deleteUser,
    getUser: getUser,
    editUser: editUser,
}