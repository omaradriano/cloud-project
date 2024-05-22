import { useEffect, useState } from "react";
import { generateDocument, handleValidations, submitData, validateAll } from "../../utils/forms_functions";
import Input from "../Components/Input";
import { months } from "../../utils/some_aux";
import { serverDomain } from "../../config";
import Icon from "../../UtilComponents/Icon";

const FormularioSolicitud = ({ stateFunction, componentName, auth }) => {

    //Valores que se utilizan en  el formulario de autoevaluacion cualitativa
    const [values, setValues] = useState({
        service_period: '',
        service_year: '',
        service_sem: '1',
        modality: '',
        activities: '',
        activity_type: ''

    })

    let program_typeOptions = {
        t_1: '',
        t_2: '',
        t_3: '',
        t_4: '',
        t_5: '',
        t_6: '',
        t_7: '',
        t_8: '',
        t_9: ''
    }

    const [validationsCompleted, setValidationsCompleted] = useState(false)

    function program_typeOnChange(selectedValue) {
        let program_typeOptionsKeys = Object.keys(program_typeOptions)
        program_typeOptionsKeys.forEach(elem => {
            program_typeOptions[elem] = ''
        })
        program_typeOptions[selectedValue] = 'x'

        // console.log(program_typeOptions);
    }

    // Función para manejar el cambio de valor del grupo de radios
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setValues(prev => ({ ...prev, activity_type: event.target.value }))
    };

    const [validations, setValidations] = useState({
        service_period: null,
        service_year: null,
        service_sem: null,
        modality: null,
        activities: null,
        activity_type: null
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
        program_typeOnChange(values.activity_type)
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
        if (values) handleValidations(validations, setValidations, values)
        // console.log(isChecked);
    }, [values])

    return (
        <>
            <p>Formulario de solicitud</p>
            {/*  ----------------- Periodo ----------------- */}
            <input type="button" value="Guardar" className={`btn btn__save btn__save--file`} onClick={() => submitData(auth, values, componentName, serverDomain)} />

            <div className="formData__block">
                <label className="formData__label" htmlFor="service_period">Periodo</label>
                <select className="formData__select" name="service_period" id="service_period" value={values.service_period} onChange={handleChange}>
                    <option value={''}>Selecciona una opcion</option>
                    {/* Renderiza los semestres en el SELECT */}
                    <option value={'ENERO-JUNIO'}>ENERO-JUNIO</option>
                    <option value={'AGOSTO-DICIEMBRE'}>AGOSTO-DICIEMBRE</option>
                </select>
            </div>
            <ul className='validationList'>
                {validations.service_period === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            <div className="formData__group">
                {/*  ----------------- Año de realizacion de servicio ----------------- */}
                <div className="formData__block">
                    <label className="formData__label" htmlFor="service_year">Año de realización de servicio</label>
                    <Input
                        value={values.service_year}
                        name={'service_year'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                </div>

                {/*  ----------------- Semestre de realizacion de servicio social ----------------- */}
                <div className="formData__block">
                    <label className="formData__label" htmlFor="service_sem">Semestre de realización de servicio</label>
                    <select className="formData__select" name="service_sem" id="service_sem" value={values.service_sem} onChange={handleChange}>
                        {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                        {months.map((_elem, index) => {
                            return <option key={index + 1} value={index + 1}>{index + 1}</option>
                        })}
                    </select>
                </div>
            </div>
            <ul className='validationList'>
                {validations.service_sem === false || validations.service_year === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            {/*  ----------------- Actividades a realizar a lo largo del servicio social ----------------- */}
            <div className="formData__block">
                <label htmlFor="activities" className="formData__label">Actividades a realizar en el periodo</label>
                <textarea onChange={handleChange} name="activities" id="activities" maxLength={500} value={values.activities}></textarea>
            </div>
            <ul className='validationList'>
                {validations.activities === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            {/*  ----------------- Modalidad ----------------- */}
            <div className="formData__block">
                <label className="formData__label" htmlFor="modality">Modalidad</label>
                <select className="formData__select" name="modality" id="modality" value={values.modality} onChange={handleChange}>
                    <option value={''}>Selecciona una opcion</option>
                    {/* Renderiza los semestres en el SELECT */}
                    <option value={'INTERNA'}>INTERNA</option>
                    <option value={'EXTERNA'}>EXTERNA</option>
                </select>
            </div>
            <ul className='validationList'>
                {validations.modality === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            <div className="formData__group--list">
                <label className="formData__label">Tipo de programa</label>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_1"
                        id="t_1"
                        value="t_1"
                        checked={values.activity_type === 't_1'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_1">
                        Educacion para adultos
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_2"
                        id="t_2"
                        value="t_2"
                        checked={values.activity_type === 't_2'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_2">
                        Actividades cívicas
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_3"
                        id="t_3"
                        value="t_3"
                        checked={values.activity_type === 't_3'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_3">
                        Desarrollo sustentable
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_4"
                        id="t_4"
                        value="t_4"
                        checked={values.activity_type === 't_4'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_4">
                        Desarrollo de comunidad
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_5"
                        id="t_5"
                        value="t_5"
                        checked={values.activity_type === 't_5'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_5">
                        Actividades culturales
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_6"
                        id="t_6"
                        value="t_6"
                        checked={values.activity_type === 't_6'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_6">
                        Apoyo a la salud
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_7"
                        id="t_7"
                        value="t_7"
                        checked={values.activity_type === 't_7'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_7">
                        Actividades deportivas
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_8"
                        id="t_8"
                        value="t_8"
                        checked={values.activity_type === 't_8'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_8">
                        Medio ambiente
                    </label>
                </div>
                <div className="formData__block formData__block--list">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="t_9"
                        id="t_9"
                        value="t_9"
                        checked={values.activity_type === 't_9'}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor="t_9">
                        Otros
                    </label>
                </div>
            </div>
            <ul className='validationList'>
                {validations.activity_type === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Selecciona una opción</p>
                    </div>
                ) : null}
            </ul>

            <div className={`dropdown`}>
                <a className={`btn btn-secondary dropdown-toggle ${!validationsCompleted ? 'disabled' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Descargar
                </a>

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'pdf', auth, { ...values, ...program_typeOptions })}>PDF</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'docx', auth, { ...values, ...program_typeOptions })}>DOCX</a></li>
                </ul>
            </div>
        </>
    )
}

export default FormularioSolicitud