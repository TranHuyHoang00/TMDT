import axios from "axios";

const createOrder = (data) => {
    return axios.post('http://localhost:8080/api/create-order', data);
}
const getAllOrderUser = (customerId) => {
    return axios.get(`http://localhost:8080/api/get-All-order-user?customerId=${customerId}`);
}
const editOrder = (data) => {
    return axios.put('http://localhost:8080/api/edit-order', data);
}
const deleteOrder = (id) => {
    return axios.delete('http://localhost:8080/api/delete-order', {
        data: {
            id: id
        }
    });
}
const RevenueStatistics_order = (dateStart, dateFinish) => {
    return axios.get(`http://localhost:8080/api/revenueStatistics_order?dateStart=${dateStart}&dateFinish=${dateFinish}`);
}
const getAllOrder = (statusId) => {
    return axios.get(`http://localhost:8080/api/get-all-order-status?statusId=${statusId}`);
}
export {
    createOrder, getAllOrderUser, editOrder, RevenueStatistics_order, getAllOrder, deleteOrder
}