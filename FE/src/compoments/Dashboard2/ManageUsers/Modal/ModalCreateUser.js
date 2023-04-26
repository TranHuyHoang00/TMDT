import React from 'react';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ModalRole from './ModalRole';
import { createUser } from '../../../../servicers1/userServices';
class ModalCreateUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataCreate: {
                listDataRole: [],
            }
        }
    }
    componentDidMount() {
    }
    handleAddDataToList = (input, type) => {
        if (type == 'Role') {
            let list = this.state.dataCreate.listDataRole;
            const check = list.find((x) => x.id == input.id);
            if (check) {
                toast.error('Quyền đã tồn tại')
                return 1;
            } else {
                list.push(input)
                this.setState({
                    dataCreate: {
                        ...this.state.dataCreate,
                        listDataRole: list
                    }
                })
                toast.success('Thêm thành công')
                return 0;
            }
        }

    }
    handleDeleteDataFromList = (id, type) => {
        if (type == 'Role') {
            let list = this.state.dataCreate.listDataRole;
            list = list.filter(x => x.id != id);
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    listDataRole: list
                }
            })
            toast.success('Xóa thành công')
        }
    }
    onClickShow = (input) => {
        if (input == 'Role') {
            this.setState({
                isActive: 'Role',
            })
        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state.dataCreate };
        copyState[id] = event.target.value;
        this.setState({
            dataCreate: {
                ...copyState
            }
        });
    }
    handleCreateUser = async () => {
        let data = await createUser(this.state.dataCreate)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.props.getManageAllUsers('');
            this.props.onClickHide()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickHide = () => {
        this.setState({ isActive: '' })
    }
    onClickExit = () => {
        this.props.onClickHide()
    }
    render() {
        let listDataRole = this.state.dataCreate.listDataRole;
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative my-6 mx-auto max-w-5xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>TẠO NGƯỜI DÙNG</h1>
                                </div>
                                <div className='grid grid-cols-3 gap-x-[10px]'>
                                    <div className=' py-[10px] px-[10px]  space-y-[10px] rounded-[10px] shadow-md border bg-white'>
                                        <div className='space-y-[5px]'>
                                            <label
                                                className='text-[#fd364d] font-[500]'>Email</label><br />
                                            <input onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#fd364d]  pl-[10px]' />
                                        </div>
                                        <div className='space-y-[5px]'>
                                            <label className='text-[#fd364d] font-[500]'>Mật khẩu</label><br />
                                            <input type='password' onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#fd364d]  pl-[10px]' />
                                        </div>
                                    </div>

                                    <div className=' py-[10px] px-[10px]  space-y-[10px] rounded-[10px] shadow-md border bg-white'>
                                        <div className='space-y-[5px]'>
                                            <label>Tên</label><br />
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                        </div>
                                        <div className='space-y-[5px]'>
                                            <label>Địa chỉ</label><br />
                                            <input
                                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                        </div>
                                        <div className='grid grid-cols-2 gap-x-[10px]'>
                                            <div className='space-y-[5px]'>
                                                <label>Số điện thoại</label><br />
                                                <input
                                                    onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                                                    className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                            </div>
                                            <div className='space-y-[5px]' >
                                                <label>Căn cước </label><br />
                                                <input
                                                    onChange={(event) => this.handleOnChangeInput(event, 'cccd')}
                                                    className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-x-[10px] '>
                                            <div className='space-y-[5px]'>
                                                <label>Ngày sinh</label><br />
                                                <input
                                                    onChange={(event) => this.handleOnChangeInput(event, 'dateOfbirth')}
                                                    type='date' className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                            </div>
                                            <div className='space-y-[5px]'>
                                                <label>Giới tính</label><br />
                                                <select
                                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                                    className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]'>
                                                    <option value=''></option>
                                                    <option value='0'>Nam</option>
                                                    <option value='1'>Nữ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=' py-[10px] px-[10px]  space-y-[10px] rounded-[10px] shadow-md border bg-white'>
                                        <div className='space-y-[5px]'>
                                            <label>Trạng thái</label><br />
                                            <select
                                                onChange={(event) => this.handleOnChangeInput(event, 'statusId')}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]'>
                                                <option></option>
                                                <option value='1'>Active</option>
                                                <option value='2'>Locked</option>
                                            </select>
                                        </div>
                                        <div className='space-y-[5px]'>
                                            <label>Phân quyền</label><br />
                                            <button onClick={() => this.onClickShow('Role')}
                                                className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                                <AiOutlinePlus />
                                                <span>Tạo mới</span>
                                            </button>
                                        </div>
                                        <div className='space-y-[10px]'>
                                            {listDataRole && listDataRole.map((item, index) => {
                                                return (
                                                    <div key={item.id} className='space-x-[5px]'>
                                                        <span className='font-[450]'>{item.name}</span>
                                                        <button onClick={() => this.handleDeleteDataFromList(item.id, 'Role')}
                                                            className='bg-[#fd364d] p-[5px] rounded-[4px] text-white'><AiOutlineDelete /></button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <button className='w-[100px] my-[10px] bg-[#50d770] h-[40px] shadow-md border
                                    rounded-[4px] text-white text-[20px] font-[500]'
                                        onClick={() => this.handleCreateUser()}
                                    >TẠO</button>
                                    <button className='w-[100px] my-[10px] bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                        onClick={() => this.onClickExit()}
                                    >THOÁT</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {this.state.isActive == 'Role' && <ModalRole
                    onClickHide={this.onClickHide}
                    handleAddDataToList={this.handleAddDataToList}
                    isActive={this.state.isActive} />}
            </>
        )
    }
}

export default ModalCreateUser;