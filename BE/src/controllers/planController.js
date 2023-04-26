import planService from '../services/plansServices'

let handleGetAllPlans = async (req, res,) => {
    try {
        let result = await planService.getAllPlans();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreatePlan = async (req, res,) => {
    try {
        let result = await planService.CreatePlan(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeletePlan = async (req, res) => {
    let message = await planService.deletePlan(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllPlans: handleGetAllPlans,
    handleCreatePlan: handleCreatePlan,
    handleDeletePlan: handleDeletePlan,
}