import React from 'react';
import { connect } from 'react-redux';
import { getAllOrderUser, editOrder } from '../../../servicers1/orderService';
import { toast } from 'react-toastify';
import ModalOrderDetail from '../../Element/ModalOrderDetail';
class OrderUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOrders: [],
            dataOrder: {},
            isActive: ''
        }
    }
    async componentDidMount() {
        await this.getAllOrderUser();
    }
    getAllOrderUser = async () => {
        const { userInfo } = this.props;
        let data = await getAllOrderUser(userInfo.id);
        console.log(data.data.data);
        // let x = data.data.data;
        // let nameTour = []
        // for (const i of x) {
        //     for (const j of i.tour_tickets) {
        //         let name = j.Tour.name;
        //         console.log(name);
        //     }
        //     nameTour.push(name)
        // }
        // console.log('listTour', nameTour);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataOrders: data.data.data,
            })
        }
    }
    onClickHuy = async (id, check) => {
        let dataEdit = ''
        if (check == 'huy') {
            dataEdit = { id: id, statusId: 6 }
        }
        if (check == 'bohuy') {
            dataEdit = { id: id, statusId: 3 }
        }
        let data = await editOrder(dataEdit);
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getAllOrderUser()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickShow = (input, order) => {
        if (input == 'detail') {
            this.setState({
                isActive: 'detail',
                dataOrder: order
            })
        }
    }
    onClickHide = () => {
        this.setState({ isActive: '' })
    }
    render() {
        let dataOrders = this.state.dataOrders
        return (
            <>
                <div className='shadow-md'>
                    <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                        <div><span>ID</span></div>
                        <div className='col-span-4'><span>Tour</span></div>
                        <div><span>Ngày đặt</span></div>
                        <div><span>Ngày đi</span></div>
                        <div><span>Tổng tiền</span></div>
                        <div className='col-span-2'><span>Trạng thái</span></div>
                        <div className='col-span-2'><span>Hành động</span></div>
                    </div>
                    {dataOrders && dataOrders.map((order, index) => {
                        return (
                            <div key={order.id}
                                className='grid grid-cols-12 py-[5px] text-center items-center border-b-[1px] font-[450]'>
                                <div><span>{order.id}</span></div>
                                <div className='col-span-4'><span>{order.date_create}</span></div>
                                <div><span>{order.createdAt}</span></div>
                                <div><span>{order.departure_date}</span></div>
                                <div><span>{order.total}</span></div>
                                <div className='col-span-2'><span>{order.Status.name}</span></div>
                                <div className='col-span-2 flex items-center  space-x-[10px] text-white text-[14px]'>
                                    <button onClick={() => this.onClickShow('detail', order)}
                                        className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Xem</button>
                                    {order.Status.id == 3 &&
                                        <button onClick={() => this.onClickShow('edit', order)}
                                            className='shadow-md px-[5px] rounded-[5px] bg-[#50d770]'>Sửa</button>
                                    }
                                    {order.Status.id == 3 &&
                                        <button onClick={() => this.onClickHuy(order.id, 'huy')}
                                            className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Hủy</button>
                                    }
                                    {order.Status.id == 5 &&
                                        <button className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Xóa</button>
                                    }
                                    {order.Status.id == 6 &&
                                        <button onClick={() => this.onClickHuy(order.id, 'bohuy')}
                                            className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Bỏ hủy</button>
                                    }
                                    {order.Status.id == 7 &&
                                        <button className='shadow-md px-[5px] rounded-[5px] bg-[#fd475d]'>Xóa</button>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
                {this.state.isActive == 'detail' && <ModalOrderDetail
                    data={this.state.dataOrder}
                    onClickHide={this.onClickHide} />}
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderUser);
