import React from 'react';
import Header from '../Element/Header';
import InfoUser from './InfoUser';
import OrderUser from './OrderUser';
class MenuProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: 'infor'
        }
    }
    onClickShow = (input) => {
        if (input == 'infor') {
            this.setState({
                isShow: 'infor'
            })
        }
        if (input == 'order') {
            this.setState({
                isShow: 'order'
            })
        }
    }
    render() {
        return (
            <>
                <div className='px-[100px] space-y-[10px]'>
                    <Header />
                    <div className='flex items-center justify-center space-x-[10px]'>
                        <button onClick={() => this.onClickShow('infor')}
                            className='shadow-md border px-[10px] py-[5px] rounded-[5px]'>Thông tin cá nhân</button>
                        <button onClick={() => this.onClickShow('order')}
                            className='shadow-md border px-[10px] py-[5px] rounded-[5px]'>Đơn đặt </button>
                    </div>
                    {this.state.isShow == 'infor' && <InfoUser />}
                    {this.state.isShow == 'order' && <OrderUser />}
                </div>
            </>
        )
    }
}

export default MenuProfile;