import React from 'react';
import testHoc from '../hoc/testHoc'
class TestSecond extends React.Component {
    render() {
        return <h1 onClick={this.props.onClick}> {this.props.title} , im test second</h1>
    }
}

export default testHoc(TestSecond);