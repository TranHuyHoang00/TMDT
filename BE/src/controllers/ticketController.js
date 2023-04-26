import ticketService from '../services/ticketsService'

let handleGetAllTickets = async (req, res,) => {
    try {
        let result = await ticketService.getAllTickets();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateTicket = async (req, res,) => {
    try {
        let result = await ticketService.CreateTicket(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteTicket = async (req, res) => {
    let message = await ticketService.deleteTicket(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllTickets: handleGetAllTickets,
    handleCreateTicket: handleCreateTicket,
    handleDeleteTicket: handleDeleteTicket,
}