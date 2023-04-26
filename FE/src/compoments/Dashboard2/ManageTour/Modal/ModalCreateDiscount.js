import React from 'react';
import { toast } from 'react-toastify';
import { createDiscount } from '../../../../servicers1/discountsService';

class ModalCreateDiscount extends React.Component {

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
    handleCreateDiscount = async () => {
        let data = await createDiscount(this.state)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.props.getAllDiscounts()
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
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>TẠO MỚI KHUYẾN MÃI</h1>
                                </div>
                                <div className='space-y-[10px]'>

                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Tên</label><br />
                                        <input onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                            className='border border-black w-full rounded-[5px] h-[40px] pl-[10px]' />
                                    </div>
                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Giá trị</label><br />
                                        <input onChange={(event) => this.handleOnChangeInput(event, 'value')}
                                            className='border border-black w-full rounded-[5px] h-[40px] pl-[10px]' />
                                    </div>
                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Ngày bắt đầu</label><br />
                                        <input type='date' onChange={(event) => this.handleOnChangeInput(event, 'start_date')}
                                            className='border border-black w-full rounded-[5px] h-[40px] pl-[10px]' />
                                    </div>
                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Ngày kết thúc</label><br />
                                        <input type='date' onChange={(event) => this.handleOnChangeInput(event, 'finish_date')}
                                            className='border border-black w-full rounded-[5px] h-[40px] pl-[10px]' />
                                    </div>
                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Mô tả</label>
                                        <textarea onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                            className='w-full h-[100px] rounded-[5px]' />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between text-[16px] text-white font-[500]'>
                                    <button className='w-[80px] bg-[#263544] py-[5px] shadow-md border rounded-[4px] '
                                        onClick={() => this.handleCreateDiscount()}
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

export default ModalCreateDiscount;