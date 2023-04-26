import orderService from '../services/orderService'

let handleCreateOrder = async (req, res) => {
    try {
        let result = await orderService.createOrder(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleGetAllOrderUser = async (req, res,) => {
    try {
        let result = await orderService.getAllOrderUser(req.query.customerId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleEditOrder = async (req, res,) => {
    try {
        let result = await orderService.editOrder(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleRevenueStatistics_order = async (req, res,) => {
    try {
        let result = await orderService.RevenueStatistics_order(req.query.dateStart, req.query.dateFinish);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleGetAllOrderbyStatus = async (req, res,) => {
    try {
        let result = await orderService.getAllOrderbyStatus(req.query.statusId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}

let handleDeleteOrder = async (req, res) => {
    try {
        let result = await orderService.deleteOrder(req.body.id);
        return res.status(200).json(result);
    } catch (e) {
        orderService.deleteOrder_OTt()
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
module.exports = {
    handleCreateOrder: handleCreateOrder,
    handleGetAllOrderUser: handleGetAllOrderUser,
    handleEditOrder: handleEditOrder,
    handleRevenueStatistics_order: handleRevenueStatistics_order,
    handleGetAllOrderbyStatus: handleGetAllOrderbyStatus,
    handleDeleteOrder: handleDeleteOrder,
}