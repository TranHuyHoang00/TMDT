import express from "express";

import user_roleController from '../controllers/user_roleController'

let router = express.Router();
let user_roleRouter = (app) => {

    router.post('/api/create-user_role', user_roleController.handleCreateUser_role);
    router.delete('/api/delete-user_role', user_roleController.handleDeleteUser_role);

    return app.use("/", router);
}
module.exports = user_roleRouter;