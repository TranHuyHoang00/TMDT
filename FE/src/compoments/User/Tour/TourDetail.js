import React from 'react';
import Header from '../Element/Header';
import { getAllTour } from '../../../servicers1/tourService';
import anh2 from '../../../assets/images/2.jpg';
import Checkout from './Checkout';
class TourDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTour: {},
            dataTickets: [],
            sumDiscount: '',
            isShowCheckout: false
        }
    }
    async componentDidMount() {
        await this.getDetailTourHome();
    }
    getDetailTourHome = async () => {
        let id = this.props.match.params.id;
        let data = await getAllTour(id);
        if (data && data.data && data.data.errCode == 0) {
            let sumDiscount = 0;
            for (const i of data.data.data.discounts) {
                sumDiscount += i.value
            }
            this.setState({
                sumDiscount: sumDiscount,
                dataTour: data.data.data,
                dataTickets: data.data.data.tickets
            })
        }
    }
    onClickShow = () => {
        this.setState({
            isShowCheckout: true
        })
    }
    onClickHide = () => {
        this.setState({
            isShowCheckout: false
        })
    }
    render() {
        let dataTour = this.state.dataTour
        return (
            <>
                <Header />
                <div className='px-[150px] space-y-[10px]'>
                    <div className='text-[26px] pt-[10px] font-[700] text-[#e40404]'>
                        <span>{dataTour.name}</span>
                    </div>
                    <div className=' text-[18px] text-black space-x-[10px]'>
                        <span>Sự kiện giảm giá : </span>
                        {dataTour.discounts && dataTour.discounts.map((discount, index) => {
                            return (
                                <span key={discount.id} className='text-[#e40404]'>{discount.name} ,</span>
                            )
                        })}
                    </div>
                    <div className='grid grid-cols-3 gap-x-[40px] '>
                        <div className='col-span-2'>
                            <img src={anh2} />
                        </div>

                        <div className='bg-white'>
                            <div className='text-[22px] p-[20px] border-[2px] rounded-[5px] shadow-xl'>
                                <div className='space-y-[10px]'>
                                    <span className='text-[20px]'>Giảm giá : </span>
                                    {dataTour.discounts && dataTour.discounts.map((discount, index) => {
                                        return (
                                            <span className=' bg-[#de3a3b] text-white text-[18px] font-[500] px-[10px] py-[5px] mr-[10px] rounded-[2px]'>
                                                {discount.value}%</span>
                                        )
                                    })}
                                    <div>
                                        {dataTour.tickets && dataTour.tickets.map((ticket, index) => {
                                            return (
                                                <div key={ticket.id} className='text-[16px] space-x-[10px]'>
                                                    {ticket.type == 1 && <span>Trẻ em :</span>}
                                                    {ticket.type == 2 && <span>Người lớn:</span>}
                                                    <span className='line-through text-[#111111da] text-[18px] font-[500]'>{ticket.price} Vnd</span><br />
                                                </div>
                                            )
                                        })}

                                    </div>
                                    {dataTour.tickets && dataTour.tickets.map((ticket, index) => {
                                        return (
                                            <div key={ticket.id} className='text-[20px] space-x-[10px]'>
                                                {ticket.type == 1 && <span>Trẻ em :</span>}
                                                {ticket.type == 2 && <span>Người lớn:</span>}
                                                <span className='text-[#ff3c3c] font-[600]'>{(ticket.price) - (ticket.price * (this.state.sumDiscount / 100))} VNĐ</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                {
                                    this.state.isShowCheckout == true &&
                                    <Checkout onClickHide={this.onClickHide}
                                        data={this.state} />
                                }
                                <div className='text-center bg-[#4e3883] text-white text-[20px] py-[5px] font-[600] mt-[10px] rounded-[5px]'>
                                    <button onClick={() => this.onClickShow()}>ĐẶT NGAY NÀO</button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 gap-[40px] py-[40px]'>
                        <div className='col-span-2'>
                            <div className='justify-between flex font-[500] pb-[10px]'>
                                <div>
                                    <span>Điểm khởi hành :</span>
                                </div>
                                <div>
                                    <span>Điểm đến :</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-between font-[500] border-b-[2px] pb-[30px]'>
                                <div> <span>Phương tiện :</span></div>
                                <div><span>Thời gian : {dataTour.number_of_date} ngày - {dataTour.number_of_date - 1} đêm</span></div>
                                <div><span>Số khách : {dataTour.quantity_max}</span></div>
                            </div>
                            <div className='space-y-[20px]'>
                                <div className='space-y-[10px]'>
                                    <h1 className='text-[24px] text-white bg-[#6d84f8] font-[500] pl-[20px] rounded-[2px] '>Mô tả sơ lược</h1>
                                    <div className='px-[20px]'>
                                        <span className=''>{dataTour.description}</span>
                                    </div>
                                </div>
                                <div className='space-y-[10px]'>
                                    <h1 className='text-[24px] text-white bg-[#6d84f8] font-[500] pl-[20px] rounded-[2px] '>Lịch trình</h1>
                                    {dataTour.plans && dataTour.plans.map((plan, index) => {
                                        return (
                                            <div key={plan.id} className='space-y-[10px]'>
                                                <span className='text-[18px] font-[500] underline'>{plan.name}</span><br />
                                                {plan.details && plan.details.map((detail, index) => {
                                                    return (
                                                        <div key={detail.id} className='px-[20px]'>
                                                            {detail.type == 1 && <span className='text-[17px] font-[500]'>Sáng : </span>}
                                                            {detail.type == 2 && <span className='text-[17px] font-[500]'>Trưa : </span>}
                                                            {detail.type == 3 && <span className='text-[17px] font-[500]'>Chiều : </span>}
                                                            {detail.type == 4 && <span className='text-[17px] font-[500]'>Tối : </span>}
                                                            <span>{detail.description}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <div className='space-y-[10px]'>
                                    <h1 className='text-[24px] text-white bg-[#6d84f8] font-[500] pl-[20px] rounded-[2px]'>Dịch vụ</h1>
                                    {dataTour.services && dataTour.services.map((service, index) => {
                                        return (
                                            <div key={service.id} className='px-[20px]'>
                                                <span className='text-[17px] font-[500]'>{service.name} : </span>
                                                <span>{service.description}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className=' space-y-[10px]'>
                                    <h1 className='text-[24px] text-white bg-[#6d84f8] font-[500] pl-[20px] rounded-[2px]'>Lưu ý</h1>
                                    {dataTour.notes && dataTour.notes.map((note, index) => {
                                        return (
                                            <div key={note.id} className='px-[20px]'>
                                                <span>- {note.description}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='items-center justify-between flex px-[10px] pt-[10px]'>
                                <div className=''>
                                    <button className='bg-[#4e3883] py-[5px] text-white px-[10px] rounded-[4px] 
                                    font-[500] text-[16px] shadow-md'
                                        onClick={() => this.onClickXemBinhLuan()}>XEM BÌNH LUẬN</button>
                                </div>
                                <div>
                                    <button className='bg-[#4e3883] py-[5px] text-white px-[10px] rounded-[4px] 
                                    font-[500] text-[16px] shadow-md'
                                        onClick={() => this.onClickBinhLuan()}>BÌNH LUẬN NGAY</button>
                                </div>
                            </div>
                            {/* {isHideShowBinhLuan == true ?
                                <TourBinhluan InforIdTour={this.state.idTour} />
                                :
                                <div className='shadow-xl border-[2px] px-[20px] my-[20px] bg-white mx-[10px] rounded-[5px] '>
                                     <span className='text-[#111111c7] '>Chưa có bình luận</span>
                                </div>
                            } */}

                            {/* {isHideShowXemBinhLuan == true ?
                                <div>
                                    {binhluans && binhluans.map((item, index) => {
                                        return (
                                            <div key={item.id} className='shadow-xl px-[20px] my-[20px] bg-white mx-[10px] border-[2px] rounded-[5px]'>
                                                <div className='flex items-center pt-[10px]'>
                                                    <div className='h-[60px] w-[60px] bg-black rounded-full'>

                                                    </div>
                                                    <div className='pl-[20px] text-[#111111a9]  font-[500] '>
                                                        <span className='text-[#23409c]'>{item.User.ten}</span><br />
                                                        <span>{item.createdAt}</span><br />
                                                        <span>{item.danhgia} sao</span>
                                                    </div>
                                                </div>
                                                <div className='py-[5px] '>
                                                    <span className='text-[#111111ad]'>{item.binhluan}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                :
                                <></>
                            } */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default TourDetail;