import db from '../models/index';

let getAllRoles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Role.findAll({
                attributes: ['id', 'name'],
            })
            resolve({
                data,
                errCode: 0,
                errMessage: 'Thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllRoles: getAllRoles,
}