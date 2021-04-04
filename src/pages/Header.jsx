import React from 'react';

function Header(props){
    React.useEffect( ()=>{
        console.log("use effect fired")
    } ,[props.title]);
    console.log("render header")
    return <h1>{props.title}</h1>
}

export default Header;