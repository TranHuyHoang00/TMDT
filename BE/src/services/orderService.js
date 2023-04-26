import db, { Order } from '../models/index';
import { Op } from "sequelize";
// Create Order
let createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            if (!data.total) {
                resolve({
                    errCode: 3,
                    errMessage: 'Vui lòng chọn vé và số lượng'
                })
            } else {
                if (!data.departure_date) {
                    resolve({
                        errCode: 4,
                        errMessage: 'Vui lòng chọn ngày đi'
                    })
                } else {
                    let user = await db.User.findOne({
                        where: { id: data.customerId, statusId: 2 }
                    })
                    if (user) {
                        resolve({
                            errCode: 6,
                            errMessage: 'Tài khoản bạn đang bị khóa',
                        })
                    } else {
                        let order = await db.Order.create({
                            total: data.total,
                            date_create: data.date_create,
                            departure_date: data.departure_date,
                            statusId: data.statusId,
                            customerId: data.customerId,
                            staffId: data.staffId,
                            paymentId: data.paymentId,
                        })
                        if (order) {
                            for (const i of data.ListTicket) {
                                await db.Order_Tour_ticket.create({
                                    orderId: order.id,
                                    tour_ticket_Id: i.tour_ticket_Id,
                                    quantity: i.quantity,
                                })
                            }
                            resolve({
                                errCode: 0,
                                errMessage: 'Tạo thành công',
                            })
                        } else {
                            resolve({
                                errCode: 5,
                                errMessage: 'Tạo thất bại',
                            })
                        }

                    }
                }
            }



        } catch (e) {
            reject(e)
        }
    })
}
// Get All Order User
let getAllOrderUser = (customerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!customerId) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu Id khách hàng',
                })
            } else {
                let user = await db.User.findOne({
                    where: { id: customerId }
                })
                if (user) {
                    let data = await db.Order.findAll({
                        where: { customerId: customerId },
                        attributes: ['id', 'total', 'departure_date', 'staffId', 'date_create', 'paymentId', 'createdAt'],
                        include: [
                            { model: db.Status, attributes: ['id', 'name'] },
                            { model: db.User, attributes: ['id', 'email', 'name', 'phone', 'address', 'cccd', 'gender', 'dateOfbirth'] },
                            {
                                model: db.Order_Tour_ticket, attributes: ['id', 'quantity'],
                                include: [
                                    {
                                        model: db.Tour_ticket, attributes: ['id'],
                                        include: [
                                            { model: db.Ticket, attributes: ['id', 'price', 'type'], },
                                            { model: db.Tour, attributes: ['id', 'name'], }
                                        ]
                                    }
                                ]
                            },
                        ],
                    })
                    resolve({
                        data,
                        errCode: 0,
                        errMessage: 'Lấy thành công',
                    })
                } else {
                    resolve({
                        errCode: 3,
                        errMessage: 'Người dùng không tồn tại',
                    })
                }

            }
        } catch (e) {
            reject(e)
        }
    })
}
let editOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu Id order'
                })
            }
            let order = await db.Order.findOne({
                where: { id: data.id },
                raw: false
            })
            if (order) {
                order.total = data.total
                order.departure_date = data.departure_date,
                    order.statusId = data.statusId,
                    order.customerId = data.customerId
                order.staffId = data.staffId,
                    order.paymentId = data.paymentId,
                    await order.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Sửa thành công'
                })
            } else {
                resolve({
                    errCode: 3,
                    errMessage: 'Order không tồn tại'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let RevenueStatistics_order = (dateStart, dateFinish) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!dateStart) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng chọn thời gian',
                })
            }
            if (!dateFinish) {
                resolve({
                    errCode: 3,
                    errMessage: 'Vui lòng chọn thời gian',
                })
            }
            let data = await Order.findAll({
                where: {
                    statusId: 5,
                    departure_date: {
                        [Op.gte]: dateStart,
                        [Op.lte]: dateFinish
                    }
                },
                attributes: ['id', 'total', 'departure_date', 'staffId', 'date_create', 'paymentId', 'createdAt'],
                include: [
                    { model: db.Status, attributes: ['id', 'name'] },
                    { model: db.User, attributes: ['id', 'email', 'name', 'phone', 'address', 'cccd', 'gender', 'dateOfbirth'] },
                    {
                        model: db.Order_Tour_ticket, attributes: ['id', 'quantity'],
                        include: [
                            {
                                model: db.Tour_ticket, attributes: ['id'],
                                include: [
                                    { model: db.Ticket, attributes: ['id', 'price', 'type'], },
                                    { model: db.Tour, attributes: ['id', 'name'], }
                                ]
                            }
                        ]
                    },
                ],
            })
            if (data) {
                resolve({
                    data: data,
                    errCode: 0,
                    errMessage: 'Thành công',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllOrderbyStatus = (statusId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!statusId) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu Id Status',
                })
            }
            if (statusId == 'All') {
                let data = await db.Order.findAll({
                    attributes: ['id', 'total', 'departure_date', 'staffId', 'date_create', 'paymentId', 'createdAt'],
                    include: [
                        { model: db.Status, attributes: ['id', 'name'] },
                        { model: db.User, attributes: ['id', 'email', 'name', 'phone', 'address', 'cccd', 'gender', 'dateOfbirth'] },
                        {
                            model: db.Order_Tour_ticket, attributes: ['id', 'quantity'],
                            include: [
                                {
                                    model: db.Tour_ticket, attributes: ['id'],
                                    include: [
                                        { model: db.Ticket, attributes: ['id', 'price', 'type'], },
                                        { model: db.Tour, attributes: ['id', 'name'], }
                                    ]
                                }
                            ]
                        },
                    ],
                })
                resolve({
                    data,
                    errCode: 0,
                    errMessage: 'Lấy thành công',
                })
            } else {
                let data = await db.Order.findAll({
                    where: { statusId: statusId },
                    attributes: ['id', 'total', 'departure_date', 'staffId', 'date_create', 'paymentId', 'createdAt'],
                    include: [
                        { model: db.Status, attributes: ['id', 'name'] },
                        { model: db.User, attributes: ['id', 'email', 'name', 'phone', 'address', 'cccd', 'gender', 'dateOfbirth'] },
                        {
                            model: db.Order_Tour_ticket, attributes: ['id', 'quantity'],
                            include: [
                                {
                                    model: db.Tour_ticket, attributes: ['id'],
                                    include: [
                                        { model: db.Ticket, attributes: ['id', 'price', 'type'], },
                                        { model: db.Tour, attributes: ['id', 'name'], }
                                    ]
                                }
                            ]
                        },
                    ],
                })
                resolve({
                    data,
                    errCode: 0,
                    errMessage: 'Lấy thành công',
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Thiếu id order'
                })
            }
            let data = await db.Order.findOne({
                where: { id: id }
            })
            if (data) {
                if (data.statusId == 5 || data.statusId == 7) {
                    await db.Order.destroy({
                        where: { id: id }
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'Xóa đơn đặt thành công'
                    })
                } else {
                    resolve({
                        errCode: 4,
                        errMessage: 'Không thể xóa đơn đặt'
                    })
                }
            } else {
                resolve({
                    errCode: 3,
                    errMessage: 'Không tồn tại đơn đặt'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createOrder: createOrder,
    getAllOrderUser: getAllOrderUser,
    editOrder: editOrder,
    RevenueStatistics_order: RevenueStatistics_order,
    getAllOrderbyStatus: getAllOrderbyStatus,
    deleteOrder: deleteOrder
}