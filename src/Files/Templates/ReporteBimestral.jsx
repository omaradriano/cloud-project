import { useEffect, useState } from "react"
import { generateDocument, handleValidations, submitData, validateAll } from "../../utils/forms_functions"
import { months } from "../../utils/some_aux"
import Input from "../Components/Input"
import { serverDomain } from "../../config"
import Icon from "../../UtilComponents/Icon"

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
        // console.log(values);
        // console.log('Validations ', validations);
        // isChecked ? setValues(prev => ({...prev, isFinal: 'x'})) :setValues(prev => ({...prev, isFinal: ''}))
        validateAll(validations) ? setValidationsCompleted(true) : setValidationsCompleted(false);
    }, [values, validations])

    //Trae los datos del localStorage por el respectivo componente
    useEffect(() => {
        let fileData = JSON.parse(localStorage.getItem('generalUserData'))
        // console.log(fileData);
        if (fileData.files) {
            if(fileData.files[componentName]){
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
            <p>ReporteBimestral</p>
            <input type="button" value="Guardar" className={`btn btn__save btn__save--file`} onClick={() => submitData(auth, values, componentName, serverDomain)} />

            {/*  ----------------- Validar el numero de reporte que es ----------------- */}
            <div className="formData__block">
                <label className="formData__label" htmlFor="n_report">Numero de reporte</label>
                <select className="formData__select" name="n_report" id="n_report" value={values.n_report} onChange={handleChange}>
                    <option value={''}>Selecciona una opcion</option>
                    {/* Renderiza los semestres en el SELECT */}
                    {counter.map((elem) => {
                        return <option key={String(elem)} value={String(elem)}>{String(elem)}</option>
                    })}
                </select>
            </div>
            <ul className='validationList'>
                {validations.n_report === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            {/*  ----------------- Validar actividades realizadas en el reporte ----------------- */}
            <div className="formData__block">
                <label htmlFor="activities_desc" className="formData__label">Actividades a realizar en el periodo</label>
                <textarea onChange={handleChange} name="activities_desc" id="activities_desc" maxLength={320} value={values.activities_desc}></textarea>
            </div>
            <ul className='validationList'>
                {validations.activities_desc === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            {/*  ----------------- Validar fecha de inicio del periodo del reporte ----------------- */}
            <div className="formData__group">
                <div className="formData__block">
                    <label className="formData__label" htmlFor="career">Dia de inicio del periodo</label>
                    <Input
                        value={values.sp_d}
                        name={'sp_d'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
                <div className="formData__block">
                    <label htmlFor="sp_m" className="formData__label">Mes de inicio del periodo</label>
                    <select className="formData__select" name="sp_m" id="sp_m" value={values.sp_m} onChange={handleChange}>
                        {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                        {months.map((_elem, index) => {
                            return <option key={index + 1} value={_elem}>{_elem}</option>
                        })}
                    </select>
                </div>
                <div className="formData__block">
                    <label htmlFor="sem" className="formData__label">Año de inicio del periodo</label>
                    <Input
                        value={values.sp_y}
                        name={'sp_y'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
            </div>
            <ul className='validationList'>
                {validations.sp_d === false || validations.sp_m === false || validations.sp_y === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Falta información</p>
                    </div>
                ) : null}
            </ul>
            {/*  ----------------- Validar fecha de inicio ----------------- */}
            <div className="formData__group">
                <div className="formData__block">
                    <label className="formData__label" htmlFor="career">Dia de fin de periodo</label>
                    <Input
                        value={values.ep_d}
                        name={'ep_d'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
                <div className="formData__block">
                    <label htmlFor="ep_m" className="formData__label">Mes de fin de periodo</label>
                    <select className="formData__select" name="ep_m" id="ep_m" value={values.ep_m} onChange={handleChange}>
                        {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                        {months.map((_elem, index) => {
                            return <option key={index + 1} value={_elem}>{_elem}</option>
                        })}
                    </select>
                </div>
                <div className="formData__block">
                    <label htmlFor="sem" className="formData__label">Año de fin de periodo</label>
                    <Input
                        value={values.ep_y}
                        name={'ep_y'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
            </div>
            <ul className='validationList'>
                {validations.ep_d === false || validations.ep_m === false || validations.ep_y === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Falta información</p>
                    </div>
                ) : null}
            </ul>

            <div className="formData__group">
                {/*  ----------------- Horas en este reporte ----------------- */}
                <div className="formData__block">
                    <label className="formData__label" htmlFor="career">Total de horas en este reporte</label>
                    <Input
                        value={values.hours_in_period}
                        name={'hours_in_period'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>

                {/*  ----------------- Horas acumuladas ----------------- */}
                <div className="formData__block">
                    <label className="formData__label" htmlFor="career">Total de horas acumuladas</label>
                    <Input
                        value={values.total_hours}
                        name={'total_hours'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
            </div>
            <ul className='validationList'>
                {validations.hours_in_period === false || validations.total_hours === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Falta información</p>
                    </div>
                ) : null}
            </ul>
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