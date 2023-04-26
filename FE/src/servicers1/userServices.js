import axios from "axios";

const login = (email, password) => {
    return axios.post('http://localhost:8080/api/login', { email: email, password: password });
}
const getAllUsers = (roleId) => {
    return axios.get(`http://localhost:8080/api/get-all-user?roleId=${roleId}`);
}
const createUser = (data) => {
    return axios.post('http://localhost:8080/api/create-user', data);
}
const deleteUser = (id) => {
    return axios.delete('http://localhost:8080/api/delete-user', {
        data: {
            id: id
        }
    });
}
const getUsers = (id) => {
    return axios.get(`http://localhost:8080/api/get-user?id=${id}`);
}
const editUser = (data) => {
    return axios.put('http://localhost:8080/api/edit-user', data);
}
export {
    login, getAllUsers, createUser, deleteUser, getUsers, editUser
}