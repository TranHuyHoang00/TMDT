import db from '../models/index';

let getAllDetails = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Detail.findAll({
                attributes: ['id', 'description', 'type'],
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
let CreateDetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.description || !data.type) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền đầy đủ thông tin'
                })
            } else {
                await db.Detail.create({
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
let deleteDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id'
                })
            }
            let detail = await db.Plan_detail.findOne({
                where: { detailId: id }
            })
            if (detail) {
                resolve({
                    errCode: 2,
                    errMessage: 'Không thể xóa, Ct_lịch trình này đang ở trong lịch trình'
                })
            } else {
                await db.Detail.destroy({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa thành công'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllDetails: getAllDetails,
    CreateDetail: CreateDetail,
    deleteDetail: deleteDetail,
}