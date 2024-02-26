import monadocumentos from '../assets/monadocumento.png'

const Body = () => {
    return(
        <>
            <div className="body">
                <div className="body_container">
                    <img src={monadocumentos} alt="Imagen de una mona con un documento"/>
                    <div className="body_container_data">
                        <h3>Obten tus documentos de servicio social</h3>
                        <input className='btn btn_captureData' type="button" value="Captura tus datos" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Body