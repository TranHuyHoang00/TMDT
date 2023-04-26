import roleService from '../services/rolesService'

let handleGetAllRoles = async (req, res,) => {
    try {
        let result = await roleService.getAllRoles();
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
    handleGetAllRoles: handleGetAllRoles,
}