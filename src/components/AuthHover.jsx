import { useEffect } from "react";
import { Link } from "react-router-dom"

const AuthHover = ({ mode = 'noauth', unmount, visible }) => {

    function handleClick(event) {
        if (!event.target.closest('.profileHover') && !event.target.closest('.pointer')) {
            // console.log('Si jala')
            unmount()
        }
    }
    useEffect(() => {
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    switch (mode) {
        case 'noauth':
            return (
                <div id="authhover_id" className={`profileHover profileHover--noauth visible ${!visible ? 'fadeOut' : ''}`}>
                    <Link onClick={() => { unmount() }} className="text-dark" to={`/signup`}>Registro</Link>
                    <Link onClick={() => { unmount() }} className="text-dark" to={`/signin`}>Iniciar sesion</Link>
                </div>
            )
        case 'preauth':
            return (
                <div id="authhover_id" className="profileHover profileHover--preauth visible">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="L12345678@chihuahua2.tecnm.mx" />
                    </div>
                    <div>
                        <label htmlFor="password">Email</label>
                        <input type="password" placeholder="12345678" />
                    </div>
                    <input className="btn" type="button" value="Iniciar sesion" />
                </div>
            )
        case 'auth':
            return (
                <div id="authhover_id" className="profileHover profileHover--auth visible">
                    ola
                </div>
            )
    }
}

export default AuthHover