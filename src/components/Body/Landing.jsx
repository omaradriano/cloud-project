import { Link } from 'react-router-dom'
import monadocumentos from '../../assets/monadocumento.png'

const Landing = () => {
    return (
        <>
            <div className="landingContainer__body">
                <img src={monadocumentos} alt="Imagen de una mona con un documento" />
                <div className="landingContainer__info">
                    <h3>Obten tus documentos de servicio social</h3>
                    <Link className='btn btn_captureData' to={`/selectFile`}>Captura tus datos</Link>
                </div>
            </div>
        </>
    )
}

export default Landing