import axios from "axios";

const getAllTour = (statusId) => {
    return axios.get(`http://localhost:8080/api/get-all-tour?statusId=${statusId}`);
}
const getAllSearch = (text) => {
    return axios.get(`http://localhost:8080/api/get-all-tour-search?text=${text}`);
}
const createTour = (data) => {
    return axios.post('http://localhost:8080/api/create-tour', data);
}
const deleteTour = (id) => {
    return axios.delete('http://localhost:8080/api/delete-tour', { data: { id: id } });
}
export {
    getAllTour, getAllSearch, deleteTour, createTour
}