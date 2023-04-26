import db from '../models/index';
import { Op } from "sequelize";
let getAllTour = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = []
            if (id == 'All') {
                data = await db.Tour.findAll({
                    attributes: ['id', 'name', 'description', 'number_of_date', 'quantity_max'],
                    include: [
                        { model: db.Status, attributes: ['id', 'name'] },
                        { model: db.Vehicle, attributes: ['id', 'name', 'icon'] },
                        { model: db.Place, as: 'place_start', attributes: ['id', 'name'] },
                        { model: db.Place, as: 'place_finish', attributes: ['id', 'name'] },
                        { model: db.Service, as: "services", attributes: ['id', 'name', 'description'], through: { attributes: [], } },
                        { model: db.Note, as: "notes", attributes: ['id', 'name', 'description', 'type'], through: { attributes: [], } },
                        {
                            model: db.Plan, as: "plans", attributes: ['id', 'name'], through: { attributes: [], },
                            include: [
                                { model: db.Detail, as: "details", attributes: ['id', 'description', 'type'], through: { attributes: [], } },
                            ]
                        },
                        { model: db.Discount, as: "discounts", attributes: ['id', 'name', 'description', 'value'], through: { attributes: [], } },
                        { model: db.Ticket, as: "tickets", attributes: ['id', 'price', 'type'], through: { attributes: [], } },
                    ],
                })
            } else {
                data = await db.Tour.findOne({
                    where: { id: id },
                    attributes: ['id', 'name', 'description', 'number_of_date', 'quantity_max'],
                    include: [
                        { model: db.Status, attributes: ['id', 'name'] },
                        { model: db.Vehicle, attributes: ['id', 'name', 'icon'] },
                        { model: db.Place, as: 'place_start', attributes: ['id', 'name'] },
                        { model: db.Place, as: 'place_finish', attributes: ['id', 'name'] },
                        { model: db.Service, as: "services", attributes: ['id', 'name', 'description'], through: { attributes: [], } },
                        { model: db.Note, as: "notes", attributes: ['id', 'name', 'description', 'type'], through: { attributes: [], } },
                        {
                            model: db.Plan, as: "plans", attributes: ['id', 'name'], through: { attributes: [], },
                            include: [
                                { model: db.Detail, as: "details", attributes: ['id', 'description', 'type'], through: { attributes: [], } },
                            ]
                        },
                        { model: db.Discount, as: "discounts", attributes: ['id', 'name', 'description', 'value'], through: { attributes: [], } },
                        { model: db.Ticket, as: "tickets", attributes: ['id', 'price', 'type'], through: { attributes: [], } },
                    ],
                })
            }
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
let getAllTourSearch = (text) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!text) {
                resolve({
                    errCode: 1,
                    errMessage: 'Chưa điền thông tin Search '
                });
            } else {
                let data = await db.Tour.findAll({
                    where: {
                        name: {
                            [Op.like]: '%' + text + '%'
                        }
                    },

                    attributes: ['id', 'name', 'description', 'number_of_date', 'quantity_max'],
                    include: [
                        { model: db.Status, attributes: ['id', 'name'] },
                        { model: db.Vehicle, attributes: ['id', 'name', 'icon'] },
                        { model: db.Place, as: 'place_start', attributes: ['id', 'name'] },
                        { model: db.Place, as: 'place_finish', attributes: ['id', 'name'] },
                        { model: db.Service, as: "services", attributes: ['id', 'name', 'description'], through: { attributes: [], } },
                        { model: db.Note, as: "notes", attributes: ['id', 'name', 'description', 'type'], through: { attributes: [], } },
                        {
                            model: db.Plan, as: "plans", attributes: ['id', 'name'], through: { attributes: [], },
                            include: [
                                { model: db.Detail, as: "details", attributes: ['id', 'description', 'type'], through: { attributes: [], } },
                            ]
                        },
                        { model: db.Discount, as: "discounts", attributes: ['id', 'name', 'description', 'value'], through: { attributes: [], } },
                        { model: db.Ticket, as: "tickets", attributes: ['id', 'price', 'type'], through: { attributes: [], } },
                    ],
                });
                console.log(data);
                resolve({
                    data,
                    errCode: 0,
                    errMessage: 'Thành công'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let CreateTour = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.listDataTicket || !data.name || !data.description || !data.number_of_date || !data.quantity_max
                || !data.statusId || !data.place_start_id || !data.place_finish_id || !data.vehicleId
            ) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền thông tin cần thiết'
                })
            } else {
                let tour = await db.Tour.create({
                    name: data.name,
                    description: data.description,
                    number_of_date: data.number_of_date,
                    quantity_max: data.quantity_max,
                    statusId: data.statusId,
                    place_start_id: data.place_start_id,
                    place_finish_id: data.place_finish_id,
                    vehicleId: data.vehicleId,
                })
                if (tour) {
                    for (const i of data.listDataService) {
                        await db.Tour_service.create({
                            tourId: tour.id,
                            serviceId: i.id
                        })
                    }
                    for (const i of data.listDataNote) {
                        await db.Tour_note.create({
                            tourId: tour.id,
                            noteId: i.id
                        })
                    }
                    for (const i of data.listDataTicket) {
                        await db.Tour_ticket.create({
                            tourId: tour.id,
                            ticketId: i.id
                        })
                    }
                    for (const i of data.listDataDiscount) {
                        await db.Tour_discount.create({
                            tourId: tour.id,
                            discountId: i.id
                        })
                    }
                    for (const i of data.listDataPlan) {
                        await db.Tour_plan.create({
                            tourId: tour.id,
                            planId: i.id
                        })
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'Tạo thành công'
                    })
                } else {
                    resolve({
                        errCode: 3,
                        errMessage: 'Tạo thất bại'
                    })
                }
            }

        } catch (e) {
            reject(e)
        }
    })
}
let deleteTour = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id'
                })
            }
            let data = await db.Order.findAll({
                where: { statusId: { [Op.or]: [3, 4, 6, 8] }, },
                attributes: ['id'],
                include: [
                    { model: db.Tour_ticket, as: "tour_tickets", where: { tourId: id }, attributes: ['id'], through: { attributes: [], } },
                ],
            })
            if (data == '') {
                await db.Tour_note.destroy({ where: { tourId: id } })
                await db.Tour_plan.destroy({ where: { tourId: id } })
                await db.Tour_service.destroy({ where: { tourId: id } })
                await db.Tour_discount.destroy({ where: { tourId: id } })
                await db.Tour_ticket.destroy({ where: { tourId: id } })
                await db.Tour.destroy({ where: { id: id } })
                resolve({
                    errCode: 0,
                    errMessage: 'Thannh cong'
                })
            } else {
                resolve({
                    data: data,
                    errCode: 2,
                    errMessage: 'Không thể xóa, đang có đơn đặt ở Tour này'
                })
            }


        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllTour: getAllTour,
    getAllTourSearch: getAllTourSearch,
    CreateTour: CreateTour,
    deleteTour: deleteTour,
}