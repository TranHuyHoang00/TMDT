import React from 'react';
import { toast } from 'react-toastify';
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { getAllPlaces } from '../../../../servicers1/placesService';
import { getAllVehicles } from '../../../../servicers1/vehiclesService';
import { createTour } from '../../../../servicers1/tourService'
import ModalCreatePlace from './ModalCreatePlace';
import ModalCreateVehicle from './ModalCreateVehicle';
import ModalService from './ModalService';
import ModalNote from './ModalNote';
import ModalTicket from './ModalTicket';
import ModalDiscount from './ModalDiscount';
import ModalPlan from './ModalPlan';
class ModalCreateTour extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataPlaces: [],
            dataVehicles: [],
            isActive: '',
            dataCreate: {
                listDataService: [],
                listDataNote: [],
                listDataTicket: [],
                listDataDiscount: [],
                listDataPlan: [],
            },
            discount: '',
        }
    }
    async componentDidMount() {
        await this.getAllPlaces()
        await this.getAllVehicles()
    }
    getAllPlaces = async () => {
        let data = await getAllPlaces();
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataPlaces: data.data.data
            })
        }
    }
    getAllVehicles = async () => {
        let data = await getAllVehicles();
        if (data && data.data && data.data.errCode == 0) {
            this.setState({
                dataVehicles: data.data.data
            })
        }
    }
    handleAddDataToList = (input, type) => {
        if (type == 'service') {
            let list = this.state.dataCreate.listDataService;
            const check = list.find((x) => x.id == input.id);
            if (check) {
                toast.error('Dịch vụ đã tồn tại')
                return 1;
            } else {
                list.push(input)
                this.setState({
                    dataCreate: {
                        ...this.state.dataCreate,
                        listDataService: list
                    }
                })
                toast.success('Thêm thành công')
                return 0;

            }
        }
        if (type == 'note') {
            let list = this.state.dataCreate.listDataNote;
            const check = list.find((x) => x.id == input.id);
            if (check) {
                toast.error('Lưu ý đã tồn tại')
                return 1;
            } else {
                list.push(input)
                this.setState({
                    dataCreate: {
                        ...this.state.dataCreate,
                        listDataNote: list
                    }
                })
                toast.success('Thêm thành công')
                return 0;
            }
        }
        if (type == 'ticket') {
            let list = this.state.dataCreate.listDataTicket;
            const check = list.find((x) => x.id == input.id);
            const check1 = list.find((x) => x.type == input.type);
            if (check) {
                toast.error('Vé đã tồn tại')
                return 1;
            } else {
                if (check1) {
                    toast.error('Loại vé này đã có')
                    return 2;
                } else {
                    list.push(input)
                    this.setState({
                        dataCreate: {
                            ...this.state.dataCreate,
                            listDataTicket: list
                        }
                    })
                    toast.success('Thêm thành công')
                    return 0;
                }
            }
        }
        if (type == 'discount') {
            let list = this.state.dataCreate.listDataDiscount;
            let discount = 0;
            const check = list.find((x) => x.id == input.id);
            if (check) {
                toast.error('Khuyến mãi đã tồn tại')
                return 1;
            } else {
                list.push(input)
                for (const i of list) {
                    discount += i.value
                }
                this.setState({
                    discount: discount,
                    dataCreate: {
                        ...this.state.dataCreate,
                        listDataDiscount: list
                    }
                })
                toast.success('Thêm thành công')
                return 0;
            }
        }
        if (type == 'plan') {
            let list = this.state.dataCreate.listDataPlan;
            const check = list.find((x) => x.id == input.id);
            if (check) {
                toast.error('Lịch trình đã tồn tại')
                return 1;
            } else {
                list.push(input)
                this.setState({
                    dataCreate: {
                        ...this.state.dataCreate,
                        listDataPlan: list
                    }
                })
                toast.success('Thêm thành công')
                return 0;

            }
        }
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
        if (type == 'service') {
            let list = this.state.dataCreate.listDataService;
            list = list.filter(x => x.id != id);
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    listDataService: list
                }
            })
            toast.success('Xóa thành công')
        }
        if (type == 'note') {
            let list = this.state.dataCreate.listDataNote;
            list = list.filter(x => x.id != id);
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    listDataNote: list
                }
            })
            toast.success('Xóa thành công')
        }
        if (type == 'ticket') {
            let list = this.state.dataCreate.listDataTicket;
            list = list.filter(x => x.id != id);
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    listDataTicket: list
                }
            })
            toast.success('Xóa thành công')
        }
        if (type == 'discount') {
            let list = this.state.dataCreate.listDataDiscount;
            list = list.filter(x => x.id != id);
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    listDataDiscount: list
                }
            })
            toast.success('Xóa thành công')
        }
        if (type == 'plan') {
            let list = this.state.dataCreate.listDataPlan;
            list = list.filter(x => x.id != id);
            this.setState({
                dataCreate: {
                    ...this.state.dataCreate,
                    listDataPlan: list
                }
            })
            toast.success('Xóa thành công')
        }
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
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state.dataCreate };
        copyState[id] = event.target.value;
        this.setState({
            dataCreate: {
                ...copyState
            }
        });
    }
    handleCreateTour = async () => {
        let data = await createTour(this.state.dataCreate)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.props.getManageAllTours('All')
            this.onClickExit()
        } else {
            toast.error(data.data.errMessage)
        }
    }
    onClickShow = (input, data) => {
        if (input == 'CreatePlace') { this.setState({ isActive: 'CreatePlace' }) }
        if (input == 'CreateVehicle') { this.setState({ isActive: 'CreateVehicle' }) }
        if (input == 'Service') { this.setState({ isActive: 'Service' }) }
        if (input == 'Note') { this.setState({ isActive: 'Note' }) }
        if (input == 'Price') { this.setState({ isActive: 'Price' }) }
        if (input == 'Discount') { this.setState({ isActive: 'Discount' }) }
        if (input == 'Plan') { this.setState({ isActive: 'Plan' }) }
    }
    onClickHide = () => { this.setState({ isActive: '' }) }
    onClickExit = () => { this.props.onClickHide() }
    render() {
        let dataPlaces = this.state.dataPlaces;
        let dataVehicles = this.state.dataVehicles;
        let listDataService = this.state.dataCreate.listDataService;
        let listDataNote = this.state.dataCreate.listDataNote;
        let listDataTicket = this.state.dataCreate.listDataTicket;
        let listDataDiscount = this.state.dataCreate.listDataDiscount;
        let discount = this.state.discount;
        let listDataPlan = this.state.dataCreate.listDataPlan
        return (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
                    <div className="relative w-screen max-h-screen px-[50px]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white">
                            <div className='border-[1px]  shadow-xl p-[20px] space-y-[20px] rounded-[4px]'>
                                <div className='text-center bg-[#263544] text-white text-[20px] font-[600]  py-[4px] px-[10px] rounded-[5px]'>
                                    <h1>TẠO MỚI TOUR</h1>
                                </div>
                                {/* Head */}
                                <div className='w-full grid grid-cols-3 gap-x-[30px]'>
                                    <div className='space-y-[10px]'>
                                        <div className='border rounded-[5px] p-[10px] shadow-md space-y-[5px]'>
                                            <label className='text-[#fd364d] font-[500]'>Tên Tour</label><br />
                                            <textarea onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                                className='w-full h-[134px] rounded-[5px]' />
                                        </div>
                                        <div className='border p-[10px] flex items-center justify-between shadow-md rounded-[5px]'>
                                            <div>
                                                <button
                                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                                    <AiOutlinePlus />
                                                    <span>Tạo mới</span>
                                                </button>
                                            </div>
                                            <div className='space-x-[5px]'>
                                                <label className='text-[#fd364d] font-[500]'>Trạng thái</label>
                                                <select onChange={(event) => this.handleOnChangeInput(event, 'statusId')}
                                                    className='max-w-[170px] rounded-[5px]'>
                                                    <option></option>
                                                    <option value='1 '>Hoạt động</option>
                                                    <option value='2'>Khóa</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='space-y-[10px]'>
                                        <div className='flex items-center justify-between space-x-[20px] border rounded-[5px] p-[10px] shadow-md'>
                                            <div className='flex items-center space-x-[5px]'>
                                                <label className='text-[#fd364d] font-[500]'>Số ngày : </label>
                                                <input onChange={(event) => this.handleOnChangeInput(event, 'number_of_date')}
                                                    className='border-[1px] border-black w-[70px] pl-[10px] rounded-[5px]' />
                                            </div>
                                            <div className='flex items-center space-x-[5px]'>
                                                <label className='text-[#fd364d] font-[500]'>Số người :</label>
                                                <input onChange={(event) => this.handleOnChangeInput(event, 'quantity_max')}
                                                    className='border-[1px] border-black w-[70px] pl-[10px] rounded-[5px]' />
                                            </div>
                                        </div>
                                        <div className='border p-[10px] shadow-md rounded-[5px] space-y-[10px]'>
                                            <div>
                                                <button onClick={() => this.onClickShow('CreatePlace')}
                                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                                    <AiOutlinePlus />
                                                    <span>Tạo mới</span>
                                                </button>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <div className='space-y-[5px]'>
                                                    <label className='text-[#fd364d] font-[500]'>Điểm đi</label><br />
                                                    <select onChange={(event) => this.handleOnChangeInput(event, 'place_start_id')}
                                                        className='max-w-[170px] rounded-[5px]'>
                                                        <option></option>
                                                        {dataPlaces && dataPlaces.map((place, index) => {
                                                            return (
                                                                <option key={place.id} value={place.id}>{place.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className='space-y-[5px]'>
                                                    <label className='text-[#fd364d] font-[500]'>Điểm đến</label><br />
                                                    <select onChange={(event) => this.handleOnChangeInput(event, 'place_finish_id')}
                                                        className='max-w-[170px] rounded-[5px]'>
                                                        <option></option>
                                                        {dataPlaces && dataPlaces.map((place, index) => {
                                                            return (
                                                                <option key={place.id} value={place.id}>{place.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='border p-[10px] flex items-center justify-between shadow-md rounded-[5px]'>
                                            <div>
                                                <button onClick={() => this.onClickShow('CreateVehicle')}
                                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                                    <AiOutlinePlus />
                                                    <span>Tạo mới</span>
                                                </button>
                                            </div>
                                            <div className='space-x-[5px]'>
                                                <label className='text-[#fd364d] font-[500]'>Phương tiện</label>
                                                <select onChange={(event) => this.handleOnChangeInput(event, 'vehicleId')}
                                                    className='max-w-[170px] rounded-[5px]'>
                                                    <option></option>
                                                    {dataVehicles && dataVehicles.map((vehicle, index) => {
                                                        return (
                                                            <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='shadow-md border rounded-[5px] flex justify-center items-center'>
                                        <div className='space-y-[10px]'>
                                            <div className='bg-[#263544] h-[200px] w-[200px] rounded-[5px]'></div>
                                            <div className='text-center'>
                                                <button
                                                    className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] bg-[#263544]'>
                                                    <span>Thêm ảnh</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Discount */}
                                <div className='w-full  border shadow-md p-[10px] rounded-[5px] space-y-[10px]    '>
                                    <div className='flex items-center space-x-[20px]'>
                                        <label className='text-[#fd364d] font-[500]'>Khuyến mãi</label>
                                        <button onClick={() => this.onClickShow('Discount')}
                                            className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                            <AiOutlinePlus />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                    {listDataDiscount && listDataDiscount.map((item, index) => {
                                        return (
                                            <div key={item.id} className='flex items-center space-x-[20px]'>
                                                <span>- {item.name}</span>
                                                <span>Giá trị : {item.value}%</span>
                                                <span>Ngày BĐ : {item.start_date}</span>
                                                <span>Ngày KT : {item.finish_date}</span>
                                                <button onClick={() => this.handleDeleteDataFromList(item.id, 'discount')}
                                                    className='bg-[#fd364d] p-[5px] rounded-[4px] text-white'><AiOutlineDelete /></button>
                                            </div>
                                        )
                                    })}

                                </div>
                                {/* Ticket */}
                                <div className='w-full  border shadow-md p-[10px] rounded-[5px] space-y-[10px]    '>
                                    <div className='flex items-center space-x-[20px]'>
                                        <label className='text-[#fd364d] font-[500]'>Giá vé</label>
                                        <button onClick={() => this.onClickShow('Price')}
                                            className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                            <AiOutlinePlus />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                    {listDataTicket && listDataTicket.map((item, index) => {
                                        return (
                                            <div key={item.id} className='flex items-center space-x-[20px]'>
                                                <div>
                                                    {item.type == 1 && <label className=' font-[500]'>Vé trẻ em gốc : </label>}
                                                    {item.type == 2 && <label className=' font-[500]'>Vé người lớn : </label>}
                                                    <span> {item.price} VNĐ</span>
                                                </div>
                                                {discount != 0 &&
                                                    <div>
                                                        {item.type == 1 && <label className=' font-[500]'>Vé trẻ em sau KM : </label>}
                                                        {item.type == 2 && <label className=' font-[500]'>Vé người lớn sau KM : </label>}
                                                        <span> {item.price - (item.price * (discount / 100))} VNĐ</span>
                                                    </div>
                                                }
                                                <button onClick={() => this.handleDeleteDataFromList(item.id, 'ticket')}
                                                    className='bg-[#fd364d] p-[5px] rounded-[4px] text-white'><AiOutlineDelete /></button>
                                            </div>
                                        )
                                    })}

                                </div>
                                {/* Description */}
                                <div className='w-full border shadow-md p-[10px] rounded-[5px]'>
                                    <div className='space-y-[5px]'>
                                        <label className='text-[#fd364d] font-[500]'>Mô tả</label>
                                        <textarea onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                            className='w-full h-[100px] rounded-[5px]' />
                                    </div>
                                </div>
                                {/* Plan */}
                                <div className='w-full border shadow-md p-[10px] rounded-[5px] space-y-[10px]    '>
                                    <div className='flex items-center space-x-[20px]'>
                                        <label className='text-[#fd364d] font-[500]'>Lịch trình</label>
                                        <button onClick={() => this.onClickShow('Plan')}
                                            className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                            <AiOutlinePlus />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                    {listDataPlan && listDataPlan.map((item, index) => {
                                        return (
                                            <div key={item.id} className=' space-x-[5px]'>
                                                <div className='space-x-[5px]'>
                                                    <label className=' font-[500]'>- {item.name}</label>
                                                    <button onClick={() => this.handleDeleteDataFromList(item.id, 'plan')}
                                                        className='bg-[#fd364d] p-[5px] rounded-[4px] text-white'><AiOutlineDelete /></button>
                                                </div>
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
                                        )
                                    })}

                                </div>
                                {/* Service */}
                                <div className='w-full border shadow-md p-[10px] rounded-[5px] space-y-[10px]    '>
                                    <div className='flex items-center space-x-[20px]'>
                                        <label className='text-[#fd364d] font-[500]'>Dịch vụ</label>
                                        <button onClick={() => this.onClickShow('Service')}
                                            className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                            <AiOutlinePlus />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                    {listDataService && listDataService.map((item, index) => {
                                        return (
                                            <div key={item.id} className='flex items-center space-x-[5px]'>
                                                <label className=' font-[500]'>- {item.name} : </label>
                                                <span> {item.description}</span>
                                                <button onClick={() => this.handleDeleteDataFromList(item.id, 'service')}
                                                    className='bg-[#fd364d] p-[5px] rounded-[4px] text-white'><AiOutlineDelete /></button>
                                            </div>
                                        )
                                    })}

                                </div>
                                {/* Note */}
                                <div className='w-full border shadow-md p-[10px] rounded-[5px] space-y-[10px]    '>
                                    <div className='flex items-center space-x-[20px]'>
                                        <label className='text-[#fd364d] font-[500]'>Lưu ý</label>
                                        <button onClick={() => this.onClickShow('Note')}
                                            className='text-white py-[2px] px-[10px] border shadow-md rounded-[4px] flex items-center bg-[#263544]'>
                                            <AiOutlinePlus />
                                            <span>Thêm</span>
                                        </button>
                                    </div>
                                    {listDataNote && listDataNote.map((item, index) => {
                                        return (
                                            <div key={item.id} className='space-x-[5px]'>
                                                <label className=' font-[500]'>- {item.name} : </label>
                                                <span> {item.description}</span>
                                                <button onClick={() => this.handleDeleteDataFromList(item.id, 'note')}
                                                    className='bg-[#fd364d] p-[5px] rounded-[4px] text-white'><AiOutlineDelete /></button>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div className='flex items-center justify-between'>
                                    <button className='w-[100px] my-[10px] bg-[#50d770] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                        onClick={() => this.handleCreateTour()}
                                    >LƯU</button>
                                    <button className='w-[100px] my-[10px] bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                        onClick={() => this.onClickExit()}
                                    >THOÁT</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >
                {/* Create Place */}
                {this.state.isActive == 'CreatePlace' && <ModalCreatePlace
                    getAllPlaces={this.getAllPlaces}
                    onClickHide={this.onClickHide} />}
                {this.state.isActive == 'CreateVehicle' && <ModalCreateVehicle
                    getAllVehicles={this.getAllVehicles}
                    onClickHide={this.onClickHide} />}
                {this.state.isActive == 'Service' && <ModalService
                    onClickHide={this.onClickHide} handleAddDataToList={this.handleAddDataToList} />}
                {this.state.isActive == 'Note' && <ModalNote
                    onClickHide={this.onClickHide} handleAddDataToList={this.handleAddDataToList} />}
                {this.state.isActive == 'Price' && <ModalTicket
                    onClickHide={this.onClickHide} handleAddDataToList={this.handleAddDataToList} />}
                {this.state.isActive == 'Discount' && <ModalDiscount
                    onClickHide={this.onClickHide} handleAddDataToList={this.handleAddDataToList} />}
                {this.state.isActive == 'Plan' && <ModalPlan
                    onClickHide={this.onClickHide} handleAddDataToList={this.handleAddDataToList} />}

            </>
        )
    }
}

export default ModalCreateTour;