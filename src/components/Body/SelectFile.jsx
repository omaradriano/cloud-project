import { useState } from 'react'
import files from '../../utils/files'
import { Link } from 'react-router-dom';
const SelectFile = () => {

    const [file, setFile] = useState('file_1')

    function handleSelectChange(event){
        setFile(event.target.value)
        // console.log(event.target.value)
    }
    return (
        <>
            <div className="selectFile">
                <h3>Selecciona tu archivo</h3>
                <select defaultValue={file} name="file" id="file" onChange={handleSelectChange}>
                    <option value="file_1">Formato de Autoevaluación Cualitativa</option>
                    <option value="file_2">Formato de Evaluación Cualitativa llenado por la Institución</option>
                    <option value="file_3">Formulario de carta compromiso</option>
                    <option value="file_4">Formato de Evaluación de las Actividades por el prestador de Servicio Social</option>
                    <option value="file_5">Formulario de Carta de Asignación</option>
                    <option value="file_6">Formato de Reporte Bimestral</option>
                    <option value="file_7">Formulario de Solicitud</option>
                    <option value="file_8">Formulario de Plan de Trabajo</option>
                </select>

                <div className="imgFileContainer">
                    <img src={files[file]} alt="Imagen de documento" />
                </div>

                <Link className='btn' to={'/linkdellenado'}>Aceptar y llenar documento</Link>
                {/* <input className='btn' type="button" value="Aceptar y llenar documento" /> */}
            </div>
        </>
    )
}

export default SelectFile