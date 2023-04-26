import axios from "axios";

const getAllServices = () => {
    return axios.get('http://localhost:8080/api/get-all-services');
}
const createService = (data) => {
    return axios.post('http://localhost:8080/api/create-service', data);
}
const deleteService = (id) => {
    return axios.delete('http://localhost:8080/api/delete-service', {
        data: {
            id: id
        }
    });
}
const editService = (data) => {
    return axios.put('http://localhost:8080/api/edit-service', data);
}

const createTour_Service = (tourId, serviceId) => {
    return axios.post('http://localhost:8080/api/create-tour_service', { tourId: tourId, serviceId: serviceId });
}
export {
    getAllServices, createService, deleteService, editService, createTour_Service
}