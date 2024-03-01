import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AuthHover from './AuthHover';
import { useEffect } from 'react';

const Body = () => {

    const navigate = useNavigate();
    let location = useLocation();

    //La primera vez que carga la pagina nos va a redirigir hacia /home para poder renderizar las vista
    useEffect(()=>{
        console.log(location)
        if(location.pathname === '/') navigate('/home')  
    }, [])

    return(
        <>
            <div className="body">
                <AuthHover />
                <Outlet />
            </div>
        </>
    )
}

export default Body