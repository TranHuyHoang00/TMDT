import axios from "axios";


const createUser_role = (roleId, userId) => {
    return axios.post('http://localhost:8080/api/create-user_role', { roleId: roleId, userId: userId });
}
const deleteUser_role = (roleId, userId) => {
    return axios.delete('http://localhost:8080/api/delete-user_role', {
        data: {
            roleId: roleId,
            userId: userId
        }
    });
}
export {
    createUser_role, deleteUser_role
}