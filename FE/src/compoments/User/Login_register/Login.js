import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import bg from '../../../assets/images/bg.jpg';
import { toast } from 'react-toastify';
import { login } from '../../../servicers1/userServices';
import { VscGithubAlt, VscLock, VscAccount } from "react-icons/vsc";
import Register from './register';
import { NavLink } from "react-router-dom";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: '0',
            whoUser: true,
            email: '',
            password: '',
        }
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    CheckBoxUser = () => {
        this.setState({
            whoUser: !this.state.whoUser
        })
    }
    Login = async () => {
        let data = await login(this.state.email, this.state.password)
        if (data && data.data && data.data.errCode == 0) {
            let listRole = data.data.user.roles
            if (this.state.whoUser == true) {
                const CustomerRole = listRole.find((x) => x.id == "2");
                console.log(CustomerRole);
                if (CustomerRole) {
                    toast.success(data.data.errMessage)
                    this.props.UserLoginSuccess(data.data.user)
                    this.props.history.push('/index')
                } else {
                    toast.error('Tài khoản không có quyền khách hàng')
                }
            } if (this.state.whoUser == false) {
                const StaffRole = listRole.find((x) => x.id == "1");
                const AdminRole = listRole.find((x) => x.id == "3");
                if (StaffRole || AdminRole) {
                    toast.success(data.data.errMessage)
                    this.props.AdminLoginSuccess(data.data.user)
                    this.props.history.push('dashboard')

                } else {
                    toast.error('Tài khoản không có quyền nhân viên')
                }
            }
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickShow = (input) => {
        this.setState({
            isActive: input
        })
    }
    render() {
        return (
            <>
                <div className='h-screen w-screen bg-center flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>
                    <div className='bg-gradient-to-b from-[#26c9ec] to-[#100134] p-[40px] rounded-[10px]'>
                        {/* Login */}
                        {this.state.isActive == '0' &&
                            <div className='space-y-[20px] text-center'>
                                <div className='flex justify-center'>
                                    <VscAccount className='text-[80px] text-white' />
                                </div>
                                {this.state.whoUser == true && <span className='text-white font-[600]'>TÀI KHOẢN KHÁCH HÀNG</span>}
                                {this.state.whoUser == false && <span className='text-white font-[600]'>TÀI KHOẢN NHÂN VIÊN</span>}
                                <div className='flex items-center justify-center'>
                                    <div className='bg-[#ef6a64] border-[1px] rounded-tl-[5px] rounded-bl-[5px] border-white h-[40px] w-[45px] flex justify-center items-center'>
                                        <VscGithubAlt className='text-white text-[22px]' />
                                    </div>
                                    <input onChange={(event) => this.handleOnChangeEmail(event)}
                                        placeholder='Email' type='email'
                                        className='w-[250px] h-[40px] border-white  rounded-br-[5px] rounded-tr-[5px] pl-[10px]' />
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='bg-[#ef6a64] border-[1px] rounded-tl-[5px] rounded-bl-[5px] border-white h-[40px] w-[45px] flex justify-center items-center'>
                                        <VscLock className='text-white text-[22px]' />
                                    </div>
                                    <input onChange={(event) => this.handleOnChangePassword(event)}
                                        placeholder='Mật khẩu' type='password'
                                        className='w-[250px] h-[40px] border-white rounded-br-[5px] rounded-tr-[5px] pl-[10px]' />
                                </div>
                                <div>
                                    <button onClick={() => this.Login()}
                                        className='w-full py-[8px] rounded-[5px] text-white font-[500] bg-[#f86f96]'>Đăng nhập</button>
                                </div>
                                <div className=' flex items-center justify-between border-b pb-[20px]'>
                                    <div className='flex items-center space-x-[6px] text-[#dfdfdf]'>
                                        <input onClick={() => this.CheckBoxUser()}
                                            type='checkbox' className='rounded-[4px] bg-[#100134] border-[2px] border-[#dfdfdf]' />
                                        {this.state.whoUser == true && <span>Nhân viên</span>}
                                        {this.state.whoUser == false && <span>Khách hàng</span>}
                                    </div>
                                    <div className='italic text-[16px] text-[#adadad]'>
                                        <span>Quên mật khẩu ?</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between text-white font-[500]'>
                                    <button onClick={() => this.onClickShow('1')}
                                        className='bg-[#0582b2] w-[100px] rounded-[5px] py-[4px]'>Đăng ký</button>
                                    <button className='bg-[#0582b2] w-[100px] rounded-[5px] py-[4px]'><NavLink to="/index">Trang chủ</NavLink></button>
                                </div>
                            </div>
                        }
                        {/* Register */}
                        {this.state.isActive == '1' &&
                            <Register onClickShow={this.onClickShow} />
                        }
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        UserLoginSuccess: (userInfo) => dispatch(actions.UserLoginSuccess(userInfo)),
        AdminLoginSuccess: (adminInfo) => dispatch(actions.AdminLoginSuccess(adminInfo))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));