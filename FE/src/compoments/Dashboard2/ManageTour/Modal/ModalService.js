import React from 'react';
import { toast } from 'react-toastify';
import { getAllServices, deleteService } from '../../../../servicers1/serviceService';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSearch, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import ModalCreateService from './ModalCreateService';
class ModalService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataServices: [],
        }
    }
    async componentDidMount() {
        await this.getAllServices()
    }
    getAllServices = async () => {
        let data = await getAllServices();
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataServices: data.data.data
            })
        }
    }
    handleDeleteService = async (id) => {
        let data = await deleteService(id)
        console.log(data);
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getAllServices()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onCLickThem = (input) => {
        let check = this.props.handleAddDataToList(input, 'service')
        if (check == 0) {
            let list = this.state.dataServices;
            list = list.filter(x => x.id != input.id);
            this.setState({
                dataServices: list
            })
        }
    }
    onClickShow = (input) => {
        if (input == 'CreateService') { this.setState({ isActive: 'CreateService' }) }
    }
    onClickHide = () => { this.setState({ isActive: '' }) }
    onClickExit = () => {
        this.props.onClickHide()
    }
    render() {
        let dataServices = this.state.dataServices;
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-screen max-h-screen px-[100px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>DỊCH VỤ</h1>
                                </div>
                                <button onClick={() => this.onClickShow('CreateService')}
                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                    <AiOutlinePlus />
                                    <span>Tạo mới</span>
                                </button>
                                <div className=' w-full'>
                                    <div className='bg-white w-full rounded-[10px] shadow-md'>
                                        <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                                            <div><span>ID</span></div>
                                            <div><span>TÊN</span></div>
                                            <div className='col-span-7'><span>MÔ TẢ</span></div>
                                            <div><span>KIỂU</span></div>
                                            <div className='col-span-2'><span>HÀNH ĐỘNG</span></div>
                                        </div>
                                        {dataServices && dataServices.map((item, index) => {
                                            return (
                                                <div key={item.id}
                                                    className='grid grid-cols-12 text-center cursor-pointer items-center border-b-[1px] font-[450]'>
                                                    <div><span>{item.id}</span></div>
                                                    <div><span>{item.name}</span></div>
                                                    <div className='col-span-7 py-[5px]'><span>{item.description}</span></div>
                                                    <div><span>{item.type}</span></div>
                                                    <div className='col-span-2 flex items-center justify-center space-x-[10px] text-[20px]'>
                                                        <button ><AiOutlineEye /></button>
                                                        <button><AiOutlineEdit /></button>
                                                        <button onClick={() => this.handleDeleteService(item.id)}><AiOutlineDelete /></button>
                                                        <button onClick={() => this.onCLickThem(item)}
                                                            className='bg-[#263544] text-white rounded-full'><AiOutlinePlus /></button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
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
                {this.state.isActive == 'CreateService' && <ModalCreateService
                    getAllServices={this.getAllServices}
                    onClickHide={this.onClickHide} />}
            </>
        )
    }
}

export default ModalService;