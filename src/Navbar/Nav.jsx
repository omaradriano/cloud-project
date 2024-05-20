import { useState, useContext } from 'react';
import Icon from '../UtilComponents/Icon';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, WidthContext } from '../Context/Context';

import { signOut } from "firebase/auth";
import { auth } from '../firebaseAuth';


const Nav = () => {
    const navigate = useNavigate();

    const [modalVisible, setModalVisible] = useState(false);
    const width = useContext(WidthContext)

    const { authentication } = useContext(AuthContext)

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
                        {/* <a href="#">Mis documentos</a> */}
                        {!authentication ? (
                            <Link to={`/auth`}>Iniciar Sesion</Link>
                        ) : (
                            <>  
                                <Link to={`/home`} className='dropdown-item'>Inicio</Link>
                                <Link to={`/profile`}>Perfil</Link>
                                <Link onClick={() => {
                                    signOut(auth).then(() => {
                                        localStorage.removeItem('generalUserData')
                                        navigate('/home')
                                    }).catch((error) => {
                                        // An error happened.
                                    });
                                }} >Logout</Link>
                            </>
                        )}
                        {/* <a href="#">Perfil</a> */}
                        <a href="#">Foro</a>
                        <a href="#">Panel</a>
                    </ul>
                ) : (
                    <>
                        <div className="dropdown">
                            <a className="material-icons btn btn-burguer" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                menu
                            </a>

                            <ul className="dropdown-menu">
                                {/* <li><Link to='/profile' className='dropdown-item'>Perfil</Link></li> */}
                                {!authentication ? (
                                    <li><Link to='/auth' className='dropdown-item'>Iniciar Sesion</Link></li>
                                ) : (
                                    <>
                                        <li><Link to={`/home`} className='dropdown-item'>Inicio</Link></li>
                                        <li><Link to={`/profile`} className='dropdown-item'>Perfil</Link></li>
                                        <li><Link onClick={() => {
                                            signOut(auth).then(() => {
                                                localStorage.removeItem('generalUserData')
                                                navigate('/home')
                                            }).catch((error) => {
                                                // An error happened.
                                            });
                                        }} className='dropdown-item'>Logout</Link></li>
                                    </>
                                )}
                                {/* <li><Link to={`/feedback`} className='dropdown-item'>Feedback</Link></li> */}
                                {/* <li><Link to={`/profile`} className='dropdown-item'>Perfil</Link></li> */}
                            </ul>
                        </div>
                        {/* <Icon icon={"menu"} customIconClassName='pointer' action={handleModalToggle} /> */}
                    </>

                )}
            </div>
        </>
    )
}

export default Nav