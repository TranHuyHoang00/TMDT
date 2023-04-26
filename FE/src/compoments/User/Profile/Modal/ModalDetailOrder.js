import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getUsers, editUser } from '../../../../servicers1/userServices'
class ModalDetailOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            dataOrder: {},
            status: ''
        }
    }
    async componentDidMount() {
        let data = this.props.dataOrder;
        this.setState({
            dataOrder: data
        })
        console.log(data);
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
    onClickSave = async () => {
        let data = await editUser(this.state.dataUser);
        const { userInfo } = this.props;
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getUsers(userInfo.id);
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickExit = () => {
        this.props.onClickShow('hide')
    }
    render() {
        let userInfo = this.state.dataUser
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-6xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div>
                                <div className=' border-[2px] space-y-[20px] text-[18px] shadow-xl py-[10px] px-[30px] rounded-[4px]'>
                                    <div className='text-center px-[10px] bg-[#79ceed] text-white text-[22px] font-[600] my-[10px] py-[4px] '>
                                        <h1>ĐƠN ĐẶT TOUR</h1>
                                    </div>
                                    {/* InforUser */}
                                    <div className='border p-[20px] shadow-md'>
                                        <div className='grid grid-cols-3 font-[450] gap-x-[20px]'>
                                            <div className='space-y-[10px]'>
                                                <div><span>Email : {userInfo.email}</span><br /></div>
                                                <div>
                                                    <span>Người đặt : </span>
                                                    <input onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                                        value={userInfo.name} className='border-b ' /><br />
                                                </div>
                                                <div>
                                                    <span>Ngày sinh : </span>
                                                    <input onChange={(event) => this.handleOnChangeInput(event, 'dateOfbirth')}
                                                        type='date' value={userInfo.dateOfbirth} className='border-b ' /><br />
                                                </div>
                                            </div>
                                            <div className='space-y-[10px]'>
                                                <div>
                                                    <span>Số điện thoại : </span>
                                                    <input onChange={(event) => this.handleOnChangeInput(event, 'phone')}
                                                        value={userInfo.phone} className='border-b ' /><br />
                                                </div>
                                                <div>
                                                    <span>Căn cước : </span>
                                                    <input onChange={(event) => this.handleOnChangeInput(event, 'cccd')}
                                                        value={userInfo.cccd} className='border-b ' /><br />
                                                </div>
                                                <div>
                                                    <span>Giới tính : </span>
                                                    <select onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                                        value={userInfo.gender}>
                                                        <option value='0'>Nam</option>
                                                        <option value='1'>Nữ</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <div className='text-center space-y-[5px]'>
                                                    <div className='bg-black h-[80px] w-[80px] rounded-[5px]'>
                                                    </div>
                                                    <div className='text-[14px]'>
                                                        <button className='shadow-md border rounded-[4px] px-[5px] '>Thay ảnh</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pt-[10px]'>
                                            <span>Địa chỉ : </span>
                                            <input onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                                value={userInfo.address} className='border-b w-[500px]' /><br />
                                        </div>
                                    </div>
                                    {/* Order */}
                                    <div className='w-full h-[100px] bg-red-100'>
                                        <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                                            <div><span>ID</span></div>
                                            <div className='col-span-4'><span>Tour</span></div>
                                            <div><span>Ngày đặt</span></div>
                                            <div><span>Ngày đi</span></div>
                                            <div><span>Tổng tiền</span></div>
                                            <div className='col-span-2'><span>Trạng thái</span></div>
                                            <div className='col-span-2'><span>Hành động</span></div>
                                        </div>
                                    </div>

                                    <div className='flex items-center justify-center space-x-[20px]'>
                                        <div className='text-center'>
                                            <button className='w-[100px] my-[10px] bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                                onClick={() => this.onClickSave()}
                                            >LƯU</button>
                                        </div>
                                        <div className='text-center'>
                                            <button className='w-[100px] my-[10px] bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                                onClick={() => this.onClickExit()}
                                            >THOÁT</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalDetailOrder);
