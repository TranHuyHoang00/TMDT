import db from '../models/index';

let getAllPlaces = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Place.findAll({
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
let CreatePlaces = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền tên địa điểm'
                })
            } else {
                let place = await db.Place.findOne({
                    where: { name: data.name }
                })
                if (place) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Địa điểm đã tồn tại'
                    })
                } else {
                    await db.Place.create({
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
    getAllPlaces: getAllPlaces,
    CreatePlaces: CreatePlaces,
}