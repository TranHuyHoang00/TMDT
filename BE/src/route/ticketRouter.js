import express from "express";
import ticketController from '../controllers/ticketController'
let router = express.Router();
let ticketRouter = (app) => {

    router.get('/api/get-all-tickets', ticketController.handleGetAllTickets);
    router.post('/api/create-ticket', ticketController.handleCreateTicket);
    router.delete('/api/delete-ticket', ticketController.handleDeleteTicket);
    return app.use("/", router);
}
module.exports = ticketRouter;