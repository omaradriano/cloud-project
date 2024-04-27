import { WidthContext } from "../Context/Context"
import GeneralForm from "../Files/GeneralForm"
import { useContext } from "react"
import Icon from "../UtilComponents/Icon"

const Files = () => {

    return (
        <>
            <div className="files">
                <div className="accordion custom__accordion" id="general-form">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Formulario general
                                <Icon icon={'warning'} customIconClassName="accordion__button"></Icon>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#general-form">
                            <div className="accordion-body">
                                <GeneralForm></GeneralForm>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <h3>Documentos</h3> */}

                <div className="accordion accordion-flush" id="documents">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#carta_compromiso" aria-expanded="true" aria-controls="carta_compromiso">
                                Carta compromiso
                            </button>
                        </h2>
                        <div id="carta_compromiso" className="accordion-collapse collapse show" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#formulario_solicitud" aria-expanded="true" aria-controls="formulario_solicitud">
                                Formulario de solicitud
                            </button>
                        </h2>
                        <div id="formulario_solicitud" className="accordion-collapse collapse" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#carta_asignacion" aria-expanded="true" aria-controls="carta_asignacion">
                                Carta de asignacion
                            </button>
                        </h2>
                        <div id="carta_asignacion" className="accordion-collapse collapse" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#plan_trabajo" aria-expanded="true" aria-controls="plan_trabajo">
                                Plan de trabajo
                            </button>
                        </h2>
                        <div id="plan_trabajo" className="accordion-collapse collapse" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#autoevaluacion_cualitativa" aria-expanded="true" aria-controls="autoevaluacion_cualitativa">
                                Autoevaluacion cualitativa
                            </button>
                        </h2>
                        <div id="autoevaluacion_cualitativa" className="accordion-collapse collapse" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#evaluacion_actividades" aria-expanded="true" aria-controls="evaluacion_actividades">
                                Evaluacion de las actividades
                            </button>
                        </h2>
                        <div id="evaluacion_actividades" className="accordion-collapse collapse" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#evaluacion_cualitativa" aria-expanded="true" aria-controls="evaluacion_cualitativa">
                                Evaluacion cualitativa
                            </button>
                        </h2>
                        <div id="evaluacion_cualitativa" className="accordion-collapse collapse" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#reporte_bimestral" aria-expanded="true" aria-controls="reporte_bimestral">
                                Reporte Bimestral
                            </button>
                        </h2>
                        <div id="reporte_bimestral" className="accordion-collapse collapse" data-bs-parent="#documents">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Files