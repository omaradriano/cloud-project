import { useContext, useEffect, useState } from "react";
import { generateDocument, handleValidations, validateAll } from "../../utils/forms_functions";
import Icon from "../../UtilComponents/Icon";
import Input from "../Components/Input";
import { AuthContext } from "../../Context/Context";

const CartaAsignacion = ({ stateFunction, componentName, auth, validationsCompleted }) => {

    //Importar contexto de autenticacion
    const { authentication } = useContext(AuthContext)

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
        console.log(values);
        console.log('Validations ', validations);
        // isChecked ? setValues(prev => ({...prev, isFinal: 'x'})) :setValues(prev => ({...prev, isFinal: ''}))
        validateAll(validations) ? stateFunction(true) : stateFunction(false);
    }, [values, validations])

    useEffect(() => {
        handleValidations(validations, setValidations, values)
        // console.log(isChecked);
    }, [values])

    useEffect(() => {
        let fileData = JSON.parse(localStorage.getItem('generalUserData')).files[componentName]
        setValues(fileData)
    }, [])

    //Carga los datos a la base de datos y guarda un objeto en localStorage
    function submitData() {
        if (authentication) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: authentication.email, ...values })
                // , name: values.name.split(' ').slice(2,).concat(values.name.split(' ').slice(0,2))
            }

            // let userData = JSON.parse(localStorage.getItem('generalUserData'))
            // localStorage.setItem('generalUserData', JSON.stringify({ email: authentication.email, ...values }))

            fetch(`http://127.0.0.1:5006/data/updateUserFile/${componentName}`, options)
                .then(res => res.json())
                .then(res => console.log(res))
        } else {
            console.log('No existe autenticacion, no se pueden enviar los datos');
        }
    }

    return (
        <>
            <h5>Carta de Asignación</h5>
            <div className="formData__block">
                <Input maxLength={35} label={'Creditos aprobados'} name={'credits'} type={'text'} value={values.credits} key={'credits'} handleChange={handleChange}></Input>
            </div>
            <ul className='validationList'>
                {values.credits === '' ? (
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

            <h6>Actividades a desarrollar</h6>
            <Input label={'Actividad 1'} type={'text'} name={'act_1'} value={values.act_1} handleChange={handleChange} maxlength={35}></Input>
            <Input label={'Actividad 2'} type={'text'} name={'act_2'} value={values.act_2} handleChange={handleChange} maxlength={35}></Input>
            <Input label={'Actividad 3'} type={'text'} name={'act_3'} value={values.act_3} handleChange={handleChange} maxlength={35}></Input>
            <Input label={'Actividad 4'} type={'text'} name={'act_4'} value={values.act_4} handleChange={handleChange} maxlength={35}></Input>
            <Input label={'Actividad 5'} type={'text'} name={'act_5'} value={values.act_5} handleChange={handleChange} maxlength={35}></Input>

            <h6>Tipo de actividad a desarrollar</h6>
            <div className="formData__block formData__block--list">
                <input className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault1" value='act_t_1' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    TECNICAS
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault2" value='act_t_2' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    ASESORIA
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault3" value='act_t_3' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                    INVESTIGACION
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault4" value='act_t_4' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault4">
                    DOCENTES
                </label>
            </div>
            <div className="formData__block formData__block--list">
                <input className="form-check-input" type="radio" name="activity_type" id="flexRadioDefault5" value='act_t_5' onChange={handleChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault5">
                    OTRAS
                </label>
            </div>

            <label htmlFor="activity_type"></label>
            <div className={`dropdown`}>
                <a className={`btn btn-secondary dropdown-toggle ${!validationsCompleted ? 'disabled' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Descargar
                </a>

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => {
                        submitData()
                        let checkOptions = {
                            act_t_1: '',
                            act_t_2: '',
                            act_t_3: '',
                            act_t_4: '',
                            act_t_5: '',
                        }
                        let temporal = { ...values }
                        switch (temporal.activity_type) {
                            case 'act_t_1':
                                checkOptions.act_t_1 = 'x'
                                break
                            case 'act_t_2':
                                checkOptions.act_t_2 = 'x'
                                break
                            case 'act_t_3':
                                checkOptions.act_t_3 = 'x'
                                break
                            case 'act_t_4':
                                checkOptions.act_t_4 = 'x'
                                break
                            case 'act_t_5':
                                checkOptions.act_t_5 = 'x'
                                break
                        }
                        generateDocument(componentName, 'pdf', auth, { ...temporal, ...checkOptions })
                    }}>PDF</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => {
                        submitData()
                        let checkOptions = {
                            act_t_1: '',
                            act_t_2: '',
                            act_t_3: '',
                            act_t_4: '',
                            act_t_5: '',
                        }
                        let temporal = { ...values }
                        switch (temporal.activity_type) {
                            case 'act_t_1':
                                checkOptions.act_t_1 = 'x'
                                break
                            case 'act_t_2':
                                checkOptions.act_t_2 = 'x'
                                break
                            case 'act_t_3':
                                checkOptions.act_t_3 = 'x'
                                break
                            case 'act_t_4':
                                checkOptions.act_t_4 = 'x'
                                break
                            case 'act_t_5':
                                checkOptions.act_t_5 = 'x'
                                break
                        }
                        generateDocument(componentName, 'docx', auth, { ...values, ...checkOptions })
                    }}>DOCX</a></li>
                </ul>
            </div>
        </>
    )
}

export default CartaAsignacion