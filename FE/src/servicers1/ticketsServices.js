import axios from "axios";

const getAllTickets = () => {
    return axios.get('http://localhost:8080/api/get-all-tickets');
}
const createTicket = (data) => {
    return axios.post('http://localhost:8080/api/create-ticket', data);
}
const deleteTicket = (id) => {
    return axios.delete('http://localhost:8080/api/delete-ticket', { data: { id: id } });
}
export {
    getAllTickets, createTicket, deleteTicket
}