import { Link } from 'react-router-dom'
import Icon from '../UtilComponents/Icon'
import monadocumentos from '../assets/monadocumento.png'

const Landing = () => {
    return (
        <>
            <div className="landingContainer">
                <div className="landingContainer__jumbotron">
                    <h3 className='landingContainer__title font-inter'>Obten tus documentos de una forma más sencilla</h3>
                    <h5 className='landingContainer__info font-inter'>Nos encargamos de tener los documentos preparados para ti, únicamente agrega tu información personal</h5>
                    <Link className='btn btn_captureData' to={`/files`}>Genera tus documentos <Icon icon={'arrow_forward'}></Icon></Link>
                </div>
                <img className='landingContainer__img' src={monadocumentos} alt="Imagen de una mona con un documento" />
            </div>
        </>
    )
}

export default Landing