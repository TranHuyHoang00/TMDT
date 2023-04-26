import db from '../models/index';

let getAllVehicles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Vehicle.findAll({
                attributes: ['id', 'name',],
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
let CreateVehicle = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền tên địa điểm'
                })
            } else {
                let place = await db.Vehicle.findOne({
                    where: { name: data.name }
                })
                if (place) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Phương tiện đã tồn tại'
                    })
                } else {
                    await db.Vehicle.create({
                        name: data.name,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo thành công'
                    })
                }

            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllVehicles: getAllVehicles,
    CreateVehicle: CreateVehicle,
}