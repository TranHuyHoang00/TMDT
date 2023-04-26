import React from 'react';
class ModalCreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: {}
        }
    }
    componentDidMount() {
        this.setState({
            dataUser: this.props.dataUser
        })
    }
    onClickExit = () => {
        this.props.onClickHide()
    }
    render() {
        let dataUser = this.state.dataUser
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative my-6 mx-auto max-w-5xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>CHI TIẾT NGƯỜI DÙNG</h1>
                                </div>
                                <div className='grid grid-cols-3 gap-x-[10px]'>
                                    <div className=' py-[10px] px-[10px]  space-y-[10px] rounded-[10px] shadow-md border bg-white'>
                                        <div className='space-y-[5px]'>
                                            <label
                                                className='text-[#fd364d] font-[500]'>Email</label><br />
                                            <input value={dataUser.email}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#fd364d]  pl-[10px]' />
                                        </div>
                                        <div className='space-y-[5px]'>
                                            <label className='text-[#fd364d] font-[500]'>Mật khẩu</label><br />
                                            <input type='password'
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#fd364d]  pl-[10px]' />
                                        </div>
                                    </div>

                                    <div className=' py-[10px] px-[10px]  space-y-[10px] rounded-[10px] shadow-md border bg-white'>
                                        <div className='space-y-[5px]'>
                                            <label>Tên</label><br />
                                            <input value={dataUser.name}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                        </div>
                                        <div className='space-y-[5px]'>
                                            <label>Địa chỉ</label><br />
                                            <input value={dataUser.address}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                        </div>
                                        <div className='grid grid-cols-2 gap-x-[10px]'>
                                            <div className='space-y-[5px]'>
                                                <label>Số điện thoại</label><br />
                                                <input value={dataUser.phone}
                                                    className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                            </div>
                                            <div className='space-y-[5px]' >
                                                <label>Căn cước </label><br />
                                                <input value={dataUser.cccd}
                                                    className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-x-[10px] '>
                                            <div className='space-y-[5px]'>
                                                <label>Ngày sinh</label><br />
                                                <input value={dataUser.dateOfbirth}
                                                    type='date' className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]' />
                                            </div>
                                            <div className='space-y-[5px]'>
                                                <label>Giới tính</label><br />
                                                <select value={dataUser.gender}
                                                    className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]'>
                                                    <option value=''></option>
                                                    <option value='0'>Nam</option>
                                                    <option value='1'>Nữ</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=' py-[10px] px-[10px]  space-y-[10px] rounded-[10px] shadow-md border bg-white'>
                                        <div className='space-y-[5px]'>
                                            <label>Trạng thái</label><br />
                                            <select value={dataUser.statusId}
                                                className='h-[40px] w-full rounded-[5px] border-[1px] border-[#79ceed] pl-[10px]'>
                                                <option></option>
                                                <option value='1'>Hoạt động</option>
                                                <option value='2'>Khóa</option>
                                            </select>
                                        </div>
                                        <div className='space-y-[5px]'>
                                            <label>Phân quyền</label><br />

                                        </div>
                                        <div className='space-y-[10px] '>
                                            {dataUser.roles && dataUser.roles.map((item, index) => {
                                                return (
                                                    <div key={item.id} className='text-[#fd475d] font-[500]'>
                                                        <span>- {item.name}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
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
            </>
        )
    }
}

export default ModalCreateUser;