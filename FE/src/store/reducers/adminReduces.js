import actionTypes from "../actions/actionTypes";

const initialState = {
    isLoggedIn: false,
    adminInfo: null
}
const adminReduces = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo,
            }
        case actionTypes.PROCESS_LOGOUT_ADMIN:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        default:
            return state;
    }
}

export default adminReduces;