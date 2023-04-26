import serviceService from '../services/serviceService'

let handleGetAllServices = async (req, res,) => {
    try {
        let result = await serviceService.getAllServices();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateService = async (req, res) => {
    try {
        let result = await serviceService.createService(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteService = async (req, res) => {
    let message = await serviceService.deleteService(req.body.id);
    return res.status(200).json(message)
}
let handleEditService = async (req, res) => {
    try {
        let result = await serviceService.editService(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateTour_Service = async (req, res) => {
    try {
        let result = await serviceService.createTour_Service(req.body.tourId, req.body.serviceId);
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
    handleGetAllServices: handleGetAllServices,
    handleCreateService: handleCreateService,
    handleDeleteService: handleDeleteService,
    handleEditService: handleEditService,

    handleCreateTour_Service: handleCreateTour_Service,
}