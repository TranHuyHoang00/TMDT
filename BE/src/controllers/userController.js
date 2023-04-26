import userService from '../services/userService'

let handleGetAllUser = async (req, res,) => {
    try {
        let result = await userService.getAllUser(req.query.roleId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleCreateUser = async (req, res) => {
    try {
        let result = await userService.createUser(req.body);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteUser = async (req, res) => {
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}
let handleGetUser = async (req, res,) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: 2,
                errMessage: 'Thiếu id',
            })
        }
        let result = await userService.getUser(req.query.id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleEditUser = async (req, res) => {
    try {
        let result = await userService.editUser(req.body);
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
    handleCreateUser: handleCreateUser,
    handleGetAllUser: handleGetAllUser,
    handleDeleteUser: handleDeleteUser,
    handleGetUser: handleGetUser,
    handleEditUser: handleEditUser,
}