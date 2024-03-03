import { useState } from 'react'
import autoevaluacion_cualitativa from '../../assets/FilesImages/formulario_autoevaluacion_cualitativa_PRESTADOR.png'
import carta_compromiso from '../../assets/FilesImages/formulario_carta_compromiso.png'
import actividades from '../../assets/FilesImages/formulario_de_actividades_PRESTADOR.png'
import carta_asignacion from '../../assets/FilesImages/formulario_de_carta_de_asignacion.png'
import reporte_bimestral from '../../assets/FilesImages/formulario_de_reporte_bimestral.png'
import solicitud from '../../assets/FilesImages/formulario_de_solicitud.png'
import evaluacion_cualitativa from '../../assets/FilesImages/formulario_evaluacion_cualitativa_INSTITUCION.png'
import plan_de_trabajo from '../../assets/FilesImages/formulario_plan_de_trabajo.png'

const SelectFile = () => {

    const [file, setFile] = useState('file_1')

    const files = {
        "file_1": autoevaluacion_cualitativa,
        "file_2": evaluacion_cualitativa,
        "file_3": carta_compromiso,
        "file_4": actividades,
        "file_5": carta_asignacion,
        "file_6": reporte_bimestral,
        "file_7": solicitud,
        "file_8": plan_de_trabajo,
        
    }
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

                <input className='btn' type="button" value="Aceptar y llenar documento" />
            </div>
        </>
    )
}

export default SelectFile