import placesService from '../services/placesService'

let handleGetAllPlaces = async (req, res,) => {
    try {
        let result = await placesService.getAllPlaces();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreatePlaces = async (req, res,) => {
    try {
        let result = await placesService.CreatePlaces(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
module.exports = {
    handleGetAllPlaces: handleGetAllPlaces,
    handleCreatePlaces: handleCreatePlaces,
}