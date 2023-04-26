import db from '../models/index';

let getAllServices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Service.findAll({
                attributes: ['id', 'name', 'description', 'type'],
            })
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
let createService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.description || !data.type) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền đầy đủ thông tin'
                })
            } else {
                await db.Service.create({
                    name: data.name,
                    description: data.description,
                    type: data.type,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo thành công'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let deleteService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id dịch vụ'
                })
            }
            let service = await db.Tour_service.findOne({
                where: { serviceId: id }
            })
            if (service) {
                resolve({
                    errCode: 2,
                    errMessage: 'Không thể xóa, dịch vụ này đang ở trong Tour'
                })
            } else {
                await db.Service.destroy({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa dịch vụ thành công'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let editService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.description || !data.type) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền đầy đủ thông tin'
                })
            }
            let service = await db.Service.findOne({
                where: { id: data.id },
                raw: false
            })
            if (service) {
                service.name = data.name
                service.description = data.description,
                    service.type = data.type,
                    await service.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Sửa thành công'
                })
            } else {
                resolve({
                    errCode: 3,
                    errMessage: 'Dịch vụ không tồn tại'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let createTour_Service = (tourId, serviceId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!tourId || !serviceId) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng chọn Tour'
                })
            } else {
                let check = await db.Tour_service.findOne({
                    where: { tourId: tourId, serviceId: serviceId }
                })
                if (check) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Tour đã có dịch vụ này'
                    })
                } else {
                    await db.Tour_service.create({
                        tourId: tourId,
                        serviceId: serviceId,
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Thêm thành công'
                    })
                }

            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllServices: getAllServices,
    createService: createService,
    deleteService: deleteService,
    editService: editService,

    createTour_Service: createTour_Service,
}