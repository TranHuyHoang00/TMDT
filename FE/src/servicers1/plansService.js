import axios from "axios";

const getAllPlans = () => {
    return axios.get('http://localhost:8080/api/get-all-plans');
}
const createPlan = (data) => {
    return axios.post('http://localhost:8080/api/create-plan', data);
}
const deletePlan = (id) => {
    return axios.delete('http://localhost:8080/api/delete-plan', { data: { id: id } });
}
export {
    getAllPlans, createPlan, deletePlan
}