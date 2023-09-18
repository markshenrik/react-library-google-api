import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './NotFound.css'

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [])
    
    return(
        <div className="container not-auth">
            <p className="fw-8 fs-20">Acesso não autorizado ou usuário não cadastrado!</p>
        </div>
)
}

export default NotFound