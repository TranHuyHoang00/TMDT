import express from "express";
import planController from '../controllers/planController'
let router = express.Router();
let noteRouter = (app) => {

    router.get('/api/get-all-plans', planController.handleGetAllPlans);
    router.post('/api/create-plan', planController.handleCreatePlan);
    router.delete('/api/delete-plan', planController.handleDeletePlan);

    return app.use("/", router);
}
module.exports = noteRouter;