import express from "express";

import usersController from '../controllers/userController'
import loginController from '../controllers/loginController'
import { middleware } from '../auth/auth'
let router = express.Router();
let userRouter = (app) => {

    router.post('/api/login', loginController.handleLogin);
    router.post('/api/refresh', loginController.handleRefreshToken);

    // Post
    router.post('/api/create-user', usersController.handleCreateUser);
    // Get
    router.get('/api/get-all-user', usersController.handleGetAllUser);
    router.get('/api/get-user', usersController.handleGetUser);
    // Delete
    router.delete('/api/delete-user', usersController.handleDeleteUser);
    // Edit
    router.put('/api/edit-user', usersController.handleEditUser);

    return app.use("/", router);
}
module.exports = userRouter;