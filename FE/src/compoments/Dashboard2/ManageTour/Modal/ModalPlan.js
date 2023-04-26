import React from 'react';
import { toast } from 'react-toastify';
import { getAllPlans, deletePlan } from '../../../../servicers1/plansService';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineSearch, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import ModalCreatePlan from './ModalCreatePlan';
class ModalPlan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataPlans: [],
        }
    }
    async componentDidMount() {
        await this.getAllPlans()
    }
    getAllPlans = async () => {
        let data = await getAllPlans();
        console.log(data.data.data);
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataPlans: data.data.data
            })
        }
    }
    handleDeletePlan = async (id) => {
        let data = await deletePlan(id)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.getAllPlans()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onCLickThem = (input) => {
        let check = this.props.handleAddDataToList(input, 'plan')
        if (check == 0) {
            let list = this.state.dataPlans;
            list = list.filter(x => x.id != input.id);
            this.setState({
                dataPlans: list
            })
        }
    }
    onClickShow = (input) => {
        if (input == 'CreatePlan') { this.setState({ isActive: 'CreatePlan' }) }
    }
    onClickHide = () => { this.setState({ isActive: '' }) }
    onClickExit = () => {
        this.props.onClickHide()
    }
    render() {
        let dataPlans = this.state.dataPlans;
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-screen max-h-screen px-[50px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>LỊCH TRÌNH</h1>
                                </div>
                                <button onClick={() => this.onClickShow('CreatePlan')}
                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                    <AiOutlinePlus />
                                    <span>Tạo mới</span>
                                </button>
                                <div className=' w-full'>
                                    <div className='bg-white w-full rounded-[10px] shadow-md'>
                                        <div className='grid grid-cols-12 text-center font-[500] py-[5px] bg-[#4099ff] text-white rounded-t-[10px]'>
                                            <div><span>ID</span></div>
                                            <div className='col-span-9'><span>TÊN LỊCH TRÌNH</span></div>
                                            <div className='col-span-2'><span>HÀNH ĐỘNG</span></div>
                                        </div>
                                        {dataPlans && dataPlans.map((item, index) => {
                                            return (
                                                <div key={item.id}
                                                    className='grid grid-cols-12 cursor-pointer items-center border-b-[1px] font-[450]'>
                                                    <div className='text-center'><span>{item.id}</span></div>
                                                    <div className='col-span-9'>
                                                        <span className='font-[500]'>{item.name}</span><br />
                                                        {item.details && item.details.map((item, index) => {
                                                            return (
                                                                <div className='pl-[20px]'>
                                                                    {item.type == 1 && <span className='font-[500]'>- Sáng : </span>}
                                                                    {item.type == 2 && <span className='font-[500]'>- Trưa : </span>}
                                                                    {item.type == 3 && <span className='font-[500]'>- Chiều : </span>}
                                                                    {item.type == 4 && <span className='font-[500]'>- Tối : </span>}
                                                                    <span>{item.description}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                    <div className='col-span-2 flex items-center justify-center space-x-[10px] text-[20px]'>
                                                        <button ><AiOutlineEye /></button>
                                                        <button><AiOutlineEdit /></button>
                                                        <button onClick={() => this.handleDeletePlan(item.id)}><AiOutlineDelete /></button>
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
                {this.state.isActive == 'CreatePlan' && <ModalCreatePlan
                    getAllPlans={this.getAllPlans}
                    onClickHide={this.onClickHide} />}
            </>
        )
    }
}

export default ModalPlan;