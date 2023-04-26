import React from 'react';
import { getAllTour, getAllSearch } from '../../../servicers1/tourService';
import anh1 from '../../../assets/images/1.jpg';
import { withRouter } from 'react-router-dom';
import Search from './Search';
import { AiOutlineClockCircle, AiOutlineMoneyCollect } from "react-icons/ai";
import { VscLocation, VscAccount } from "react-icons/vsc";
import { BsFillCarFrontFill, BsAirplaneEnginesFill, BsTrainFrontFill } from "react-icons/bs";
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTours: []
        }
    }
    async componentDidMount() {
        await this.getManageAllTours('All');
    }
    getManageAllTours = async (id) => {
        let data = await getAllTour(id);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataTours: data.data.data,
            })
        }
    }
    getManageAllToursSearch = async (text) => {
        let data = await getAllSearch(text);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataTours: data.data.data,
            })
        }
    }
    onClickShowTourDetail = (id) => {
        this.props.history.push(`/tourdetail/${id}`)
    }
    render() {
        let dataTours = this.state.dataTours
        return (
            <>
                <Search getManageAllTours={this.getManageAllTours}
                    getManageAllToursSearch={this.getManageAllToursSearch} />
                <div className='grid grid-cols-4 pb-[100px] gap-[40px] '>
                    {dataTours && dataTours.map((item, index) => {
                        return (
                            <div onClick={() => this.onClickShowTourDetail(item.id)}
                                key={item.id} className='border-[2px] shadow-xl rounded-[5px] cursor-pointer'>
                                <div className='h-[200px] w-full bg-black'>
                                    <img src={anh1} className='h-[200px] w-auto' />
                                </div>
                                <div className='bg-[#6d84f8] text-white text-center'>
                                    <label className='text-[20px] font-[500] '>{item.place_finish.name}</label>
                                </div>
                                <div className=' text-[14px] text-[#111111b0] font-[500] py-[10px] px-[10px] space-y-[5px]'>
                                    <div className=''>
                                        <label className='text-black font-[500] text-[14px]'>{item.name}</label>
                                    </div>
                                    <div className='justify-between flex'>
                                        <div className='flex items-center space-x-[5px]'>
                                            <AiOutlineClockCircle />
                                            <label>{item.number_of_date} ngày {item.number_of_date - 1} đêm</label>
                                        </div>
                                        <div className='flex items-center space-x-[5px]'>
                                            {item.Vehicle.id == 1 && <BsAirplaneEnginesFill />}
                                            {item.Vehicle.id == 2 && <BsTrainFrontFill />}
                                            {item.Vehicle.id == 3 && <BsFillCarFrontFill />}
                                            <label>{item.Vehicle.name}</label>
                                        </div>
                                    </div>
                                    <div>
                                        <label></label>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center space-x-[5px]'>
                                            <VscLocation />
                                            <label>{item.place_start.name}</label>
                                        </div>
                                        <div className='flex items-center space-x-[5px]'>
                                            <VscAccount />
                                            <label>{item.quantity_max}</label>
                                        </div>
                                    </div>
                                    <div className='flex items-center space-x-[5px]'>
                                        <AiOutlineMoneyCollect />
                                        {item.discounts && item.discounts.map((index, item) => {
                                            return (
                                                <label key={item.id}
                                                    className='bg-[#fd475d] text-white px-[5px]'>{index.value}%</label>
                                            )
                                        })}
                                    </div>
                                    <div className='bg-[#04c048] rounded-[2px] text-white text-center font-[500] text-[20px] py-[2px] mb-[10px]'>
                                        <button className=''>Xem chi tiết</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }

                </div>
            </>
        )
    }
}

export default withRouter(Main);