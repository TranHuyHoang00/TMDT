import React from 'react';
class ModalOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataOrder: {},
            dataUser: {}
        }
    }
    componentDidMount() {
        this.setState({
            dataOrder: this.props.data,
            dataUser: this.props.data.User
        })
    }
    onClickExit = () => {
        console.log(this.state);
        this.props.onClickHide()
    }
    render() {
        let dataOrder = this.state.dataOrder
        let dataUser = this.state.dataUser
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative max-w-5xl max-h-screen px-[100px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>CHI TIẾT ĐƠN ĐẶT</h1>
                                </div>
                                <div className='space-y-[10px]  text-[18px] shadow-md p-[20px] rounded-[10px]'>
                                    <label>Người đặt : {dataUser.name}</label><br />
                                    <div className='space-x-[20px]'>
                                        <label>Email : {dataUser.email}</label>
                                        <label>Giới tính : {dataUser.gender == 1 ? 'Nam' : 'Nữ'}</label>
                                    </div>
                                    <div className='space-x-[20px]'>
                                        <label>Căn cước  : {dataUser.cccd}</label>
                                        <label>Số điện thoại : {dataUser.phone}</label>
                                        <label>Ngày sinh: {dataUser.dateOfbirth}</label><br />
                                    </div>
                                    <div><label>Địa chỉ : {dataUser.address}</label></div>
                                </div>
                                <div className='space-y-[10px] text-[18px] shadow-md p-[20px] rounded-[10px]'>
                                    <label>Tên Tour : {dataOrder.date_create}</label><br />
                                    <div className='space-x-[20px]'>
                                        <label>Ngày đặt : {dataOrder.createdAt}</label>
                                        <label>Ngày đi : {dataOrder.departure_date}</label>
                                    </div>
                                    <div className='space-x-[20px]'>
                                        <label>Tổng tiền : {dataOrder.total}</label>
                                        <label>Thanh toán : {dataOrder.paymentId == 1 ? 'Tiền mặt' : 'Online'}</label>
                                    </div>
                                    {dataOrder.Order_Tour_tickets && dataOrder.Order_Tour_tickets.map((item, index) => {
                                        return (
                                            <div className='space-x-[20px]'>
                                                <label>Vé {item.Tour_ticket.Ticket.type == 2 ? 'người lớn' : 'trẻ em'}</label>
                                                <label>Giá vé gốc : {item.Tour_ticket.Ticket.price} VND</label>
                                                <label>Số lượng : {item.quantity} vé</label>
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

export default ModalOrderDetail;