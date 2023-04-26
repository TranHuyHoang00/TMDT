import React from 'react';
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { toast } from 'react-toastify';
import { getAllOrder, editOrder, deleteOrder } from '../../../servicers1/orderService';
import ModalOrderDetail from '../../Element/ModalOrderDetail'
class ManageOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            isActive: '',
            dataOrder: {},
            dataOrders: []
        }
    }
    async componentDidMount() {
        await this.getManageAllOrder('All');
    }
    getManageAllOrder = async (statusId) => {
        let data = await getAllOrder(statusId);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                type: statusId,
                dataOrders: data.data.data
            })
        }
    }
    editOrder = async (id, check, type) => {
        let dataEdit = ''
        if (check == '3') { dataEdit = { id: id, statusId: 4 } }
        if (check == '3' && type == 'huy') { dataEdit = { id: id, statusId: 7 } }
        if (check == '4' || check == '8') { dataEdit = { id: id, statusId: 5 } }
        if ((check == '4' || check == '8') && type == 'huy') { dataEdit = { id: id, statusId: 7 } }
        if (check == '6') { dataEdit = { id: id, statusId: 7 } }
        if (check == '6' && type == 'huy') { dataEdit = { id: id, statusId: 3 } }
        let data = await editOrder(dataEdit);
        if (data && data.data && data.data.errCode == 0) {
            this.getManageAllOrder(check)
            toast.success(data.data.errMessage)
        } else {
            toast.error(data.data.errMessage)
        }
    }
    deleteOrder = async (id) => {
        let data = await deleteOrder(id);
        if (data && data.data && data.data.errCode == 0) {
            this.getManageAllOrder(this.state.type)
            toast.success(data.data.errMessage)
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickShow = (type, data) => {
        if (type == 'detail') { this.setState({ isActive: 'detail', dataOrder: data }) }
    }
    onClickHide = () => {
        this.setState({ isActive: '' })
    }
    render() {
        let dataOrders = this.state.dataOrders
        return (
            <>
                <div className='px-[20px]'>
                    <div className='w-full flex items-center justify-between px-[30px] '>
                        <div>
                            <button
                                className='flex items-center space-x-[5px] bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>
                                <AiOutlinePlus />
                                <span>Tạo mới</span>
                            </button>
                        </div>
                        <div className=' text-[16px] py-[14px] space-x-[10px] font-[500]'>
                            <button onClick={() => this.getManageAllOrder('All')}
                                className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Tất cả</button>
                            <button onClick={() => this.getManageAllOrder('3')}
                                className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Chờ xác nhận</button>
                            <button onClick={() => this.getManageAllOrder('4')}
                                className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Đã xác nhận</button>
                            <button onClick={() => this.getManageAllOrder('5')}
                                className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Đã hoàn thành</button>
                            <button onClick={() => this.getManageAllOrder('6')}
                                className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Chờ hủy</button>
                            <button onClick={() => this.getManageAllOrder('7')}
                                className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Đã hủy</button>
                            <button onClick={() => this.getManageAllOrder('8')}
                                className='bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>Đã thanh toán</button>
                        </div>
                        <div>
                            <button className='flex items-center space-x-[5px] bg-white px-[10px] shadow-md rounded-[4px] hover:scale-110'>
                                <AiOutlineSearch />
                                <span>Tìm</span>
                            </button>
                        </div>
                    </div>
                    <div className='shadow-md '>
                        <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                            <div><span>ID</span></div>
                            <div className='col-span-3'><span>Tour</span></div>
                            <div className='col-span-2'><span>Người đặt</span></div>
                            <div><span>Ngày đi</span></div>
                            <div><span>Tổng tiền</span></div>
                            <div className='col-span-2'><span>Trạng thái</span></div>
                            <div className='col-span-2'><span>Hành động</span></div>
                        </div>
                        {dataOrders && dataOrders.map((item, index) => {
                            return (
                                <div key={item.id}
                                    className='grid grid-cols-12 bg-white py-[5px] text-center items-center bitem-b-[1px] font-[450]'>
                                    <div><span>{item.id}</span></div>
                                    <div className='col-span-3'><span>{item.date_create}</span></div>
                                    <div className='col-span-2'><span>{item.User.name}</span></div>
                                    <div><span>{item.departure_date}</span></div>
                                    <div><span>{item.total}</span></div>
                                    <div className='col-span-2'><span>{item.Status.name}</span></div>
                                    <div className='col-span-2 space-y-[10px]'>
                                        <div className='flex items-center justify-center space-x-[10px] text-white text-[14px]'>
                                            <button onClick={() => this.onClickShow('detail', item)}
                                                className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Xem</button>
                                            <button className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Sửa</button>

                                            {item.Status.id == 5 &&
                                                <button onClick={() => this.deleteOrder(item.id, '5')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Xóa</button>
                                            }
                                            {item.Status.id == 7 &&
                                                <button onClick={() => this.deleteOrder(item.id, '7')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Xóa</button>
                                            }
                                        </div>
                                        {item.Status.id == 3 && this.state.type == 3 &&
                                            <div className='flex items-center justify-center space-x-[10px] text-white text-[14px]'>
                                                <button onClick={() => this.editOrder(item.id, '3')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Xác nhận</button>
                                                <button onClick={() => this.editOrder(item.id, '3', 'huy')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Hủy</button>
                                            </div>
                                        }
                                        {item.Status.id == 4 && this.state.type == 4 &&
                                            <div className='flex items-center justify-center space-x-[10px] text-white text-[14px]'>
                                                <button onClick={() => this.editOrder(item.id, '4')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Hoàn thành</button>
                                                <button onClick={() => this.editOrder(item.id, '4', 'huy')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Hủy</button>
                                            </div>
                                        }
                                        {item.Status.id == 6 && this.state.type == 6 &&
                                            <div className='flex items-center justify-center space-x-[10px] text-white text-[14px]'>
                                                <button onClick={() => this.editOrder(item.id, '6')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Xác nhận</button>
                                                <button onClick={() => this.editOrder(item.id, '6', 'huy')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Hủy</button>
                                            </div>
                                        }
                                        {item.Status.id == 8 && this.state.type == 8 &&
                                            <div className='flex items-center justify-center space-x-[10px] text-white text-[14px]'>
                                                <button onClick={() => this.editOrder(item.id, '8')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Hoàn thành</button>
                                                <button onClick={() => this.editOrder(item.id, '8', 'huy')}
                                                    className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Hủy</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.state.isActive == 'detail' && <ModalOrderDetail
                    data={this.state.dataOrder}
                    onClickHide={this.onClickHide} />}
            </>
        )
    }
}

export default ManageOrder;