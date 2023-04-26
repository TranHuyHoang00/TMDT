import express from "express";
import vehicleController from '../controllers/vehicleController'
let router = express.Router();
let vehicleRouter = (app) => {

    router.get('/api/get-all-vehicles', vehicleController.handleGetAllVehicles);
    router.post('/api/create-vehicle', vehicleController.handleCreateVehicle);
    return app.use("/", router);
}
module.exports = vehicleRouter;