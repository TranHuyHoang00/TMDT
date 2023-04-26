import axios from "axios";

const getAllRoles = () => {
    return axios.get('http://localhost:8080/api/get-all-roles');
}

export {
    getAllRoles
}