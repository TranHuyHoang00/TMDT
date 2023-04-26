import noteService from '../services/notesServices'

let handleGetAllNotes = async (req, res,) => {
    try {
        let result = await noteService.getAllNotes();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateNote = async (req, res,) => {
    try {
        let result = await noteService.CreateNote(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteNote = async (req, res) => {
    let message = await noteService.deleteNote(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllNotes: handleGetAllNotes,
    handleCreateNote: handleCreateNote,
    handleDeleteNote: handleDeleteNote,
}