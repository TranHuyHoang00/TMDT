import express from "express";
import orderController from '../controllers/ordercontroller'
let router = express.Router();
let orderRouter = (app) => {

    router.get('/api/get-All-order-user', orderController.handleGetAllOrderUser);
    router.post('/api/create-order', orderController.handleCreateOrder);
    router.put('/api/edit-order', orderController.handleEditOrder);
    router.delete('/api/delete-order', orderController.handleDeleteOrder);

    router.get('/api/revenueStatistics_order', orderController.handleRevenueStatistics_order);
    router.get('/api/get-all-order-status', orderController.handleGetAllOrderbyStatus);
    return app.use("/", router);
}
module.exports = orderRouter;