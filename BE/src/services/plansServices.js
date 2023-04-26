import db from '../models/index';

let getAllPlans = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Plan.findAll({
                attributes: ['id', 'name'],
                include: [
                    { model: db.Detail, as: "details", attributes: ['id', 'type', 'description'], through: { attributes: [], } },
                ],
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
let CreatePlan = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền đầy đủ thông tin'
                })
            } else {
                let plan = await db.Plan.create({
                    name: data.name,
                })
                for (const i of data.listDataDetail) {
                    await db.Plan_detail.create({
                        planId: plan.id,
                        detailId: i.id
                    })
                }
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
let deletePlan = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id'
                })
            }
            let plan = await db.Tour_plan.findOne({
                where: { planId: id }
            })
            if (plan) {
                resolve({
                    errCode: 2,
                    errMessage: 'Không thể xóa, lịch trình này đang ở trong Tour'
                })
            } else {
                await db.Plan_detail.destroy({ where: { planId: id } })
                await db.Plan.destroy({ where: { id: id } })
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
    getAllPlans: getAllPlans,
    CreatePlan: CreatePlan,
    deletePlan: deletePlan,
}