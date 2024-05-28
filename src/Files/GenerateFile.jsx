import { useContext, useEffect, useState } from "react"
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

import { ToastContainer } from 'react-toastify';

const fileKeys = Object.keys(SS_files)

const GenerateFile = () => {

    const [autoevaluacionCualitativaCompleted, setAutoevaluacionCualitativaCompleted] = useState(false)
    const [evaluacionCualitativaCompleted, setEvaluacionCualitativaCompleted] = useState(false)
    const [cartaCompromisoCompleted, setCartaCompromisoCompleted] = useState(false)
    const [evaluacionActividadesCompleted, setEvaluacionActividadesCompleted] = useState(false)
    const [cartaAsignacionCompleted, setCartaAsignacionCompleted] = useState(false)
    const [reporteBimestralCompleted, setReporteBimestralCompleted] = useState(false)
    const [formularioSolicitudCompleted, setFormularioSolicitudCompleted] = useState(false)
    const [planTrabajoCompleted, setPlanTrabajoCompleted] = useState(false)

    //Contexto que tiene la autenticación
    const { authentication } = useContext(AuthContext)

    useEffect(() => {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

        // Devuelve una función de limpieza para detener las instancias del popover cuando el componente se desmonte
        return () => {
            popoverList.forEach(popover => popover.dispose());
        };
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="fillfile">
                <Link className={`btn btn__back`} to={`/generalform`}><Icon icon={'arrow_left'}></Icon>Atras</Link>
                <h1>Llenado de documento</h1>
                <div className="accordion accordion-flush" id="documents">
                    {fileKeys.map((elem, index) => {
                        let name = SS_files[elem].name.split(' ').join("")
                        // console.log('from idk ',name);
                        let renderedComponent = null
                        let componentName = SS_files[fileKeys[index]].name.split(' ').join("").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        // console.log(componentName);s
                        switch (componentName) {
                            case 'formatodeautoevaluacioncualitativa':
                                renderedComponent = <AutoevaluacionCualitativa stateFunction={setAutoevaluacionCualitativaCompleted} componentName={componentName} auth={authentication}></AutoevaluacionCualitativa>
                                break
                            case 'formatodeevaluacioncualitativallenadoporlainstitucion':
                                renderedComponent = <EvaluacionCualitativa stateFunction={setEvaluacionCualitativaCompleted} componentName={componentName} auth={authentication}></EvaluacionCualitativa>
                                break
                            case 'formulariodecartacompromiso':
                                renderedComponent = <CartaCompromiso stateFunction={setCartaCompromisoCompleted} componentName={componentName} auth={authentication}></CartaCompromiso>
                                break
                            case 'formatodeevaluaciondelasactividadesporelprestadordeserviciosocial':
                                renderedComponent = <EvaluacionActividades stateFunction={setEvaluacionActividadesCompleted} componentName={componentName} auth={authentication}></EvaluacionActividades>
                                break
                            case 'formulariodecartadeasignacion':
                                renderedComponent = <CartaAsignacion stateFunction={setCartaAsignacionCompleted} componentName={componentName} auth={authentication}></CartaAsignacion>
                                break
                            case 'formatodereportebimestral':
                                renderedComponent = <ReporteBimestral stateFunction={setReporteBimestralCompleted} componentName={componentName} auth={authentication}></ReporteBimestral>
                                break
                            case 'formulariodesolicitud':
                                renderedComponent = <FormularioSolicitud stateFunction={setFormularioSolicitudCompleted} componentName={componentName} auth={authentication}></FormularioSolicitud>
                                break
                            case 'formulariodeplandetrabajo':
                                renderedComponent = <PlanTrabajo stateFunction={setPlanTrabajoCompleted} componentName={componentName} auth={authentication}></PlanTrabajo>
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
                                    <div className="accordion-body form__inputs">
                                        {renderedComponent}
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