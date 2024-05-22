import { useContext, useEffect, useState } from "react";
import { generateDocument, handleValidations, submitData, validateAll } from "../../utils/forms_functions";
import Icon from "../../UtilComponents/Icon";
import Input from "../Components/Input";
import { AuthContext } from "../../Context/Context";
import { serverDomain } from "../../config";

const CartaAsignacion = ({ stateFunction, componentName, auth, validationsCompleted }) => {

    let checkOptions = {
        act_t_1: '',
        act_t_2: '',
        act_t_3: '',
        act_t_4: '',
        act_t_5: '',
    }

    function checkOptionsOnChange(selectedValue) {
        let checkOptionsKeys = Object.keys(checkOptions)
        checkOptionsKeys.forEach(elem => {
            checkOptions[elem] = ''
        })
        checkOptions[selectedValue] = 'x'

        // console.log(checkOptions);
    }

    //Valores que se utilizan en  el formulario de autoevaluacion cualitativa
    const [values, setValues] = useState({
        credits: '',
        objetive: '',
        act_1: '',
        act_2: '',
        act_3: '',
        act_4: '',
        act_5: '',
        activity_type: ''
    })

    // const [activity_type, setActivity_type] = useState()

    const [validations, setValidations] = useState({
        credits: null,
        objetive: null,
        act_1: null,
        act_2: null,
        act_3: null,
        act_4: null,
        act_5: null,
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
        // isChecked ? setValues(prev => ({...prev, isFinal: 'x'})) :setValues(prev => ({...prev, isFinal: ''}))
        checkOptionsOnChange(values.activity_type)
        validateAll(validations) ? stateFunction(true) : stateFunction(false);
    }, [values, validations])

    useEffect(() => {
        handleValidations(validations, setValidations, values)
        // console.log(isChecked);
    }, [values])

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

    return (
        <>
            <h5>Carta de Asignación</h5>
            <input type="button" value="Guardar" className={`btn btn__save btn__save--file`} onClick={() => submitData(auth, values, componentName, serverDomain)} />
            <div className="formData__block">
                <Input maxLength={35} label={'Creditos aprobados'} name={'credits'} type={'text'} value={values.credits} key={'credits'} handleChange={handleChange}></Input>
            </div>
            <ul className='validationList'>
                {validations.credits === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Ingrese cantidad de creditos</p>
                    </div>
                ) : null}
            </ul>

            <div className="formData__block">
                <label htmlFor="objetive" className="formData__label">Objetivo</label>
                <textarea onChange={handleChange} name="objetive" id="objetive" maxLength={350} value={values.objetive}></textarea>
            </div>
            <ul className='validationList'>
                {validations.objetive === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            <h6>Actividades a desarrollar</h6>
            <Input label={'Actividad 1'} type={'text'} name={'act_1'} value={values.act_1} handleChange={handleChange} maxlength={35}></Input>
            <ul className='validationList'>
                {validations.act_1 === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            <Input label={'Actividad 2'} type={'text'} name={'act_2'} value={values.act_2} handleChange={handleChange} maxlength={35}></Input>
            <ul className='validationList'>
                {validations.act_2 === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>
            <Input label={'Actividad 3'} type={'text'} name={'act_3'} value={values.act_3} handleChange={handleChange} maxlength={35}></Input>
            <ul className='validationList'>
                {validations.act_3 === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>
            <Input label={'Actividad 4'} type={'text'} name={'act_4'} value={values.act_4} handleChange={handleChange} maxlength={35}></Input>
            <ul className='validationList'>
                {validations.act_4 === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>
            <Input label={'Actividad 5'} type={'text'} name={'act_5'} value={values.act_5} handleChange={handleChange} maxlength={35}></Input>
            <ul className='validationList'>
                {validations.act_5 === false ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Campo vacío</p>
                    </div>
                ) : null}
            </ul>

            <h6>Tipo de actividad a desarrollar</h6>
            <div className="formData__block formData__block--list">
                <input checked={values.activity_type === 'act_t_1'} className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault1" value='act_t_1' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    TECNICAS
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input checked={values.activity_type === 'act_t_2'} className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault2" value='act_t_2' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    ASESORIA
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input checked={values.activity_type === 'act_t_3'} className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault3" value='act_t_3' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                    INVESTIGACION
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input checked={values.activity_type === 'act_t_4'} className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault4" value='act_t_4' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault4">
                    DOCENTES
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input checked={values.activity_type === 'act_t_5'} className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault5" value='act_t_5' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault5">
                    OTRAS
                </label>
            </div>
            <ul className='validationList'>
                {Object.keys(checkOptions).some(elem => { checkOptions[elem].length > 0 }) ? (
                    <div className="validationList__item">
                        <Icon icon={'warning'} customIconClassName='warning'></Icon>
                        <p>Seleciona una opción</p>
                    </div>
                ) : null}
            </ul>

            <div className={`dropdown`}>
                <a className={`btn btn-secondary dropdown-toggle ${!validationsCompleted ? 'disabled' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Descargar
                </a>

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => {
                        generateDocument(componentName, 'pdf', auth, { ...temporal, ...checkOptions })
                    }}>PDF</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => {
                        generateDocument(componentName, 'docx', auth, { ...values, ...checkOptions })
                    }}>DOCX</a></li>
                </ul>
            </div>
        </>
    )
}

export default CartaAsignacion