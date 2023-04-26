import React from 'react';
import HeaderMenu from './HeaderMenu';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { VscChevronDown, VscBell, VscComment } from "react-icons/vsc";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHideMenuHeader: false
        }
    }
    componentDidMount() {

    }
    onClickOutside = (x) => {
        this.setState({
            isHideMenuHeader: x
        })
    }
    onClickInforUser = () => {
        this.setState({
            isHideMenuHeader: true
        })
    }
    render() {
        let { adminInfo, processLogoutAdmin, isLoggedIn } = this.props
        return (
            <div className='top-0 sticky'>
                <div className=' w-full bg-white shadow-md flex items-center justify-between px-[30px]'>
                    {/* Logo */}
                    <div className='cursor-pointer text-[30px] font-[700]  text-[#00b5b3]'>
                        <h1 className=' font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500'>BookingTours</h1>
                    </div>
                    {/* Header Right */}
                    <div className='flex items-center  py-[16px]'>
                        <div className='flex items-center text-[20px] space-x-[30px] pr-[50px]'>
                            {/* Notifi */}
                            <button className='relative'>
                                <VscBell className='block' />
                                <span className='absolute left-[10px] bottom-[10px] text-white text-[14px] px-[7px] rounded-full bg-[#ff5370]'>5</span>
                            </button>
                            {/* Message */}
                            <button className='relative'>
                                <VscComment className='block' />
                                <span className='absolute left-[10px] bottom-[10px] text-white text-[14px] px-[7px] rounded-full bg-[#35d6b6]'>5</span>
                            </button>
                        </div>
                        {/*  */}
                        <div onClick={() => this.onClickInforUser()}
                            className='flex items-center justify-between space-x-[10px] cursor-pointer'>
                            <div className='h-[40px] w-[40px] bg-[#3a3535] rounded-full shadow-md'>
                            </div>
                            {isLoggedIn == false ? <span>Unknow</span> : <span>{adminInfo.name}</span>}
                            <VscChevronDown />
                        </div>
                    </div>
                </div>
                {this.state.isHideMenuHeader == true &&
                    <HeaderMenu onClickOutside={this.onClickOutside} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        adminInfo: state.admin.adminInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogoutAdmin: () => dispatch(actions.processLogoutAdmin()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);