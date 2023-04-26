import React from 'react';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ModalDetail from './ModalDetail';
import { createPlan } from '../../../../servicers1/plansService'
class ModalCreatePlan extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: '',
            dataCreate: {
                name: '',
                listDataDetail: [],
            }
        }
    }
    OnChangeName = (event) => {
        this.setState({
            dataCreate: {
                ...this.state.dataCreate,
                name: event.target.value
            }
        })
    }
    handleCreatePlan = async () => {
        let data = await createPlan(this.state.dataCreate)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.props.getAllPlans()
            this.onClickExit()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    handleAddDataToList = (input, type) => {
        if (type == 'detail') {
            let list = this.state.dataCreate.listDataDetail;
            const check = list.find((x) => x.id == input.id);
            if (check) {
                toast.error('Ct_Lịch trình đã tồn tại')
                return 1;
            } else {
                list.push(input)
                this.setState({
                    dataCreate: {
                        ...this.state.dataCreate,
                        listDataDetail: list
                    }
                })
                toast.success('Thêm thành công')
                return 0;

            }
        }

    }
    handleDeleteDataFromList = (id, type) => {
        if (type == 'detail') {
            let list = this.state.dataCreate.listDataDetail;
            list = list.filter(x => x.id != id);
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    listDataDetail: list
                }
            })
            toast.success('Xóa thành công')
        }
    }
    onClickShow = (input) => {
        if (input == 'Detail') { this.setState({ isActive: 'Detail' }) }
    }
    onClickHide = () => { this.setState({ isActive: '' }) }

    onClickExit = () => {
        this.props.onClickHide()
    }
    render() {
        let listDataDetail = this.state.dataCreate.listDataDetail
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative  my-6 mx-auto w-screen px-[100px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className=' border-[1px]  shadow-xl p-[20px] space-y-[10px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600] py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>TẠO MỚI LỊCH TRÌNH</h1>
                                </div>
                                <div className='w-full border shadow-md p-[10px] rounded-[5px] space-y-[10px]    '>
                                    <label className='text-[#fd364d] font-[500]'>Tên lịch trình</label><br />
                                    <input onChange={(event) => this.OnChangeName(event)}
                                        className='border border-black w-full rounded-[5px] h-[40px] pl-[10px]' />
                                </div>
                                <div className='w-full border shadow-md p-[10px] rounded-[5px] space-y-[10px]    '>
                                    <div className='flex items-center space-x-[20px]'>
                                        <label className='text-[#fd364d] font-[500]'>Lịch trình</label>
                                        <button onClick={() => this.onClickShow('Detail')}
                                            className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                            <AiOutlinePlus />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                    {listDataDetail && listDataDetail.map((item, index) => {
                                        return (
                                            <div key={item.id} className=' space-x-[5px]'>
                                                {item.type == 1 && <span className='font-[500]'>- Sáng : </span>}
                                                {item.type == 2 && <span className='font-[500]'>- Trưa : </span>}
                                                {item.type == 3 && <span className='font-[500]'>- Chiều : </span>}
                                                {item.type == 4 && <span className='font-[500]'>- Tối : </span>}
                                                <span>{item.description}</span>
                                                <button onClick={() => this.handleDeleteDataFromList(item.id, 'detail')}
                                                    className='bg-[#fd364d] p-[5px] rounded-[4px] text-white'><AiOutlineDelete /></button>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className='flex items-center justify-between text-[16px] text-white font-[500]'>
                                    <button className='w-[80px] bg-[#263544] py-[5px] shadow-md border rounded-[4px] '
                                        onClick={() => this.handleCreatePlan()}
                                    >LƯU</button>
                                    <button className='w-[80px]  bg-[#fd475d]  py-[5px] shadow-md border rounded-[4px]  '
                                        onClick={() => this.onClickExit()}
                                    >THOÁT</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {this.state.isActive == 'Detail' && <ModalDetail
                    onClickHide={this.onClickHide} handleAddDataToList={this.handleAddDataToList} />}
            </>
        )
    }
}

export default ModalCreatePlan;