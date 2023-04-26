import React from 'react';
import Header from './Element/Header';
import Main from './Element/Main';
class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
                <div className='px-[100px] '>
                    <Header />
                    <Main />
                </div>
            </>
        )
    }
}

export default index;