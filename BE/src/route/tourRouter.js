import express from "express";
import tourController from '../controllers/tourController'
let router = express.Router();
let tourRouter = (app) => {

    router.get('/api/get-all-tour', tourController.handleGetAllTour);
    router.get('/api/get-all-tour-search', tourController.handleGetAllTourSearch);
    router.post('/api/create-tour', tourController.handleCreateTour);
    router.delete('/api/delete-tour', tourController.handleDeleteTour);
    return app.use("/", router);
}
module.exports = tourRouter;