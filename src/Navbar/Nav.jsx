import { useState, useEffect } from 'react';
import Icon from '../UtilComponents/Icon';
import { Link } from 'react-router-dom';

const Nav = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [minwidth, setMinwidth] = useState(false)

    const handleModalToggle = () => {
        setModalVisible(!modalVisible);
    };

    function closeModal() {
        setModalVisible(false)
    }

    // Esto maneja el mostrar un burguer button o las opciones en base al width de la pantalla
    function handleResize() {
        window.innerWidth >= 768 ? setMinwidth(true) : setMinwidth(false)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(()=>{
        handleResize()
    },[])

    return (
        <>
            <div className="nav">
                <Link className='mainTitle' to={`/home`}>Bisondocx</Link>
                {minwidth ? (
                    <ul className='nav__options'>
                        {/* Estas opciones van a ser un Link de react router */}
                        <a href="#">Nosotros</a>
                        <a href="#">Mis documentos</a>
                        <Link to={`/auth`}>Iniciar Sesion</Link>
                        {/* <a href="#">Perfil</a> */}
                        <a href="#">Feedback</a>
                        <a href="#">Panel</a>
                    </ul>
                ) : (
                    <Icon icon={"menu"} customIconClassName='pointer' action={handleModalToggle} />
                )}
            </div>
        </>
    )
}

export default Nav