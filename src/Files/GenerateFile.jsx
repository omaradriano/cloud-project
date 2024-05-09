import { useContext } from "react"
import { AuthContext } from "../Context/Context"

import { SS_files } from "../utils/files"
import { Link } from "react-router-dom"

//Plantillas de los campos restantes para el formulario de generacion
import CartaCompromiso from "../Files/Templates/CartaCompromiso"
import AutoevaluacionCualitativa from "../Files/Templates/AutoevaluacionCualitativa"
import EvaluacionCualitativa from "../Files/Templates/EvaluacionCualitativa"
import EvaluacionActividades from "../Files/Templates/EvaluacionActividades"
import CartaAsignacion from "../Files/Templates/CartaAsignacion"
import ReporteBimestral from "../Files/Templates/ReporteBimestral"
import FormularioSolicitud from "../Files/Templates/FormularioSolicitud"
import PlanTrabajo from "../Files/Templates/PlanTrabajo"
import Icon from "../UtilComponents/Icon"

const fileKeys = Object.keys(SS_files)

const GenerateFile = () => {

    const { authentication } = useContext(AuthContext)

    const docsKeys = {
        ['formatodeautoevaluacioncualitativa']: 'autoevaluacion_cualitativa',
        ['formatodeevaluacioncualitativallenadoporlainstitucion']: 'evaluacion_cualitatitiva',
        ['formulariodecartacompromiso']: 'carta_compromiso',
        ['formatodeevaluaciondelasactividadesporelprestadordeserviciosocial']: 'evaluacion_actividades',
        ['formulariodecartadeasignacion']: 'carta_asignacion',
        ['formatodereportebimestral']: 'reporte_bimestral',
        ['formulariodesolicitud']: 'formulario_solicitud',
        ['formulariodeplandetrabajo']: 'plan_trabajo'

    }

    function generateDocument(document_name, type, documentData = {}) {
        const finalData = JSON.parse(localStorage.getItem('generalUserData'))

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...finalData, ...documentData })
        }

        console.log('Información enviada', finalData);
        console.log(docsKeys[document_name]);
        if (authentication) {
            console.log('Generando documento');
            switch (type) {
                case 'pdf':
                    fetch(`http://localhost:5006/files/download/${docsKeys[document_name]}/pdf`, options)
                        .then(response => {
                            // Verificar si la respuesta es exitosa
                            if (!response.ok) {
                                throw new Error('Error al obtener el archivo');
                            }
                            // Devolver el cuerpo de la respuesta como JSON
                            return response.json();
                        })
                        .then(data => {
                            // Obtener la URL del objeto de respuesta
                            const url = data.url;
                            console.log(url);
                            // Crear un enlace <a> temporal
                            const link = document.createElement('a');
                            link.href = url;
                            // Establecer el nombre de archivo para el enlace (puedes ajustarlo según tu preferencia)
                            link.setAttribute('download', 'documento.pdf');
                            // Simular un clic en el enlace para descargar el archivo
                            document.body.appendChild(link);
                            link.click();
                            // Limpiar el enlace después de la descarga
                            document.body.removeChild(link);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    break
                case 'docx':
                    fetch(`http://localhost:5006/files/download/${docsKeys[document_name]}/docx`, options)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al descargar el archivo');
                            }
                            return response.blob();
                        })
                        .then(blob => {
                            // Crear un objeto URL para el Blob
                            const url = window.URL.createObjectURL(new Blob([blob]));
                            // Crear un enlace <a> temporal
                            const link = document.createElement('a');
                            link.href = url;
                            // Establecer el nombre de archivo para el enlace
                            link.setAttribute('download', `${docsKeys[document_name]}.docx`);
                            // Simular un clic en el enlace para descargar el archivo
                            document.body.appendChild(link);
                            link.click();
                            // Limpiar el enlace y el objeto URL después de la descarga
                            link.parentNode.removeChild(link);
                            window.URL.revokeObjectURL(url);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        })
                    break
            }
        }
    }

    return (
        <>
            <div className="fillfile">
                <Link className={`btn btn__back`} to={`/generalform`}><Icon icon={'arrow_left'}></Icon>Formulario general</Link>
                <h1>Llenado de documento</h1>
                <div className="accordion accordion-flush" id="documents">
                    {fileKeys.map((elem, index) => {
                        let name = SS_files[elem].name.split(' ').join("")
                        let renderedComponent = null
                        let componentName = SS_files[fileKeys[index]].name.split(' ').join("").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        switch (componentName) {
                            case 'formatodeautoevaluacioncualitativa':
                                renderedComponent = <AutoevaluacionCualitativa></AutoevaluacionCualitativa>
                                break
                            case 'formatodeevaluacioncualitativallenadoporlainstitucion':
                                renderedComponent = <EvaluacionCualitativa></EvaluacionCualitativa>
                                break
                            case 'formulariodecartacompromiso':
                                renderedComponent = <CartaCompromiso></CartaCompromiso>
                                break
                            case 'formatodeevaluaciondelasactividadesporelprestadordeserviciosocial':
                                renderedComponent = <EvaluacionActividades></EvaluacionActividades>
                                break
                            case 'formulariodecartadeasignacion':
                                renderedComponent = <CartaAsignacion></CartaAsignacion>
                                break
                            case 'formatodereportebimestral':
                                renderedComponent = <ReporteBimestral></ReporteBimestral>
                                break
                            case 'formulariodesolicitud':
                                renderedComponent = <FormularioSolicitud></FormularioSolicitud>
                                break
                            case 'formulariodeplandetrabajo':
                                renderedComponent = <PlanTrabajo></PlanTrabajo>
                                break
                        }
                        return (
                            <div key={index} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${name}`} aria-expanded="true" aria-controls={`${name}`}>
                                        {SS_files[elem].name}
                                    </button>
                                </h2>
                                <div id={`${name}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#documents">
                                    <div className="accordion-body">
                                        {renderedComponent}
                                        <div className="dropdown btn__download">
                                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Descargar
                                            </a>

                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'pdf')}>PDF</a></li>
                                                <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'docx')}>DOCX</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default GenerateFile