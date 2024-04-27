import { useEffect, useState, useContext } from 'react';
import Icon from '../UtilComponents/Icon';
import { Link } from 'react-router-dom';
import { WidthContext } from '../Context/Context';


const Nav = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const width = useContext(WidthContext)

    const handleModalToggle = () => {
        setModalVisible(!modalVisible);
    };

    function closeModal() {
        setModalVisible(false)
    }

    return (
        <>
            <div className="nav">
                <Link className='mainTitle' to={`/home`}>Bisondocx</Link>
                {width > 768 ? (
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