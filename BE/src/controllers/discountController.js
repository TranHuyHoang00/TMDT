import discountService from '../services/discountsService'

let handleGetAllDiscounts = async (req, res,) => {
    try {
        let result = await discountService.getAllDiscounts();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateDiscount = async (req, res,) => {
    try {
        let result = await discountService.CreateDiscount(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteDiscount = async (req, res) => {
    let message = await discountService.deleteDiscount(req.body.id);
    return res.status(200).json(message)
}
module.exports = {
    handleGetAllDiscounts: handleGetAllDiscounts,
    handleCreateDiscount: handleCreateDiscount,
    handleDeleteDiscount: handleDeleteDiscount,
}