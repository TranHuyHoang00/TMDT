import React from 'react';
import Menu from './Element/Menu';
import Header from './Element/Header';
import ManageUsers from './ManageUsers/ManageUsers';
import ManageTours from './ManageTour/ManageTour';
import ManageRevenue from './ManageRevenue/ManageRevenue';
import ManageOrder from './ManageOrder.js/ManageOrder';
import ModalService from './ManageTour/Modal/ModalService';
import ModalDiscount from './ManageTour/Modal/ModalDiscount';
class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'user'
        }
    }
    onClickTable = (tableInput) => {
        this.setState({
            isActive: tableInput
        })
    }
    onClickHide = () => {
        this.setState({ isActive: '' })
    }
    render() {

        return (
            <>
                <div className='h-screen w-screen flex'>
                    <Menu onClickTable={this.onClickTable} />
                    <div className='w-5/6 h-full bg-[#f2f7fb] flex flex-col'>
                        <div className='h-full w-full overflow-y-auto'>
                            <Header />
                            {this.state.isActive == 'user' && <ManageUsers />}
                            {this.state.isActive == 'service' && <ModalService onClickHide={this.onClickHide} />}
                            {this.state.isActive == 'discount' && <ModalDiscount onClickHide={this.onClickHide} />}
                            {this.state.isActive == 'tour' && <ManageTours />}
                            {this.state.isActive == 'order' && <ManageOrder />}
                            {this.state.isActive == 'revenue' && <ManageRevenue />}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default index;