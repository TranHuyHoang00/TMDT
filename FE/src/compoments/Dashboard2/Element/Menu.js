import React from 'react';

import { VscHome, VscTriangleDown, VscTriangleUp, VscAccount, VscTriangleRight } from "react-icons/vsc";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            isShowBang: false,
            isShowThongke: false
        }
    }
    onClickShowBang = () => {
        this.setState({
            isShowBang: !this.state.isShowBang
        })
    }
    onClickShowThongke = () => {
        this.setState({
            isShowThongke: !this.state.isShowThongke
        })
    }
    onClickTableChild = (input) => {
        this.props.onClickTable(input);
    }
    render() {

        return (
            <div className='w-1/6 h-full bg-[#263544] overflow-y-auto  text-white'>
                {/* Logo */}
                <div className='bg-[#263544] w-full top-0 sticky px-[15px] flex items-center justify-between border-b py-[16px]'>
                    <div className='h-[40px] w-[40px] bg-white'>
                    </div>
                    <div className=' font-[500] text-[20px]'>
                        <span>ADMINDEK</span>
                    </div>
                </div>
                {/* Dashboard */}
                <div className='w-full'>
                    <div>
                        <button onClick={() => this.onClickShowBang()}
                            className='flex w-full items-center justify-between py-[10px] pl-[15px] pr-[10px] hover:bg-[#1d2531] text-[16px]'>
                            <div className='flex items-center '>
                                <VscHome className='mr-[10px]' />
                                <span>Bảng</span>
                            </div>
                            {this.state.isShowDashboards == true ?
                                <VscTriangleUp /> : <VscTriangleDown />
                            }
                        </button>
                        {this.state.isShowBang == true &&
                            <>
                                <button onClick={() => this.onClickTableChild('user')}
                                    className='flex w-full items-center space-x-[10px] py-[10px] pl-[25px] hover:bg-[#1d2531] text-[14px] '>
                                    <VscTriangleRight />
                                    <VscAccount />
                                    <span>Người dùng</span>
                                </button>
                                <button onClick={() => this.onClickTableChild('tour')}
                                    className='flex w-full items-center space-x-[10px] py-[10px] pl-[25px] hover:bg-[#1d2531] text-[14px] '>
                                    <VscTriangleRight />
                                    <VscAccount />
                                    <span>Tours</span>
                                </button>
                                <button onClick={() => this.onClickTableChild('order')}
                                    className='flex w-full items-center space-x-[10px] py-[10px] pl-[25px] hover:bg-[#1d2531] text-[14px] '>
                                    <VscTriangleRight />
                                    <VscAccount />
                                    <span>Đơn đặt</span>
                                </button>
                                <button onClick={() => this.onClickTableChild('service')}
                                    className='flex w-full items-center space-x-[10px] py-[10px] pl-[25px] hover:bg-[#1d2531] text-[14px] '>
                                    <VscTriangleRight />
                                    <VscAccount />
                                    <span>Dịch vụ</span>
                                </button>
                                <button onClick={() => this.onClickTableChild('discount')}
                                    className='flex w-full items-center space-x-[10px] py-[10px] pl-[25px] hover:bg-[#1d2531] text-[14px] '>
                                    <VscTriangleRight />
                                    <VscAccount />
                                    <span>Khuyến mãi</span>
                                </button>
                            </>
                        }
                        <button onClick={() => this.onClickShowThongke()}
                            className='flex w-full items-center justify-between py-[10px] pl-[15px] pr-[10px] hover:bg-[#1d2531] text-[16px]'>
                            <div className='flex items-center '>
                                <VscHome className='mr-[10px]' />
                                <span>Thống kê</span>
                            </div>
                            {this.state.isShowDashboards == true ?
                                <VscTriangleUp /> : <VscTriangleDown />
                            }
                        </button>
                        {this.state.isShowThongke == true &&
                            <>
                                <button onClick={() => this.onClickTableChild('revenue')}
                                    className='flex w-full items-center space-x-[10px] py-[10px] pl-[25px] hover:bg-[#1d2531] text-[14px] '>
                                    <VscTriangleRight />
                                    <VscAccount />
                                    <span>Doanh thu</span>
                                </button>
                            </>
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;