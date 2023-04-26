import React from "react";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder } from '../../../servicers1/orderService'

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            TotalUSD: '',
            dataCreate: {
                total: '',
                departure_date: '',

                paymentId: '',
                statusId: '',
                customerId: '',
                date_create: '',
                ListTicket: [
                ],
            },
            priceChild: '',
            priceAdult: '',
            totalChild: '',
            totalAdult: '',
        }
    }
    componentDidMount() {
        let sumDiscount = this.props.data.sumDiscount;
        let dataTickets = this.props.data.dataTickets;

        const child = dataTickets.find((x) => x.type == 1);
        const adult = dataTickets.find((x) => x.type == 2);

        let priceChild = child.price - ((child.price * sumDiscount) / 100)
        let priceAdult = adult.price - ((adult.price * sumDiscount) / 100)

        this.setState({
            dataCreate: {
                ...this.state.dataCreate,
                date_create: this.props.data.dataTour.name,
            },
            priceChild: priceChild,
            priceAdult: priceAdult,
        })
    }
    handleOnchangeNgaydi = (event) => {
        const { userInfo } = this.props;
        this.setState({
            dataCreate: {
                ...this.state.dataCreate,
                departure_date: event.target.value,
                customerId: userInfo.id
            }
        });
    }
    handleOnchangeThanhtoan = (event) => {
        if (event.target.value == 1) {
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    paymentId: 1,
                    statusId: 3,
                }
            });
        }
        if (event.target.value == 2) {
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    paymentId: 2,
                    statusId: 8
                }
            });
        }
    }
    handleOnchangeVeNguoiLon = (event) => {
        let totalChild = this.state.totalChild;
        let totalAdult = (this.state.priceAdult) * event.target.value;

        let dataTickets = this.props.data.dataTickets;
        const adult = dataTickets.find((x) => x.type == 2);
        let arr = this.state.dataCreate.ListTicket;
        const check = arr.find((x) => x.tour_ticket_Id == adult.id);
        if (check) {
            arr = arr.filter(x => x.tour_ticket_Id != adult.id);
            arr.push({ tour_ticket_Id: adult.id, quantity: event.target.value });
        } else {
            arr.push({ tour_ticket_Id: adult.id, quantity: event.target.value });
        }

        this.setState({
            ...this.state,
            totalAdult: totalAdult,
            dataCreate: {
                ...this.state.dataCreate,
                total: totalChild + totalAdult,
                ListTicket: arr
            },
            TotalUSD: ((totalChild + totalAdult) / 23730).toFixed(2),
        })

    }
    handleOnchangeVeTreEm = (event) => {
        let totalAdult = this.state.totalAdult;
        let totalChild = (this.state.priceChild) * event.target.value;

        let dataTickets = this.props.data.dataTickets;
        const child = dataTickets.find((x) => x.type == 1);
        let arr = this.state.dataCreate.ListTicket;
        const check = arr.find((x) => x.tour_ticket_Id == child.id);
        if (check) {
            arr = arr.filter(x => x.tour_ticket_Id != child.id);
            arr.push({ tour_ticket_Id: child.id, quantity: event.target.value })
        } else {
            arr.push({ tour_ticket_Id: child.id, quantity: event.target.value })
        }
        this.setState({
            ...this.state,
            totalChild: totalChild,
            dataCreate: {
                ...this.state.dataCreate,
                total: totalChild + totalAdult,
                ListTicket: arr
            },
            TotalUSD: ((totalChild + totalAdult) / 23730).toFixed(2),
        })
    }
    handleDonDat = async () => {
        try {
            let DateNow = new Date();
            let DateInput = new Date(this.state.dataCreate.departure_date)
            const { isLoggedIn } = this.props;
            if (!isLoggedIn) {
                toast.error('Vui lòng đăng nhập, để tiền hành đặt Tour')
                return;
            }
            if (DateNow > DateInput) {
                toast.error('Ngày đi phải lớn hơn thời gian hiện tại')
                return;
            }
            let data = await createOrder(this.state.dataCreate)
            if (data && data.data && data.data.errCode == 0) {
                toast.success(data.data.errMessage)
                this.props.onClickHide()
            } else {
                toast.error(data.data.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }
    onClickHide = () => {
        this.props.onClickHide()
    }

    render() {
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div>
                                <div className=' text-center border-[2px] shadow-xl py-[30px] px-[30px] rounded-[4px]'>
                                    <div className='text-[24px] font-[700] pb-[20px] text-[#1111119c]'>
                                        <label>THANH TOÁN </label><br />
                                    </div>
                                    <div className='font-[500] space-y-[20px]'>
                                        <div className='flex items-center  text-[18px] justify-between '>
                                            <label>Ngày đi</label>
                                            <input type='date' className='border-b-[2px] ml-[30px]'
                                                onChange={(event) => this.handleOnchangeNgaydi(event)}

                                            />
                                        </div>

                                        <div className='flex items-center text-[18px] justify-between'>
                                            <label>Vé người lớn: </label>
                                            <select className='border-b-[2px]'
                                                onChange={(event) => this.handleOnchangeVeNguoiLon(event)}>
                                                <option value=""></option>
                                                <option value="1">1 vé</option>
                                                <option value="2">2 vé</option>
                                                <option value="3">3 vé</option>
                                                <option value="4">4 vé</option>
                                                <option value="5">5 vé</option>
                                            </select>
                                        </div>
                                        <div className='flex items-center text-[18px] justify-between pt-[10px]'>
                                            <label>Vé trẻ em: </label>
                                            <select className='border-b-[2px]'
                                                onChange={(event) => this.handleOnchangeVeTreEm(event)}>
                                                <option value=""></option>
                                                <option value="1">1 vé</option>
                                                <option value="2">2 vé</option>
                                                <option value="3">3 vé</option>
                                                <option value="4">4 vé</option>
                                                <option value="5">5 vé</option>
                                            </select>
                                        </div>
                                        <div className='text-[18px] flex items-center justify-between'>
                                            <label>Thanh toán : </label>
                                            <select className='border-b-[2px]'
                                                onChange={(event) => this.handleOnchangeThanhtoan(event)}>
                                                <option value=""></option>
                                                <option value="1">Tiền mặt</option>
                                                <option value="2" >Online</option>
                                            </select>
                                        </div>

                                        <div className="py-[10px]">
                                            <div className='text-[20px]  font-[600]'>
                                                <label>Tổng tiền : <span className='text-[#e40404]'>{this.state.dataCreate.total} VNĐ</span></label>
                                            </div>
                                            <div className='text-[20px]  font-[600]'>
                                                <label>Thanh toán Online : <span className='text-[#e40404]'>{this.state.TotalUSD} USD</span></label>
                                            </div>
                                        </div>

                                    </div>
                                    {this.state.dataCreate.paymentId == 2 &&
                                        <div className=" ">
                                            <PayPalScriptProvider options={{ "client-id": "AcVdZ1J3nMVpwMZFx2ZVpVKsDN8Mrjd5LaALgNu8RbYhOlqUBXTisZR8SHmGS_ynmZk1W20reObC1NWP" }}>
                                                <PayPalButtons
                                                    createOrder={(data, actions) => {
                                                        return actions.order.create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: this.state.TotalUSD,
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order.capture().then((details) => {
                                                            toast.success('Thanh toán thành công');
                                                            this.handleDonDat()
                                                        });
                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        </div>
                                    }
                                    <div className="flex items-center justify-center">
                                        {this.state.dataCreate.paymentId == 1 &&
                                            <div>
                                                <button className='px-[20px] mr-[10px] bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                                    onClick={() => this.handleDonDat()}
                                                >ĐẶT NGAY</button>
                                            </div>
                                        }
                                        <div>
                                            <button className='w-[100px] bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                                onClick={() => this.onClickHide()}
                                            >THOÁT</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);