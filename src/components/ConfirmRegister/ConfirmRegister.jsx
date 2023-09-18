import React from "react";
import './ConfirmRegister.css'

const ConfirmRegister = ({msg}) => {
    
    return(
        <div className="container conf-regist">
            <p className="user-regist fw-8 fs-20">{msg}</p>
        </div>
    )
}

export default ConfirmRegister;