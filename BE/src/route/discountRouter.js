import express from "express";
import discountController from '../controllers/discountController'
let router = express.Router();
let discountRouter = (app) => {

    router.get('/api/get-all-discounts', discountController.handleGetAllDiscounts);
    router.post('/api/create-discount', discountController.handleCreateDiscount);
    router.delete('/api/delete-discount', discountController.handleDeleteDiscount);

    return app.use("/", router);
}
module.exports = discountRouter;