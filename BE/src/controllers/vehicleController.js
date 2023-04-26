import vehiclesService from '../services/vehiclesService'

let handleGetAllVehicles = async (req, res,) => {
    try {
        let result = await vehiclesService.getAllVehicles();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateVehicle = async (req, res,) => {
    try {
        let result = await vehiclesService.CreateVehicle(req.body);
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
    handleGetAllVehicles: handleGetAllVehicles,
    handleCreateVehicle: handleCreateVehicle,
}