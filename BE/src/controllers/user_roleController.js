import user_roleService from '../services/user_roleService'

let handleCreateUser_role = async (req, res) => {
    try {
        let result = await user_roleService.createUser_role(req.body.roleId, req.body.userId);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(501).json({
            errCode: 1,
            errMessage: 'Lỗi server',
            error: e
        })
    }
}
let handleDeleteUser_role = async (req, res) => {
    let message = await user_roleService.deleteUser_role(req.body.roleId, req.body.userId);
    return res.status(200).json(message)
}
module.exports = {
    handleCreateUser_role: handleCreateUser_role,
    handleDeleteUser_role: handleDeleteUser_role,
}