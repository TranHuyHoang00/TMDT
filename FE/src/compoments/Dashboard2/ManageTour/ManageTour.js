import React from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSearch, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { getAllTour, deleteTour } from '../../../servicers1/tourService';
import { toast } from 'react-toastify';
import ModalCreateTour from './Modal/ModalCreateTour';
class ManageTours extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTours: [],
            isActive: ''
        }
    }
    async componentDidMount() {
        await this.getManageAllTours('All');
    }
    getManageAllTours = async (statusId) => {
        let data = await getAllTour(statusId);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataTours: data.data.data,
            })
        }
    }
    handleDeleteTour = async (id) => {
        let data = await deleteTour(id)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getManageAllTours('All')
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickShow = (input) => {
        if (input == 'Create') { this.setState({ isActive: 'Create' }) }
    }
    onClickHide = () => {
        this.setState({ isActive: '' })
    }
    render() {
        let dataTours = this.state.dataTours
        return (
            <>
                {/* Menu  */}
                <div className='w-full flex items-center justify-between px-[30px] '>
                    <div>
                        <button onClick={() => this.onClickShow('Create')}
                            className='flex items-center space-x-[5px] bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>
                            <AiOutlinePlus />
                            <span>Tạo mới</span>
                        </button>
                    </div>
                    <div className=' text-[18px] py-[14px] space-x-[10px] font-[500]'>
                        <button onClick={() => this.getManageAllTours('All')}
                            className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Tất cả</button>
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
                            <div className='col-span-6'><span>TÊN</span></div>
                            <div className='col-span-2'><span>TRẠNG THÁI</span></div>
                            <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                        </div>
                        {dataTours && dataTours.map((item, index) => {
                            return (
                                <div key={item.id} className='grid grid-cols-12 text-center items-center border-b-[1px] font-[450]'>
                                    <div><span>{item.id}</span></div>
                                    <div className='col-span-6 py-[5px]'><span>{item.name}</span></div>
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
                                        <button ><AiOutlineEye /></button>
                                        <button><AiOutlineEdit /></button>
                                        <button onClick={() => this.handleDeleteTour(item.id)}><AiOutlineDelete /></button>
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
                {this.state.isActive == 'Create' && <ModalCreateTour
                    getManageAllTours={this.getManageAllTours}
                    onClickHide={this.onClickHide} />}
            </>
        )
    }
}

export default ManageTours;