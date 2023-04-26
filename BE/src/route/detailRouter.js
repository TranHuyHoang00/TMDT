import express from "express";
import detailController from '../controllers/detailController'
let router = express.Router();
let detailRouter = (app) => {

    router.get('/api/get-all-details', detailController.handleGetAllDetails);
    router.post('/api/create-detail', detailController.handleCreateDetail);
    router.delete('/api/delete-detail', detailController.handleDeleteDetail);
    return app.use("/", router);
}
module.exports = detailRouter;