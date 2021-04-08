import React from 'react';
import testHoc from '../hoc/testHoc'
class Test extends React.Component {

    render() {
        return <h1 onClick={this.props.onClick} > {this.props.title} , im test 1</h1>
    }
}

export default testHoc(Test);