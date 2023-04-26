import React from 'react';
import { toast } from 'react-toastify';
import { createUser } from '../../../servicers1/userServices';
import { VscAccount } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusId: '1',
            listDataRole: [{ id: '2' }],
        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    handelCreateUser = async () => {
        let data = await createUser(this.state)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickShow = (input) => {
        this.props.onClickShow(input)
    }
    render() {
        return (
            <>
                <div className='space-y-[20px] text-center'>
                    <div className='flex justify-center'>
                        <VscAccount className='text-[80px] text-white' />
                    </div>
                    <div className='flex items-center space-x-[10px]'>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'email')}
                            placeholder='Email' type='email'
                            className='w-[250px] h-[40px] border-[#f86f96] border-[2px] rounded-[5px] pl-[10px]' />
                        <input onChange={(event) => this.handleOnChangeInput(event, 'password')}
                            placeholder='Mật khẩu' type='password'
                            className='w-[250px] h-[40px] border-[#f86f96] border-[2px] rounded-[5px] pl-[10px]' />
                    </div>
                    <div className='flex items-center space-x-[10px]'>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            placeholder='Tên' className='w-[250px] h-[40px] border-white rounded-[5px] pl-[10px]' />

                        <input onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            placeholder='Địa chỉ' className='w-[250px] h-[40px] border-white  rounded-[5px] pl-[10px]' />
                    </div>
                    <div className='flex items-center space-x-[10px]'>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                            placeholder='Số điện thoại' className='w-[250px] h-[40px] border-white rounded-[5px] pl-[10px]' />

                        <input onChange={(event) => this.handleOnChangeInput(event, 'cccd')}
                            placeholder='Căn cước' className='w-[250px] h-[40px] border-white  rounded-[5px] pl-[10px]' />
                    </div>
                    <div className='flex items-center space-x-[10px]'>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'dateOfbirth')}
                            type='date' placeholder='Ngày sinh'
                            className='w-[250px] h-[40px] border-white rounded-[5px] pl-[10px]' />
                        <select onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                            className='w-[250px] h-[40px] border-white rounded-[5px] pl-[10px]'>
                            <option>Giới tính</option>
                            <option value='0'>Nam</option>
                            <option value='1'>Nữ</option>
                        </select>
                    </div>
                    <div className='border-b pb-[30px]'>
                        <button onClick={() => this.handelCreateUser()}
                            className='w-full py-[8px] rounded-[5px] text-white font-[500] bg-[#f86f96]'>Đăng ký</button>
                    </div>

                    <div className='flex items-center justify-between text-white font-[500]'>
                        <button onClick={() => this.onClickShow('0')}
                            className='bg-[#0582b2] w-[100px] rounded-[5px] py-[4px]'>Đăng nhập</button>
                        <button className='bg-[#0582b2] w-[100px] rounded-[5px] py-[4px]'><NavLink to="/index">Trang chủ</NavLink></button>
                    </div>
                </div>
            </>
        )
    }
}

export default Register;