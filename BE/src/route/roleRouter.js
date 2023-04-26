import express from "express";
import roleController from '../controllers/roleController'
let router = express.Router();
let roleRouter = (app) => {
    router.get('/api/get-all-roles', roleController.handleGetAllRoles);
    return app.use("/", router);
}
module.exports = roleRouter;