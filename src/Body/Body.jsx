import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Body = () => {

    const navigate = useNavigate();
    let location = useLocation();

    /**
     * La primera vez que se carga la pagina, nos redirige a la ruta /home
     */
    useEffect(() => {
        if (location.pathname === '/') navigate('/home')
    }, [])

    return (
        <>
            <div className="body">
                {/**
                 * Recordar que Outlet sirve para renderizar dentro los componentes que se manejen por react router   
                 */}
                <Outlet/>
            </div>
        </>
    )
}

export default Body