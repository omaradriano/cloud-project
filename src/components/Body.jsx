import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Body = () => {

    const navigate = useNavigate();
    let location = useLocation();

    //La primera vez que carga la pagina nos va a redirigir hacia /home para poder renderizar las vista
    useEffect(() => {
        if (location.pathname === '/') navigate('/home')
    }, [])

    return (
        <>
            <div className="body">
                <Outlet />
            </div>
        </>
    )
}

export default Body