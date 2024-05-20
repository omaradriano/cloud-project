import { useEffect, useState } from "react"
import { generateDocument, handleValidations, submitData, validateAll } from "../../utils/forms_functions"
import Input from "../Components/Input"
import { months } from "../../utils/aux"
import Icon from "../../UtilComponents/Icon"
import { serverDomain } from "../../config"

const PlanTrabajo = ({ componentName, auth }) => {
    //Valores que se utilizan en  el formulario de autoevaluacion cualitativa
    const [values, setValues] = useState({
        p_1_d: '',
        p_1_m: 'Enero',
        p_1_y: '',
        p_2_d: '',
        p_2_m: 'Enero',
        p_2_y: '',
        p_3_d: '',
        p_3_m: 'Enero',
        p_3_y: '',
        fp_d: '',
        fp_m: 'Enero',
        fp_y: '',
        p_1_activities: '',
        p_1_people: '',
        p_2_activities: '',
        p_2_people: '',
        p_3_activities: '',
        p_3_people: '',

    })

    const counter = [1, 2, 3, 4, 5]

    const [validationsCompleted, setValidationsCompleted] = useState(false)

    const [validations, setValidations] = useState({
        p_1_d: null,
        p_1_m: null,
        p_1_y: null,
        p_2_d: null,
        p_2_m: null,
        p_2_y: null,
        p_3_d: null,
        p_3_m: null,
        p_3_y: null,
        fp_d: null,
        fp_m: null,
        fp_y: null,
        p_1_activities: null,
        p_1_people: null,
        p_2_activities: null,
        p_2_people: null,
        p_3_activities: null,
        p_3_people: null,
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
        if (fileData.files[componentName]) {
            setValues({ ...fileData.files[componentName] })
        }
    }, [])

    useEffect(() => {
        // console.log(values);
        if (values) handleValidations(validations, setValidations, values)
        // console.log(isChecked);
    }, [values])
    return (
        <>
            <p>PlanTrabajo</p>

            {/*  ----------------- Validar primer periodo ----------------- */}
            <div className="formData__group">
                <div className="formData__block">
                    <label className="formData__label" htmlFor="p_1_d">Dia de inicio del 1er periodo</label>
                    <Input
                        value={values.p_1_d}
                        name={'p_1_d'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
                <div className="formData__block">
                    <label htmlFor="p_1_m" className="formData__label">Mes de inicio del 1er periodo</label>
                    <select className="formData__select" name="p_1_m" id="p_1_m" value={values.p_1_m} onChange={handleChange}>
                        {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                        {months.map((_elem, index) => {
                            return <option key={index + 1} value={_elem}>{_elem}</option>
                        })}
                    </select>
                </div>
                <div className="formData__block">
                    <label htmlFor="p_1_y" className="formData__label">Año de inicio del 1er periodo</label>
                    <Input
                        value={values.p_1_y}
                        name={'p_1_y'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
            </div>
            <ul className='validationList'>
                {validations.p_1_d === false || validations.p_1_m === false || validations.p_1_y === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Existen campos vacíos</p>
                    </div>
                ) : null}
            </ul>
            {/*  ----------------- Actividades del primer periodo ----------------- */}
            <div className="formData__block">
                <label htmlFor="p_1_activities" className="formData__label">Actividades a realizar en el periodo</label>
                <textarea onChange={handleChange} name="p_1_activities" id="p_1_activities" maxLength={150} value={values.p_1_activities}></textarea>
            </div>
            <ul className='validationList'>
                {validations.p_1_activities === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>
            {/*  ----------------- Gente beneficiada del primer periodo ----------------- */}
            <div className="formData__block">
                <label className="formData__label" htmlFor="career">Cantidad de personas beneficiadas en el 1er periodo</label>
                <Input
                    value={values.p_1_people}
                    name={'p_1_people'}
                    type={'text'}
                    handleChange={handleChange}>
                </Input>
            </div>
            <ul className='validationList'>
                {validations.p_1_people === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Existen campos vacíos</p>
                    </div>
                ) : null}
            </ul>

            {/*  ----------------- Validar segundo periodo ----------------- */}
            <div className="formData__group">
                <div className="formData__block">
                    <label className="formData__label" htmlFor="p_2_d">Dia de inicio del 2do periodo</label>
                    <Input
                        value={values.p_2_d}
                        name={'p_2_d'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
                <div className="formData__block">
                    <label htmlFor="p_2_m" className="formData__label">Mes de inicio del 2do periodo</label>
                    <select className="formData__select" name="p_2_m" id="p_2_m" value={values.p_2_m} onChange={handleChange}>
                        {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                        {months.map((_elem, index) => {
                            return <option key={index + 1} value={_elem}>{_elem}</option>
                        })}
                    </select>
                </div>
                <div className="formData__block">
                    <label htmlFor="p_2_y" className="formData__label">Año de inicio del 2do periodo</label>
                    <Input
                        value={values.p_2_y}
                        name={'p_2_y'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
            </div>
            <ul className='validationList'>
                {validations.p_2_d === false || validations.p_2_m === false || validations.p_2_y === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Existen campos vacíos</p>
                    </div>
                ) : null}
            </ul>
            {/*  ----------------- Actividades del segundo periodo ----------------- */}
            <div className="formData__block">
                <label htmlFor="p_2_activities" className="formData__label">Actividades a realizar en el periodo</label>
                <textarea onChange={handleChange} name="p_2_activities" id="p_2_activities" maxLength={150} value={values.p_2_activities}></textarea>
            </div>
            <ul className='validationList'>
                {validations.p_2_activities === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>
            {/*  ----------------- Gente beneficiada del primer periodo ----------------- */}
            <div className="formData__block">
                <label className="formData__label" htmlFor="career">Cantidad de personas beneficiadas en el 2do periodo</label>
                <Input
                    value={values.p_2_people}
                    name={'p_2_people'}
                    type={'text'}
                    handleChange={handleChange}>
                </Input>
            </div>
            <ul className='validationList'>
                {validations.p_2_people === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Existen campos vacíos</p>
                    </div>
                ) : null}
            </ul>

            {/*  ----------------- Validar tercer periodo ----------------- */}
            <div className="formData__group">
                <div className="formData__block">
                    <label className="formData__label" htmlFor="p_3_d">Dia de inicio del 3er periodo</label>
                    <Input
                        value={values.p_3_d}
                        name={'p_3_d'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
                <div className="formData__block">
                    <label htmlFor="p_3_m" className="formData__label">Mes de inicio del 3er periodo</label>
                    <select className="formData__select" name="p_3_m" id="p_3_m" value={values.p_3_m} onChange={handleChange}>
                        {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                        {months.map((_elem, index) => {
                            return <option key={index + 1} value={_elem}>{_elem}</option>
                        })}
                    </select>
                </div>
                <div className="formData__block">
                    <label htmlFor="p_3_y" className="formData__label">Año de inicio del 3er periodo</label>
                    <Input
                        value={values.p_3_y}
                        name={'p_3_y'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
            </div>
            <ul className='validationList'>
                {validations.p_3_d === false || validations.p_3_m === false || validations.p_3_y === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Existen campos vacíos</p>
                    </div>
                ) : null}
            </ul>
            {/*  ----------------- Actividades del segundo periodo ----------------- */}
            <div className="formData__block">
                <label htmlFor="p_3_activities" className="formData__label">Actividades a realizar en el periodo</label>
                <textarea onChange={handleChange} name="p_3_activities" id="p_3_activities" maxLength={150} value={values.p_3_activities}></textarea>
            </div>
            <ul className='validationList'>
                {validations.p_3_activities === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>
            {/*  ----------------- Gente beneficiada del primer periodo ----------------- */}
            <div className="formData__block">
                <label className="formData__label" htmlFor="p_3_people">Cantidad de personas beneficiadas en el 3er periodo</label>
                <Input
                    value={values.p_3_people}
                    name={'p_3_people'}
                    type={'text'}
                    handleChange={handleChange}>
                </Input>
            </div>
            <ul className='validationList'>
                {validations.p_3_people === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Existen campos vacíos</p>
                    </div>
                ) : null}
            </ul>

            {/*  ----------------- Validar fin del servicio social ----------------- */}
            <div className="formData__group">
                <div className="formData__block">
                    <label className="formData__label" htmlFor="fp_d">Dia de finalización</label>
                    <Input
                        value={values.fp_d}
                        name={'fp_d'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
                <div className="formData__block">
                    <label htmlFor="fp_m" className="formData__label">Mes de finalización</label>
                    <select className="formData__select" name="fp_m" id="fp_m" value={values.fp_m} onChange={handleChange}>
                        {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                        {months.map((_elem, index) => {
                            return <option key={index + 1} value={_elem}>{_elem}</option>
                        })}
                    </select>
                </div>
                <div className="formData__block">
                    <label htmlFor="fp_y" className="formData__label">Año de finalización</label>
                    <Input
                        value={values.fp_y}
                        name={'fp_y'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>
            </div>
            <ul className='validationList'>
                {validations.fp_d === false || validations.fp_m === false || validations.fp_y === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Existen campos vacíos</p>
                    </div>
                ) : null}
            </ul>

            <div className={`dropdown`}>
                {/* ${!validations.bimester ? 'disabled' : ''} */}
                <a className={`btn btn-secondary dropdown-toggle ${!validationsCompleted ? 'disabled' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Descargar
                </a>

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'pdf', auth, {...values})}>PDF</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'docx', auth, {...values})}>DOCX</a></li>
                </ul>
            </div>
            <input type="button" value="Guardar" className={`btn btn__save btn__save--file`} onClick={() => submitData(auth, values, componentName, serverDomain)} />
        </>
    )
}

export default PlanTrabajo