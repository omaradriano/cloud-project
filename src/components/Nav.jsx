import { useState } from 'react';
import AuthHover from './AuthHover';
import Icon from './Icon';

const Nav = () => { 

    const [visibleAuthHover, setVisibleAuthHover] = useState(false)

    function toggleAuthHover() {
        setVisibleAuthHover(!visibleAuthHover)
    }

    function closeAuthHover(){
        setVisibleAuthHover(false)
    }

    return(
        <>
            <div className="nav">
                <h2>Bisondocx</h2>
                <Icon icon={"account_circle"} customIconClassName='pointer' action={toggleAuthHover}/>
                <AuthHover visibleHover={visibleAuthHover} closeHover={closeAuthHover}/>
            </div>
        </>
    )
}

export default Nav