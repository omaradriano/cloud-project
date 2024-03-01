import { Link } from "react-router-dom"

const AuthHover = ({mode}) => {
    return(
        <>
            <div className="profileHover profileHover--noauth">
                <Link className="text-dark" to={`/signup`}>Registro</Link>
                <Link className="text-dark" to={`/signin`}>Iniciar sesion</Link>
            </div>
        </>
    )
}

export default AuthHover