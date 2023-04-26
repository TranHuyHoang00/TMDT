import axios from "axios";

const getAllDiscounts = () => {
    return axios.get('http://localhost:8080/api/get-all-discounts');
}
const createDiscount = (data) => {
    return axios.post('http://localhost:8080/api/create-discount', data);
}
const deleteDiscount = (id) => {
    return axios.delete('http://localhost:8080/api/delete-discount', { data: { id: id } });
}
export {
    getAllDiscounts, deleteDiscount, createDiscount
}