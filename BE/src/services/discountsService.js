import db from '../models/index';

let getAllDiscounts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Discount.findAll({
                attributes: ['id', 'name', 'description', 'value', 'start_date', 'finish_date'],
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
let CreateDiscount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.value) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền đầy đủ thông tin'
                })
            } else {
                await db.Discount.create({
                    name: data.name,
                    description: data.description,
                    value: data.value,
                    start_date: data.start_date,
                    finish_date: data.finish_date,
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
let deleteDiscount = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id'
                })
            }
            let discount = await db.Tour_discount.findOne({
                where: { discountId: id }
            })
            if (discount) {
                resolve({
                    errCode: 2,
                    errMessage: 'Không thể xóa, khuyến mãi này đang ở trong tour'
                })
            } else {
                await db.Discount.destroy({
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
    getAllDiscounts: getAllDiscounts,
    CreateDiscount: CreateDiscount,
    deleteDiscount: deleteDiscount,
}