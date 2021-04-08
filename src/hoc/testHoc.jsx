import React from 'react';
function testHoc(AnyReactComponent) {
    return class extends React.Component {
        state = {
            title: "Hello"
        }
        clickHandler() {
            this.setState({
                title: "New value, updated"
            })
        }

        render() {
            return <AnyReactComponent onClick={this.clickHandler.bind(this)} title={this.state.title} />
        }
    }
}


export default testHoc;