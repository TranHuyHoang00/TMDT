import axios from "axios";

const getAllVehicles = () => {
    return axios.get('http://localhost:8080/api/get-all-vehicles');
}
const createVehicle = (data) => {
    return axios.post('http://localhost:8080/api/create-vehicle', data);
}
export {
    getAllVehicles, createVehicle
}