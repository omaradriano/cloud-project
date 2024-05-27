import { useEffect, useState } from "react"
import { generateDocument, handleValidations, submitData, validateAll } from "../../utils/forms_functions"
import { months } from "../../utils/some_aux"
import Input from "../Components/Input"
import { serverDomain } from "../../config"
import Icon from "../../UtilComponents/Icon"
import InputSelect from "../Components/InputSelect"
import InputTextarea from "../Components/InputTextarea"
import InputText from "../Components/InputText"

const ReporteBimestral = ({ componentName, auth }) => {

    //Valores que se utilizan en  el formulario de autoevaluacion cualitativa
    const [values, setValues] = useState({
        n_report: '',
        sp_d: '',
        sp_m: 'Enero',
        sp_y: '',
        ep_d: '',
        ep_m: "Enero",
        ep_y: '',
        activities_desc: '',
        hours_in_period: '',
        total_hours: ''
    })

    const counter = [1, 2, 3, 4, 5]

    const [validationsCompleted, setValidationsCompleted] = useState(false)

    const [validations, setValidations] = useState({
        n_report: null,
        sp_d: null,
        sp_m: null,
        sp_y: null,
        ep_d: null,
        ep_m: null,
        ep_y: null,
        activities_desc: null,
        hours_in_period: null,
        total_hours: null
    })

    // state que maneja el cambio de los valores en los input
    function handleChange(evt) {
        const { target } = evt
        const { name, value } = target
        setValues(prev => ({ ...prev, [name]: value }))
    }


    //Para leer los valores de los formularios en tiempo real
    useEffect(() => {
        console.log(values);
        console.log('Validations ', validations);
        // isChecked ? setValues(prev => ({...prev, isFinal: 'x'})) :setValues(prev => ({...prev, isFinal: ''}))
        validateAll(validations) ? setValidationsCompleted(true) : setValidationsCompleted(false);
    }, [values, validations])

    //Trae los datos del localStorage por el respectivo componente
    useEffect(() => {
        let fileData = JSON.parse(localStorage.getItem('generalUserData'))
        // console.log(fileData);
        if (fileData.files) {
            if (fileData.files[componentName]) {
                setValues({ ...fileData.files[componentName] })
            }
        }
    }, [])

    useEffect(() => {
        // console.log(values);
        if (values) handleValidations(validations, setValidations, values)
        // console.log(isChecked);
    }, [values])
    return (
        <>
            <input type="button" value="Guardar" className={`btn btn__save btn__save--file`} onClick={() => submitData(auth, values, componentName, serverDomain)} />

            {/*  ----------------- Validar el numero de reporte que es ----------------- */}
            <InputSelect
                handleChange={handleChange}
                label='Numero de reporte'
                name='n_report'
                renderArray={counter.map((elem) => {
                    return <option key={String(elem)} value={String(elem)}>{String(elem)}</option>
                })}
                value={values.n_report}
                completed={validations.n_report}
            />

            {/*  ----------------- Validar actividades realizadas en el reporte ----------------- */}
            <InputTextarea
                handleChange={handleChange}
                label='Actividades a realizadas en el periodo'
                maxLength={320}
                name='activities_desc'
                placeholder={'Ej. llenado de documentos del alumnado del instituto'}
                value={values.activities_desc}
                completed={validations.activities_desc}
                popover={true}
                popoverText="Describir las actividades que se han realizado durante el bimestre recién cursado"
            />

            {/*  ----------------- Validar fecha de inicio del periodo del reporte ----------------- */}
            <div className="formdata__group mb-5p">
                <div className="formdata__options">
                    <InputSelect
                        handleChange={handleChange}
                        label={'Dia de inicio de periodo'}
                        name={'sp_d'}
                        renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.sp_d}
                        completed={validations.sp_d}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Mes de inicio de periodo'}
                        name={'sp_m'}
                        renderArray={months.map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.sp_m}
                        completed={validations.sp_m}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Año de inicio de periodo'}
                        name={'sp_y'}
                        renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.sp_y}s
                        completed={validations.sp_y}
                    />
                </div>
            </div>

            {/*  ----------------- Validar fecha de inicio ----------------- */}
            <div className="formdata__group mb-5p">
                <div className="formdata__options">
                    <InputSelect
                        handleChange={handleChange}
                        label={'Dia de fin de periodo'}
                        name={'ep_d'}
                        renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.ep_d}
                        completed={validations.ep_d}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Mes de fin de periodo'}
                        name={'ep_m'}
                        renderArray={months.map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.ep_m}
                        completed={validations.ep_m}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Año de fin de periodo'}
                        name={'ep_y'}
                        renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.ep_y}
                        completed={validations.ep_y}
                    />
                </div>
            </div>

            {/*  ----------------- Horas en este reporte ----------------- */}
            <div className="formdata__group mb-5p">
                <div className="formdata__options">
                        <InputText
                            handleChange={handleChange}
                            label='Total de horas en este reporte'
                            name='hours_in_period'
                            placeholder='Ej. 120'
                            value={values.hours_in_period}
                            completed={validations.hours_in_period}
                            popover={true}
                            popoverText="Cantidad de horas que se han acumulado en el bimestre de este reporte"
                        />
                        <InputText
                            handleChange={handleChange}
                            label='Total de horas acumuladas'
                            name='total_hours'
                            placeholder='Ej. 426'
                            value={values.total_hours}
                            completed={validations.total_hours}
                            popover={true}
                            popoverText="Cantidad de horas que se han acumulado en el semestre"
                        />
                </div>
            </div>

            <div className={`dropdown`}>
                {/* ${!validations.bimester ? 'disabled' : ''} */}
                <a className={`btn btn-secondary dropdown-toggle ${!validationsCompleted ? 'disabled' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Descargar
                </a>

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'pdf', auth, { ...values })}>PDF</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'docx', auth, { ...values })}>DOCX</a></li>
                </ul>
            </div>
        </>
    )
}

export default ReporteBimestral