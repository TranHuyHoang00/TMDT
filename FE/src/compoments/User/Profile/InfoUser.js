import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from "../../../store/actions";
import { getUsers, editUser } from '../../../servicers1/userServices'
class InfoUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            status: ''
        }
    }
    async componentDidMount() {
        const { userInfo } = this.props;
        await this.getUsers(userInfo.id);
    }
    getUsers = async (id) => {
        let data = await getUsers(id);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataUser: data.data.data,
                status: data.data.data.Status.name
            })
        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state.dataUser };
        copyState[id] = event.target.value;
        this.setState({
            dataUser: {
                ...copyState
            }
        });
    }
    handleEditUser = async () => {
        let data = await editUser(this.state.dataUser);
        const { userInfo } = this.props;
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getUsers(userInfo.id);
        } else {
            toast.error(data.data.errMessage)
        }
    }
    render() {
        let dataUser = this.state.dataUser
        return (
            <>
                <div className='bg-[#f2f7fb] rounded-[10px] flex items-center justify-center'>
                    <div className='  bg-white flex shadow-lg rounded-[10px] my-[50px]'>
                        <div className='bg-white py-[20px] px-[20px] border-r'>
                            <div className='flex items-center justify-center'>
                                <div className='py-[10px]'>
                                    <div className='h-[200px] w-[200px] rounded-full bg-black'>
                                    </div>
                                    <div className='text-center'>
                                        <button>Thay ảnh</button>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center text-[20px] font-[500]'>
                                <input value={dataUser.name} onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                    className='border-b text-center' /><br />
                                <label className='text-[16px]'>{this.state.status}</label>
                            </div>
                        </div>
                        <div className='p-[20px] space-y-[20px]'>
                            <div className='border-b-[2px] pt-[10px]'>
                                <label className='text-[20px] font-[500]'>Thông tin cá nhân</label>
                            </div>
                            <div className='flex items-center space-x-[20px] text-[18px]'>
                                <div>
                                    <label>Email</label><br />
                                    <input value={dataUser.email}
                                        className='w-[300px] h-[30px] border-b' />
                                </div>
                                <div>
                                    <label>Số điện thoại</label><br />
                                    <input value={dataUser.phone} onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                                        className='w-[300px] h-[30px] border-b' />
                                </div>
                            </div>
                            <div className='flex items-center space-x-[20px] text-[18px]'>
                                <div>
                                    <label>Địa chỉ</label><br />
                                    <input value={dataUser.address} onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                        className='w-[300px] h-[30px] border-b' />
                                </div>
                                <div>
                                    <label>Căn cước công dân</label><br />
                                    <input value={dataUser.cccd} onChange={(event) => this.handleOnChangeInput(event, 'cccd')}
                                        className='w-[300px] h-[30px] border-b' />
                                </div>
                            </div>

                            <div className='flex items-center space-x-[20px] text-[18px]'>
                                <div>
                                    <label>Ngày sinh</label><br />
                                    <input
                                        value={dataUser.dateOfbirth} onChange={(event) => this.handleOnChangeInput(event, 'dateOfbirth')}
                                        type='date' className=' h-[40px] ' />
                                </div>
                                <div>
                                    <label>Giới tính</label><br />
                                    <select value={dataUser.gender} onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                        className=' h-[40px]' >
                                        <option value='0'>Nam</option>
                                        <option value='1'>Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button className='w-[100px] bg-[#50d770] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                    onClick={() => this.handleEditUser()}
                                >LƯU</button>
                            </div>

                        </div>
                    </div>
                </div >
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
export default connect(mapStateToProps, mapDispatchToProps)(InfoUser);
