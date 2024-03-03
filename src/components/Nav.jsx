import { useState } from 'react';
import AuthHover from './AuthHover';
import Icon from './Icon';
import { Link } from 'react-router-dom';
import Modal from './Reusables/Modal';

const Nav = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleModalToggle = () => {
        setModalVisible(!modalVisible);
    };

    function closeModal(){
        setTimeout(() => {
            setModalVisible(false)
        }, 0);
    }

    return (
        <>
            <div className="nav">
                <Link className='mainTitle' to={`/home`}>Bisondocx</Link>
                <Icon icon={"account_circle"} customIconClassName='pointer' action={handleModalToggle}/>
                <Modal visible={modalVisible} component={<AuthHover unmount={closeModal} visible={modalVisible}/>}/>
            </div>
        </>
    )
}

export default Nav