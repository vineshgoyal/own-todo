import React from 'react';

class Header extends React.Component {
    state = {}

    constructor(props){
        super(props);
        this.state = {
            title: props.title
        }
    }
    shouldComponentUpdate(props){
        console.log('should props, newProps:', props.title, this.state.title)
        if(props.title === this.state.title){
            return false
        }else {
            return true
        }

    }
    UNSAFE_componentWillUpdate( newProps  ){
        console.log(' props, newProps:',  newProps)
        
    }
    render(){
        return <h1>
            {this.props.title}
        </h1> 
    }
}

export default Header;