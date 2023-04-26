import axios from "axios";

const getAllDetails = () => {
    return axios.get('http://localhost:8080/api/get-all-details');
}
const createDetail = (data) => {
    return axios.post('http://localhost:8080/api/create-detail', data);
}
const deleteDetail = (id) => {
    return axios.delete('http://localhost:8080/api/delete-detail', { data: { id: id } });
}
export {
    getAllDetails, createDetail, deleteDetail
}