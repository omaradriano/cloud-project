import logotecnm from '../assets/logotec.svg'
import logotec from '../assets/logotec2.svg'
import logoedu from '../assets/logoedu.svg'

const Header = () => {
    return (
        <>
            <div className="header">
                <img src={logotecnm} alt="Logo tecnm" />
                <img src={logoedu} alt="Mona con documentos" />
                <img src={logotec} alt="Logo tec2" />
            </div>
        </>
    )
}

export default Header