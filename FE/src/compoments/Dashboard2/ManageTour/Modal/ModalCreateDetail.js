import React from 'react';
import { toast } from 'react-toastify';
import { createDetail } from '../../../../servicers1/detailsService';

class ModalCreateDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    handleCreateDetail = async () => {
        let data = await createDetail(this.state)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.props.getAllDetails()
            this.onClickExit()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickExit = () => {
        this.props.onClickHide()
    }
    render() {
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative max-w-6xl my-6 mx-auto">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>TẠO MỚI CHI TIẾT LỊCH TRÌNH</h1>
                                </div>
                                <div className='space-y-[10px]'>
                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Loại</label><br />
                                        <select onChange={(event) => this.handleOnChangeInput(event, 'type')}
                                            className='rounded-[5px]'>
                                            <option></option>
                                            <option value='1'>Sáng</option>
                                            <option value='2'>Trưa</option>
                                            <option value='3'>Chiều</option>
                                            <option value='4'>Tối</option>
                                        </select>
                                    </div>
                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Mô tả</label><br />
                                        <textarea onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                            className='w-[600px] h-[200px] rounded-[5px]' />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between text-[16px] text-white font-[500]'>
                                    <button className='w-[80px] bg-[#263544] py-[5px] shadow-md border rounded-[4px] '
                                        onClick={() => this.handleCreateDetail()}
                                    >LƯU</button>
                                    <button className='w-[80px]  bg-[#fd475d]  py-[5px] shadow-md border rounded-[4px]  '
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

export default ModalCreateDetail;