import db from '../models/index';

let getAllTickets = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Ticket.findAll({
                attributes: ['id', 'price', 'type'],
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
let CreateTicket = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.price || !data.type) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền đầy đủ thông tin'
                })
            } else {
                let ticket = await db.Ticket.findOne({
                    where: { price: data.price, type: data.type }
                })
                if (ticket) {
                    resolve({
                        errCode: 3,
                        errMessage: 'Vé này đã tồn tại'
                    })
                }
                await db.Ticket.create({
                    price: data.price,
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
let deleteTicket = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id'
                })
            }
            let ticket = await db.Tour_ticket.findOne({
                where: { ticketId: id }
            })
            if (ticket) {
                resolve({
                    errCode: 2,
                    errMessage: 'Không thể xóa, vé này đang ở trong Tour'
                })
            } else {
                await db.Ticket.destroy({
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
    getAllTickets: getAllTickets,
    CreateTicket: CreateTicket,
    deleteTicket: deleteTicket,
}