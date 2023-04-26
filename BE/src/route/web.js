import express from "express";
import userRouter from './userRouter';
import serviceRouter from './serviceRouter';
import tourRouter from '../route/tourRouter';
import user_roleRouter from '../route/user_roleRouter';
import orderRouter from '../route/orderRouter';
import placeRouter from './placeRouter';
import vehicleRouter from './vehicleRouter';
import noteRouter from './noteRouter';
import ticketRouter from './ticketRouter';
import discountRouter from './discountRouter';
import planRouter from './planRouter';
import detailRouter from './detailRouter';
import roleRouter from './roleRouter'
let router = express.Router();
let initWebRoutes = (app) => {

    userRouter(app);
    serviceRouter(app);
    tourRouter(app);
    user_roleRouter(app);
    orderRouter(app);
    placeRouter(app);
    vehicleRouter(app);
    noteRouter(app);
    ticketRouter(app);
    discountRouter(app);
    planRouter(app);
    detailRouter(app);
    roleRouter(app);
    return app.use("/", router);
}
module.exports = initWebRoutes;