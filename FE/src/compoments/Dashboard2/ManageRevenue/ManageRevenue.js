import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { toast } from 'react-toastify';
import { deleteOrder, RevenueStatistics_order } from '../../../servicers1/orderService';
import ModalOrderDetail from '../../Element/ModalOrderDetail';
class ManageRevenue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataOrders: [],
            dataOrder: {},
            type: 'day',
            dateStart: '',
            dateFinish: '',
            index: '',
            total: '',
            year: '',
        }
    }
    handleOnChangeType = (event) => {
        this.setState({
            type: event.target.value,
        })
    }
    handleOnChangeDateStart = (event) => {
        this.setState({
            dateStart: event.target.value,
        })
    }
    handleOnChangeDateFinish = (event) => {
        this.setState({
            dateFinish: event.target.value,
        })
    }
    handleOnchangeMonth = (event) => {
        this.setState({
            dateStart: `${event.$y}-${event.$M + 1}-01`,
            dateFinish: `${event.$y}-${event.$M + 1}-30`,
        })
    }
    handleOnchangeYear = (event) => {
        this.setState({
            dateStart: `${event.$y}-01-01`,
            dateFinish: `${event.$y}-12-30`,
        })
    }
    handleStatistical = async () => {
        let dateStart = new Date(this.state.dateStart)
        let dateFinish = new Date(this.state.dateFinish)
        if (dateStart > dateFinish) {
            toast.error('Ngày kết thúc phải lớn hơn ngày bắt đầu')
            return
        }
        let data = await RevenueStatistics_order(this.state.dateStart, this.state.dateFinish)
        let arrOrder = data.data.data;
        let index = 0;
        let total = 0;
        if (data.data.errCode == 0) {
            arrOrder.map((order, i) => {
                index = index + 1
                total = total + order.total
            });
            this.setState({
                index: index,
                total: total,
                dataOrders: arrOrder
            })
            toast.success(data.data.errMessage)
        }
        else {
            toast.error(data.data.errMessage)
        }
    }
    handleDeleteOrder = async (id) => {
        let data = await deleteOrder(id);
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.handleStatistical()
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
                <div className='px-[50px]'>
                    <div className='bg-white text-[18px] mx-[20px] my-[20px] p-[20px] rounded-[10px] shadow-md space-y-[20px]'>
                        <div className='flex items-center justify-between  border-b-[2px] pb-[15px]'>
                            <div>
                                <label>Thống kê : </label>
                                <select onChange={(event) => this.handleOnChangeType(event)}>
                                    <option value='day'>Ngày</option>
                                    <option value='month'>Tháng</option>
                                    <option value='year'>Năm</option>
                                </select>
                            </div>
                            {this.state.type == 'day' &&
                                <div className='flex items-center space-x-[40px]'>
                                    <div>
                                        <label>Ngày BD : </label>
                                        <input type='date' onChange={(event) => this.handleOnChangeDateStart(event)} />
                                    </div>
                                    <div>
                                        <label>Ngày KT : </label>
                                        <input type='date' onChange={(event) => this.handleOnChangeDateFinish(event)} />
                                    </div>
                                </div>
                            }
                            {this.state.type == 'month' &&
                                <DatePicker onChange={(event) => this.handleOnchangeMonth(event)}
                                    label={'Tháng'} openTo="year" views={['year', 'month']} />
                            }
                            {this.state.type == 'year' &&
                                <DatePicker onChange={(event) => this.handleOnchangeYear(event)}
                                    label={'Năm'} openTo="year" views={['year']} />
                            }
                            <div>
                                <button onClick={() => this.handleStatistical()}
                                    className='px-[10px] bg-[#50d770] py-[5px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'>Thống kê</button>
                            </div>
                        </div>
                        <div className='flex items-center justify-between font-[500]'>
                            <label>Tổng số đơn : {this.state.index}</label>
                            <label>Tổng tiền : {this.state.total} Vnđ</label>
                        </div>
                    </div>
                    <div className='shadow-md '>
                        <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                            <div><span>ID</span></div>
                            <div className='col-span-4'><span>Tour</span></div>
                            <div><span>Ngày đặt</span></div>
                            <div><span>Ngày đi</span></div>
                            <div><span>Tổng tiền</span></div>
                            <div className='col-span-2'><span>Trạng thái</span></div>
                            <div className='col-span-2'><span>Hành động</span></div>
                        </div>
                        {dataOrders && dataOrders.map((item, index) => {
                            return (
                                <div key={item.id}
                                    className='grid grid-cols-12 bg-white py-[5px] text-center items-center border-b-[1px] font-[450]'>
                                    <div><span>{item.id}</span></div>
                                    <div className='col-span-4'><span>{item.date_create}</span></div>
                                    <div><span>{item.createdAt}</span></div>
                                    <div><span>{item.departure_date}</span></div>
                                    <div><span>{item.total}</span></div>
                                    <div className='col-span-2'><span>{item.Status.name}</span></div>
                                    <div className='col-span-2 flex items-center justify-center  space-x-[10px] text-white text-[14px]'>
                                        <button onClick={() => this.onClickShow('detail', item)}
                                            className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Xem</button>
                                        <button onClick={() => this.handleDeleteOrder(item.id)}
                                            className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Xóa</button>
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

export default ManageRevenue;