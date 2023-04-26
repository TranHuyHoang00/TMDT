import React from 'react';
import onClickOutside from 'react-onclickoutside'
import { VscGear, VscAccount, VscExport } from "react-icons/vsc";
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { NavLink } from "react-router-dom";

class HeaderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleClickOutside = () => {
        this.props.onClickOutside(false)
    }
    render() {
        let { processLogoutAdmin } = this.props
        return (
            <div className=' w-[250px] bg-white text-[#363636] rounded-[6px] shadow-lg absolute right-[20px] top-[85px]'>
                <div className='py-[14px]'>
                    <button className='flex items-center w-full hover:bg-[#f1f1f1] py-[5px] px-[20px] space-x-[10px]'>
                        <VscAccount className='text-[20px]' />
                        <span>Thông tin cá nhân</span>
                    </button>
                    <button className='flex items-center w-full hover:bg-[#f1f1f1] py-[5px] px-[20px] space-x-[10px]'>
                        <VscGear className='text-[20px]' />
                        <span>Cài đặt</span>
                    </button>
                    <button onClick={processLogoutAdmin}
                        className='flex items-center w-full hover:bg-[#f1f1f1] py-[5px] px-[20px] space-x-[10px]'>
                        <VscExport className='text-[20px]' />
                        <span><NavLink to="/login">Đăng xuất</NavLink></span>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        adminInfo: state.admin.adminInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogoutAdmin: () => dispatch(actions.processLogoutAdmin()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(HeaderMenu));