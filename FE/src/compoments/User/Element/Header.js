import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { NavLink } from "react-router-dom";
import { VscChevronDown, VscBell, VscComment } from "react-icons/vsc";
import { VscGear, VscAccount, VscExport } from "react-icons/vsc";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMenu: false
        }
    }
    onClickInforUser = () => {
        this.setState({
            isShowMenu: !this.state.isShowMenu
        })
    }
    onClickFrofile = () => {
        this.props.onClickShow('InfoUser')
    }
    render() {
        const { userInfo, isLoggedIn, processLogout } = this.props;
        return (
            <>
                <div className=' bg-[#6ac9e9] shadow-md flex items-center justify-between px-[30px]'>
                    {/* Logo */}
                    <div className='cursor-pointer text-[30px] font-[700] py-[10px] text-[#00b5b3]'>
                        <h1 className=' font-extrabold text-transparent bg-clip-text bg-white'><NavLink to="/index">BookingTours</NavLink></h1>
                    </div>
                    {isLoggedIn == true ?
                        <div className='flex items-center text-white'>
                            <div className='flex items-center text-[20px] space-x-[30px] pr-[50px]'>
                                <button className='relative'>
                                    <VscBell className='block ' />
                                    <span className='absolute left-[10px] bottom-[10px]  text-[14px] px-[7px] rounded-full bg-[#ff5370]'>5</span>
                                </button>
                                <button className='relative'>
                                    <VscComment className='block' />
                                    <span className='absolute left-[10px] bottom-[10px] text-white text-[14px] px-[7px] rounded-full bg-[#ff5370]'>5</span>
                                </button>
                            </div>
                            <div onClick={() => this.onClickInforUser()}
                                className='flex items-center justify-between space-x-[10px] cursor-pointer'>
                                <div className='h-[40px] w-[40px] bg-[#3a3535] rounded-full shadow-md'>
                                </div>
                                <span>{userInfo.name == '' ? "unknow" : `${userInfo.name}`}</span>
                                <VscChevronDown />
                            </div>
                        </div>
                        :
                        <div className='font-[500] text-white text-[18px]'>
                            <button> <NavLink to="/login">Đăng nhập - Đăng ký</NavLink></button>
                        </div>
                    }

                </div>
                {this.state.isShowMenu == true &&
                    <div className=' w-[200px] border bg-white text-[#363636] rounded-[6px] shadow-lg absolute right-[100px] top-[80px]'>
                        <div className='py-[14px]'>
                            <button onClick={() => this.onClickFrofile()}
                                className='flex items-center w-full hover:bg-[#f1f1f1] py-[5px] px-[20px] space-x-[10px]'>
                                <VscAccount className='text-[20px]' />
                                <span><NavLink to="/prolife">Cá nhân</NavLink></span>
                            </button>
                            <button className='flex items-center w-full hover:bg-[#f1f1f1] py-[5px] px-[20px] space-x-[10px]'>
                                <VscGear className='text-[20px]' />
                                <span>Cài đặt</span>
                            </button>
                            <button onClick={processLogout}
                                className='flex items-center w-full hover:bg-[#f1f1f1] py-[5px] px-[20px] space-x-[10px]'>
                                <VscExport className='text-[20px]' />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                }
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);