import React from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSearch, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { getAllUsers, deleteUser } from '../../../servicers1/userServices';
import ModalDetailUser from './Modal/ModalDetailUser';
import ModalCreateUser from './Modal/ModalCreateUser';
import ModalEditUser from './Modal/ModalEditUser';
class ManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsers: [],
            dataUser: {},
            isActive: '',
        }
    }
    async componentDidMount() {
        await this.getManageAllUsers('');
    }
    getManageAllUsers = async (roleId) => {
        let data = await getAllUsers(roleId);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataUsers: data.data.data,
            })
        }
    }
    handleDeleteUser = async (id) => {
        let data = await deleteUser(id)
        if (data && data.data && data.data.errCode == 0) {
            this.getManageAllUsers('')
            toast.success(data.data.errMessage)
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickShow = (input, data) => {
        if (input == 'create') {
            this.setState({
                isActive: 'create'
            })
        }
        if (input == 'detail') {
            this.setState({
                isActive: 'detail',
                dataUser: data,
            })
        }
        if (input == 'edit') {
            this.setState({
                isActive: 'edit',
                dataUser: data,
            })
        }
    }
    onClickHide = () => {
        this.setState({
            isActive: ''
        })
    }
    render() {
        let dataUsers = this.state.dataUsers
        return (
            <>
                {/* Menu  */}
                <div className='w-full flex items-center justify-between px-[30px] '>
                    <div>
                        <button onClick={() => this.onClickShow('create')}
                            className='flex items-center space-x-[5px] bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>
                            <AiOutlinePlus />
                            <span>Tạo mới</span>
                        </button>
                    </div>
                    <div className=' text-[18px] py-[14px] space-x-[10px] font-[500]'>
                        <button onClick={() => this.getManageAllUsers('')}
                            className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Tất cả</button>
                        <button onClick={() => this.getManageAllUsers('3')}
                            className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Nhân viên</button>
                        <button onClick={() => this.getManageAllUsers('2')}
                            className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Khách hàng</button>
                    </div>
                    <div>
                        <button className='flex items-center space-x-[5px] bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>
                            <AiOutlineSearch />
                            <span>Tìm</span>
                        </button>
                    </div>
                </div>
                {/* Table */}
                <div className=' w-full px-[30px] pb-[20px] '>
                    <div className='bg-white w-full rounded-[10px] shadow-md'>
                        <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                            <div><span>ID</span></div>
                            <div><span>ẢNH</span></div>
                            <div className='col-span-3'><span>EMAIL</span></div>
                            <div className='col-span-2'><span>TÊN</span></div>
                            <div className='col-span-2'><span>TRẠNG THÁI</span></div>
                            <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                        </div>
                        {dataUsers && dataUsers.map((item, index) => {
                            return (
                                <div key={item.id} className='grid grid-cols-12 text-center items-center border-b-[1px] font-[450]'>
                                    <div><span>{item.id}</span></div>
                                    <div className='mx-auto py-[10px]'>
                                        <div className='h-[40px] w-[40px] bg-black'></div>
                                    </div>
                                    {item.email == null ?
                                        <div className='col-span-3'><span></span></div>
                                        :
                                        <div className='col-span-3'><span>{item.email}</span></div>
                                    }
                                    <div className='col-span-2'><span>{item.name}</span></div>
                                    {item.Status.id == 1 &&
                                        <div className='col-span-2 text-white font-[500]'>
                                            <span className='bg-[#50d770] px-[5px] py-[4px] rounded-[5px]'>{item.Status.name}</span>
                                        </div>
                                    }
                                    {item.Status.id == 2 &&
                                        <div className='col-span-2 text-white font-[500]'>
                                            <span className='bg-[#ff5370] px-[5px] py-[4px] rounded-[5px]'>{item.Status.name}</span>
                                        </div>
                                    }
                                    <div className='col-span-3 flex items-center justify-center space-x-[10px] text-[20px]'>
                                        <button onClick={() => this.onClickShow('detail', item)}><AiOutlineEye /></button>
                                        <button onClick={() => this.onClickShow('edit', item)}><AiOutlineEdit /></button>
                                        <button onClick={() => this.handleDeleteUser(item.id)}
                                        ><AiOutlineDelete /></button>
                                        {item.Status.id == null &&
                                            <button></button>
                                        }
                                        {item.Status.id == 1 &&
                                            <button><AiOutlineLock /></button>
                                        }
                                        {item.Status.id == 2 &&
                                            <button><AiOutlineUnlock /></button>
                                        }
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
                {/* Modal */}
                {this.state.isActive == 'create' &&
                    <ModalCreateUser onClickHide={this.onClickHide}
                        getManageAllUsers={this.getManageAllUsers} />
                }
                {this.state.isActive == 'detail' &&
                    <ModalDetailUser onClickHide={this.onClickHide}
                        dataUser={this.state.dataUser} />
                }
                {this.state.isActive == 'edit' &&
                    <ModalEditUser onClickHide={this.onClickHide}
                        getManageAllUsers={this.getManageAllUsers}
                        dataUser={this.state.dataUser} />
                }

            </>
        )
    }
}

export default ManageUsers;