import actionTypes from "./actionTypes";

export const AdminLoginSuccess = (adminInfo) => ({
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    adminInfo: adminInfo
})
export const processLogoutAdmin = () => ({
    type: actionTypes.PROCESS_LOGOUT_ADMIN
})