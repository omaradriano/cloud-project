import { useState } from 'react';
import AuthHover from './AuthHover';
import Icon from './Icon';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <div className="nav">
                <Link className='mainTitle' to={`/home`}>Bisondocx</Link>
                <Icon icon={"account_circle"} customIconClassName='pointer'/>
                <AuthHover />
            </div>
        </>
    )
}

export default Nav