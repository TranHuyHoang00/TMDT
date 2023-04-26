import React from 'react';
import { toast } from 'react-toastify';
import { editService } from '../../../../servicers1/serviceService'
class ModalEditService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            type: '',
        }
    }
    componentDidMount() {
        let data = this.props.dataService
        this.setState({
            id: data.id,
            name: data.name,
            description: data.description,
            type: data.type
        })
    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    handleEditService = async () => {
        let data = await editService(this.state)
        if (data && data.data && data.data.errCode == 0) {
            toast.success(data.data.errMessage)
            this.props.getManageAllService()
            this.onClickExit()
            return;
        } else {
            toast.error(data.data.errMessage)
            return;
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
                            <div>
                                <div className=' border-[2px] shadow-xl py-[30px] px-[30px] rounded-[4px]'>
                                    <div className='text-center bg-[#79ceed] text-white text-[22px] font-[600] my-[10px] py-[4px] px-[10px]'>
                                        <h1>TẠO MỚI DỊCH VỤ</h1>
                                    </div>
                                    <div className='text-[16px]'>
                                        <div className='flex '>
                                            <div>
                                                <label>Tên dịch vụ</label><br />
                                                <input value={this.state.name}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'name')}
                                                    className='border border-black w-full rounded-[5px] h-[40px] pl-[10px]' />
                                            </div>
                                            <div className='pl-[20px]'>
                                                <label>Kiểu</label><br />
                                                <select value={this.state.type}
                                                    onChange={(event) => this.handleOnChangeInput(event, 'type')}
                                                    className='h-[40px] rounded-[5px]'>
                                                    <option value=""></option>
                                                    <option value="1">Bao gồm</option>
                                                    <option value="0">Không bao gồm</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='pt-[10px]'>
                                            <label>Mô tả</label><br />
                                            <textarea value={this.state.description}
                                                onChange={(event) => this.handleOnChangeInput(event, 'description')}
                                                className='border w-full h-[200px] rounded-[5px]' />
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <button className='w-[100px] my-[10px] bg-[#50d770] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                            onClick={() => this.handleEditService()}
                                        >LƯU</button>
                                        <button className='w-[100px] my-[10px] bg-[#fd475d] h-[40px] shadow-md border
                            rounded-[4px] text-white text-[20px] font-[500]'
                                            onClick={() => this.onClickExit()}
                                        >THOÁT</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >

            </>
        )
    }
}

export default ModalEditService;