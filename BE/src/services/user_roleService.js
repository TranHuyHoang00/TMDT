import db from '../models/index';


let createUser_role = (roleId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId && roleId) {
                let check = await db.User_role.findOne({
                    where: { userId: userId, roleId: roleId }
                })
                if (check) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Người dùng đã có phân quyền này'
                    })
                } else {
                    await db.User_role.create({
                        roleId: roleId,
                        userId: userId,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo thành công'
                    })
                }

            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Chưa chọn quyền'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser_role = (roleId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!roleId || !userId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu ID'
                })
            }
            await db.User_role.destroy({
                where: { roleId: roleId, userId: userId }
            })
            resolve({
                errCode: 0,
                errMessage: 'Xóa quyền thành công'
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createUser_role: createUser_role,
    deleteUser_role: deleteUser_role,
}