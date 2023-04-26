import express from "express";
import noteController from '../controllers/noteController'
let router = express.Router();
let noteRouter = (app) => {
    router.get('/api/get-all-notes', noteController.handleGetAllNotes);
    router.post('/api/create-note', noteController.handleCreateNote);
    router.delete('/api/delete-note', noteController.handleDeleteNote);
    return app.use("/", router);
}
module.exports = noteRouter;