import axios from "axios";

const getAllNotes = () => {
    return axios.get('http://localhost:8080/api/get-all-notes');
}
const createNote = (data) => {
    return axios.post('http://localhost:8080/api/create-note', data);
}
const deleteNote = (id) => {
    return axios.delete('http://localhost:8080/api/delete-note', {
        data: {
            id: id
        }
    });
}
export {
    getAllNotes, createNote, deleteNote
}