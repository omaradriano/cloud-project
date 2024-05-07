import { AuthContext } from "../Context/Context"
import GeneralForm from "../Files/GeneralForm"
import { useContext } from "react"
import Icon from "../UtilComponents/Icon"
import { SS_files } from "../utils/files"

//Plantillas de los campos restantes para el formulario de generacion
import CartaCompromiso from "../Files/Templates/CartaCompromiso"
import AutoevaluacionCualitativa from "../Files/Templates/AutoevaluacionCualitativa"
import EvaluacionCualitativa from "../Files/Templates/EvaluacionCualitativa"
import EvaluacionActividades from "../Files/Templates/EvaluacionActividades"
import CartaAsignacion from "../Files/Templates/CartaAsignacion"
import ReporteBimestral from "../Files/Templates/ReporteBimestral"
import FormularioSolicitud from "../Files/Templates/FormularioSolicitud"
import PlanTrabajo from "../Files/Templates/PlanTrabajo"

const fileKeys = Object.keys(SS_files)

const Files = () => {

    return (
        <>
            <div className="files">
                {/* <div className="accordion custom__accordion" id="general-form">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Formulario general
                                <Icon icon={'warning'} customIconClassName="accordion__button"></Icon>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#general-form">
                            <div className="accordion-body">
                            </div>
                            </div>
                            </div>
                        </div> */}
                <GeneralForm></GeneralForm>

                {/* <h3>Documentos</h3> */}

                {/* <div className="accordion accordion-flush" id="documents">

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
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div> */}
            </div>
        </>
    )
}

export default Files