import db from '../models/index';

let getAllNotes = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Note.findAll({
                attributes: ['id', 'name', 'description'],
            })
            resolve({
                data,
                errCode: 0,
                errMessage: 'Thành công',
            })

        } catch (e) {
            reject(e)
        }
    })
}
let CreateNote = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.description) {
                resolve({
                    errCode: 2,
                    errMessage: 'Vui lòng điền đầy đủ thông tin'
                })
            } else {
                await db.Note.create({
                    name: data.name,
                    description: data.description,
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Tạo thành công'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let deleteNote = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Thiếu id'
                })
            }
            let note = await db.Tour_note.findOne({
                where: { noteId: id }
            })
            if (note) {
                resolve({
                    errCode: 2,
                    errMessage: 'Không thể xóa, Lưu ý này đang ở trong Tour'
                })
            } else {
                await db.Note.destroy({
                    where: { id: id }
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Xóa thành công'
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllNotes: getAllNotes,
    CreateNote: CreateNote,
    deleteNote: deleteNote,
}