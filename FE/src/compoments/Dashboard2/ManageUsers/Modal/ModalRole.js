import React from 'react';
import { toast } from 'react-toastify';
import { getAllRoles } from '../../../../servicers1/rolesService';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
class ModalRole extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataRoles: [],
        }
    }
    async componentDidMount() {
        await this.getAllRoles()
        this.setState({
            isActive: this.props.isActive
        })
    }
    getAllRoles = async () => {
        let data = await getAllRoles();
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataRoles: data.data.data
            })
        }
    }
    onCLickThem = (input) => {
        if (this.state.isActive == 'editUser_role') {
            this.props.handleCreateUser_role(input.id)
        }
        if (this.state.isActive == 'Role') {
            let check = this.props.handleAddDataToList(input, 'Role')
            if (check == 0) {
                let list = this.state.dataRoles;
                list = list.filter(x => x.id != input.id);
                this.setState({
                    dataRoles: list
                })
            }
        }

    }
    onClickExit = () => {
        this.props.onClickHide()
    }
    render() {
        let dataRoles = this.state.dataRoles;
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative max-w-5xl max-h-screen">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>PHÂN QUYỀN</h1>
                                </div>
                                <button
                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                    <AiOutlinePlus />
                                    <span>Tạo mới</span>
                                </button>
                                <div className='bg-white w-[400px] rounded-[10px] shadow-md'>
                                    <div className='grid grid-cols-6 gap-x-[20px] text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                                        <div><span>ID</span></div>
                                        <div className='col-span-2'><span>TÊN</span></div>

                                        <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                                    </div>
                                    {dataRoles && dataRoles.map((item, index) => {
                                        return (
                                            <div key={item.id}
                                                className='grid grid-cols-6 gap-x-[20px]  text-center cursor-pointer items-center border-b-[1px] font-[450]'>
                                                <div><span>{item.id}</span></div>
                                                <div className='col-span-2'><span>{item.name}</span></div>
                                                <div className='col-span-3 flex items-center justify-center space-x-[10px] text-[20px]'>
                                                    <button ><AiOutlineEye /></button>
                                                    <button><AiOutlineEdit /></button>
                                                    <button><AiOutlineDelete /></button>
                                                    <button onClick={() => this.onCLickThem(item)}
                                                        className='bg-[#263544] text-white rounded-full'><AiOutlinePlus /></button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='flex items-center justify-center text-[16px] text-white font-[500]'>
                                    <button className='w-[80px]  bg-[#fd475d]  py-[5px] shadow-md border rounded-[4px]  '
                                        onClick={() => this.onClickExit()}
                                    >THOÁT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default ModalRole;