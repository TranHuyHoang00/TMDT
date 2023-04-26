import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearch: ''
        }
    }
    onChangeSearch = (event) => {
        this.setState({
            textSearch: event.target.value
        })
    }
    onClickSearch = () => {
        if (this.state.textSearch == '') {
            this.props.getManageAllTours('All')
        } else {
            this.props.getManageAllToursSearch(this.state.textSearch)
        }
    }
    render() {
        return (
            <>
                <div className=' flex items-center justify-center my-[20px]'>
                    <div className='px-[40px] py-[20px] shadow-xl rounded-[10px] border'>
                        <div className='text-[22px] font-[600] text-[#01c7f4]'>
                            <h1>Du lịch khắp nơi</h1>
                        </div>
                        <div className='flex items-center space-x-[20px]'>
                            <div>
                                <input onChange={(event) => this.onChangeSearch(event)}
                                    type='text' className='w-[440px] rounded-[4px]' placeholder='Nhập tên Tour' />
                            </div>
                            <div className='text-[20px] font-[500] text-white text-center'>
                                <button onClick={() => this.onClickSearch()}
                                    className='bg-[#4e3883] w-[110px] py-[4px] rounded-[5px]'>TÌM KIẾM</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Search;