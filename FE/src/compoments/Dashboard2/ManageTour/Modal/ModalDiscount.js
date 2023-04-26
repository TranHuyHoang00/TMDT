import React from 'react';
import { toast } from 'react-toastify';
import { getAllDiscounts, deleteDiscount } from '../../../../servicers1/discountsService';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ModalCreateDiscount from './ModalCreateDiscount';
class ModalDiscount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataDiscounts: [],
        }
    }
    async componentDidMount() {
        await this.getAllDiscounts()
    }
    getAllDiscounts = async () => {
        let data = await getAllDiscounts();
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataDiscounts: data.data.data
            })
        }
    }
    handleDeleteDiscount = async (id) => {
        let data = await deleteDiscount(id)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getAllDiscounts()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onCLickThem = (input) => {
        let check = this.props.handleAddDataToList(input, 'discount');
        if (check == 0) {
            let list = this.state.dataDiscounts;
            list = list.filter(x => x.id != input.id);
            this.setState({
                dataDiscounts: list
            })
        }

    }
    onClickShow = (input) => {
        if (input == 'CreateDiscount') { this.setState({ isActive: 'CreateDiscount' }) }
    }
    onClickHide = () => { this.setState({ isActive: '' }) }
    onClickExit = () => { this.props.onClickHide() }
    render() {
        let dataDiscounts = this.state.dataDiscounts;
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-screen max-h-screen px-[100px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>KHUYẾN MÃI</h1>
                                </div>
                                <button onClick={() => this.onClickShow('CreateDiscount')}
                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                    <AiOutlinePlus />
                                    <span>Tạo mới</span>
                                </button>
                                <div className=' w-full'>
                                    <div className='bg-white w-full rounded-[10px] shadow-md'>
                                        <div className='grid grid-cols-12  text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                                            <div><span>ID</span></div>
                                            <div className='col-span-2'><span>TÊN</span></div>
                                            <div className='col-span-4'><span>MÔ TẢ</span></div>
                                            <div><span>GiÁ TRỊ</span></div>
                                            <div><span>NGÀY BĐ</span></div>
                                            <div><span>NGÀY KT</span></div>
                                            <div className='col-span-2'><span>HÀNH ĐỘNG</span></div>
                                        </div>
                                        {dataDiscounts && dataDiscounts.map((item, index) => {
                                            return (
                                                <div key={item.id}
                                                    className='grid grid-cols-12 text-center cursor-pointer items-center border-b-[1px] font-[450]'>
                                                    <div><span>{item.id}</span></div>
                                                    <div className='col-span-2'><span>{item.name}</span></div>
                                                    <div className='col-span-4'><span>{item.description}</span></div>
                                                    <div><span>{item.value} %</span></div>
                                                    <div><span>{item.start_date}</span></div>
                                                    <div><span>{item.finish_date}</span></div>
                                                    <div className='col-span-2 flex items-center justify-center space-x-[10px] text-[20px]'>
                                                        <button ><AiOutlineEye /></button>
                                                        <button><AiOutlineEdit /></button>
                                                        <button onClick={() => this.handleDeleteDiscount(item.id)}><AiOutlineDelete /></button>
                                                        <button onClick={() => this.onCLickThem(item)}
                                                            className='bg-[#263544] text-white rounded-full'><AiOutlinePlus /></button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='flex items-center justify-center text-[16px] text-white font-[500]'>
                                    <button className='w-[80px]  bg-[#fd475d]  py-[5px] shadow-md border rounded-[4px]  '
                                        onClick={() => this.onClickExit()}
                                    >THOÁT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isActive == 'CreateDiscount' && <ModalCreateDiscount
                    getAllDiscounts={this.getAllDiscounts}
                    onClickHide={this.onClickHide} />}
            </>
        )
    }
}

export default ModalDiscount;