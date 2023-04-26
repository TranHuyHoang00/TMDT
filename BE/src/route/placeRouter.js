import express from "express";
import placeController from '../controllers/placeController'
let router = express.Router();
let placeRouter = (app) => {

    router.get('/api/get-all-places', placeController.handleGetAllPlaces);
    router.post('/api/create-places', placeController.handleCreatePlaces);
    return app.use("/", router);
}
module.exports = placeRouter;