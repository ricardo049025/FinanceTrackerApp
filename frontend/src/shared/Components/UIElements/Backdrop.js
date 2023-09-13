import React from "react";
import  ReactDOM  from "react-dom";
import './Backdrop.css'

const Backdrop = props =>{
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={props.openDrawerHandler}></div>
        ,document.getElementById("backdrop")
    )
}

export default Backdrop;