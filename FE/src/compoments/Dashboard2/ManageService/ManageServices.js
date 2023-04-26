import React from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSearch, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { getAllServices, deleteService, createTour_Service } from '../../../servicers1/serviceService';
import { getAllTour } from '../../../servicers1/tourService'
import ModalCreateService from './Modal/ModalCreateService';
import ModalEditService from './Modal/ModalEditService';
class ManageServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataServices: [],
            dataTours: [],
            isActive: '',
            dataService: {},
            tourId: ''
        }
    }
    async componentDidMount() {
        await this.getManageAllService();
    }
    getManageAllService = async () => {
        let data = await getAllServices();
        console.log(data.data.data);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataServices: data.data.data,
            })
        }
    }
    handleDeleteService = async (id) => {
        let data = await deleteService(id)
        if (data && data.data && data.data.errCode == 0) {
            this.getManageAllService()
            toast.success(data.data.errMessage)
            return;
        } else {
            toast.error(data.data.errMessage)
            return;
        }
    }
    handleOnchangeTour = (event) => {
        this.setState({
            tourId: event.target.value
        })
    }
    handleAddServiceToTours = async (serviceId) => {
        let data = await createTour_Service(this.state.tourId, serviceId)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            return;
        } else {
            toast.error(data.data.errMessage)
            return;
        }
    }
    onClickShow = async (input, data) => {
        if (input == 'modalCreate') {
            this.setState({
                isActive: 'modalCreate',
            })
        }
        if (input == 'modalEdit') {
            this.setState({
                isActive: 'modalEdit',
                dataService: data
            })
        }
        if (input == 'addToTour') {
            let data = await getAllTour('')
            this.setState({
                isActive: 'addToTour',
                dataTours: data.data.data,
            })

        }
    }
    onClickHide = () => {
        this.setState({
            isActive: ''
        })
    }
    render() {
        let dataServices = this.state.dataServices;
        let dataTours = this.state.dataTours
        return (
            <>
                {/* Menu  */}
                <div className='w-full flex items-center justify-between px-[30px] py-[14px]'>
                    <div className='flex space-x-[10px]'>
                        <button onClick={() => this.onClickShow('modalCreate')}
                            className='flex items-center space-x-[5px] bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>
                            <AiOutlinePlus />
                            <span>Tạo mới</span>
                        </button>
                        {this.state.isActive == 'addToTour' ?
                            <div className='space-x-[10px] flex items-center'>
                                <label>Chọn Tour</label>
                                <select onChange={(event) => this.handleOnchangeTour(event)}
                                    className='w-[200px]'>
                                    <option value=''></option>
                                    {dataTours && dataTours.length > 0 &&
                                        dataTours.map((item, index) => {
                                            return (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <button className='w-[100px]  bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                    onClick={() => this.onClickHide()}
                                >THOÁT</button>
                            </div>
                            :
                            <button onClick={() => this.onClickShow('addToTour')}
                                className='flex items-center space-x-[5px] bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>
                                <AiOutlinePlus />
                                <span>Tour</span>
                            </button>
                        }


                    </div>
                    <div className=' text-[18px] py-[14px] space-x-[10px] font-[500]'>
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
                            <div><span>TÊN</span></div>
                            <div className='col-span-7'><span>MÔ TẢ</span></div>
                            <div><span>KIỂU</span></div>
                            <div className='col-span-2'><span>HÀNH ĐỘNG</span></div>
                        </div>
                        {dataServices && dataServices.map((item, index) => {
                            return (
                                <div key={item.id}
                                    className='grid grid-cols-12 text-center items-center border-b-[1px] font-[450]'>
                                    <div><span>{item.id}</span></div>
                                    <div><span>{item.name}</span></div>
                                    <div className='col-span-7 py-[5px]'><span>{item.description}</span></div>
                                    <div><span>{item.type}</span></div>
                                    <div className='col-span-2 flex items-center justify-center space-x-[10px] text-[20px]'>
                                        <button ><AiOutlineEye /></button>
                                        <button onClick={() => this.onClickShow('modalEdit', item)}
                                        ><AiOutlineEdit /></button>
                                        <button onClick={() => this.handleDeleteService(item.id)}><AiOutlineDelete /></button>
                                        {this.state.isActive == 'addToTour' &&
                                            <button onClick={() => this.handleAddServiceToTours(item.id)}
                                                className='text-white rounded-full bg-[#fd475d]'><AiOutlinePlus /></button>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Modal */}
                {this.state.isActive == 'modalCreate' &&
                    <ModalCreateService onClickHide={this.onClickHide}
                        getManageAllService={this.getManageAllService} />}
                {this.state.isActive == 'modalEdit' &&
                    <ModalEditService onClickHide={this.onClickHide}
                        getManageAllService={this.getManageAllService}
                        dataService={this.state.dataService} />}
            </>
        )
    }
}

export default ManageServices;