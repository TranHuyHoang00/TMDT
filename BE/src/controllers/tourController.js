import tourService from '../services/tourService'

let handleGetAllTour = async (req, res,) => {
    try {
        let result = await tourService.getAllTour(req.query.statusId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleGetAllTourSearch = async (req, res,) => {
    try {
        let result = await tourService.getAllTourSearch(req.query.text);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateTour = async (req, res,) => {
    try {
        let result = await tourService.CreateTour(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteTour = async (req, res) => {
    let message = await tourService.deleteTour(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllTour: handleGetAllTour,
    handleGetAllTourSearch: handleGetAllTourSearch,
    handleCreateTour: handleCreateTour,
    handleDeleteTour: handleDeleteTour,
}