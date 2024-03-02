import { Link } from "react-router-dom"

const AuthHover = ({visibleHover, closeHover}) => {
    return (
        <>
            {
                visibleHover ? (
                    <div className="profileHover profileHover--noauth">
                        <Link onClick={()=>{closeHover()}} className="text-dark" to={`/signup`}>Registro</Link>
                        <Link onClick={()=>{closeHover()}} className="text-dark" to={`/signin`}>Iniciar sesion</Link>
                    </div>
                ) : (
                    // <h1 style={{ position: 'absolute', right: '0px', zIndex: '1' }}>Logged</h1>
                    null
                )
            }

        </>
    )
}

export default AuthHover