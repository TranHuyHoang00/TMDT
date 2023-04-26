import detailService from '../services/detailsService'

let handleGetAllDetails = async (req, res,) => {
    try {
        let result = await detailService.getAllDetails();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateDetail = async (req, res,) => {
    try {
        let result = await detailService.CreateDetail(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteDetail = async (req, res) => {
    let message = await detailService.deleteDetail(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllDetails: handleGetAllDetails,
    handleCreateDetail: handleCreateDetail,
    handleDeleteDetail: handleDeleteDetail,
}