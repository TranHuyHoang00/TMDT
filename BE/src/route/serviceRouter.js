import express from "express";
import serviceController from '../controllers/serviceController'
let router = express.Router();
let serviceRouter = (app) => {

    router.get('/api/get-all-services', serviceController.handleGetAllServices);
    router.post('/api/create-service', serviceController.handleCreateService);
    router.delete('/api/delete-service', serviceController.handleDeleteService);
    router.put('/api/edit-service', serviceController.handleEditService);

    router.post('/api/create-tour_service', serviceController.handleCreateTour_Service);

    return app.use("/", router);
}
module.exports = serviceRouter;