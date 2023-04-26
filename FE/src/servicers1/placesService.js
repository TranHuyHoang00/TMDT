import axios from "axios";

const getAllPlaces = () => {
    return axios.get('http://localhost:8080/api/get-all-places');
}
const createPlace = (data) => {
    return axios.post('http://localhost:8080/api/create-places', data);
}
export {
    getAllPlaces, createPlace
}