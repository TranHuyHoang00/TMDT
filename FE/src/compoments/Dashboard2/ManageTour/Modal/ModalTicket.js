import React from 'react';
import { toast } from 'react-toastify';
import { getAllTickets, deleteTicket } from '../../../../servicers1/ticketsServices';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ModalCreateTicket from './ModalCreateTicket';
class ModalPrice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataTickets: [],
        }
    }
    async componentDidMount() {
        await this.getAllTickets()
    }
    getAllTickets = async () => {
        let data = await getAllTickets();
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataTickets: data.data.data
            })
        }
    }
    handleDeleteTicket = async (id) => {
        let data = await deleteTicket(id)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getAllTickets()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onCLickThem = (input) => {
        let check = this.props.handleAddDataToList(input, 'ticket');
        if (check == 0) {
            let list = this.state.dataTickets;
            list = list.filter(x => x.id != input.id);
            this.setState({
                dataTickets: list
            })
        }

    }
    onClickShow = (input) => {
        if (input == 'CreateTicket') { this.setState({ isActive: 'CreateTicket' }) }
    }
    onClickHide = () => { this.setState({ isActive: '' }) }
    onClickExit = () => { this.props.onClickHide() }
    render() {
        let dataTickets = this.state.dataTickets;
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative max-w-3xl max-h-screen px-[100px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>GIÁ VÉ</h1>
                                </div>
                                <button onClick={() => this.onClickShow('CreateTicket')}
                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                    <AiOutlinePlus />
                                    <span>Tạo mới</span>
                                </button>
                                <div className=' w-full'>
                                    <div className='bg-white w-full rounded-[10px] shadow-md'>
                                        <div className='grid grid-cols-8 gap-x-[20px] text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                                            <div><span>ID</span></div>
                                            <div className='col-span-2'><span>KIỂU VÉ</span></div>
                                            <div className='col-span-2'><span>GIÁ VÉ</span></div>
                                            <div className='col-span-3'><span>HÀNH ĐỘNG</span></div>
                                        </div>
                                        {dataTickets && dataTickets.map((item, index) => {
                                            return (
                                                <div key={item.id}
                                                    className='grid grid-cols-8 gap-x-[20px] text-center cursor-pointer items-center border-b-[1px] font-[450]'>
                                                    <div><span>{item.id}</span></div>
                                                    {item.type == 1 &&
                                                        <div className='col-span-2'><span>Trẻ em</span></div>
                                                    }
                                                    {item.type == 2 &&
                                                        <div className='col-span-2'><span>Người lớn</span></div>
                                                    }
                                                    <div className='col-span-2 py-[5px]'><span>{item.price} VNĐ</span></div>
                                                    <div className='col-span-3 flex items-center justify-center space-x-[10px] text-[20px]'>
                                                        <button ><AiOutlineEye /></button>
                                                        <button><AiOutlineEdit /></button>
                                                        <button onClick={() => this.handleDeleteTicket(item.id)}><AiOutlineDelete /></button>
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
                {this.state.isActive == 'CreateTicket' && <ModalCreateTicket
                    getAllTickets={this.getAllTickets}
                    onClickHide={this.onClickHide} />}
            </>
        )
    }
}

export default ModalPrice;