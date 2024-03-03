import { Link } from "react-router-dom"

const AuthHover = ({ visibleHover=true, mode = 'noauth' }) => {

    switch (mode) {
        case 'noauth':
            return (
                visibleHover ? (
                    <div id="authhover_id" className="profileHover profileHover--noauth visible">
                        <Link onClick={() => {  }} className="text-dark" to={`/signup`}>Registro</Link>
                        <Link onClick={() => {  }} className="text-dark" to={`/signin`}>Iniciar sesion</Link>
                    </div>
                ) : (null))
        case 'preauth':
            return (
                visibleHover ? (
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
                ) : (null)
            )
        case 'auth':
            return (
                visibleHover ? (
                    <div id="authhover_id" className="profileHover profileHover--auth visible">

                    </div>
                ) : (null)
            )
    }
}

export default AuthHover