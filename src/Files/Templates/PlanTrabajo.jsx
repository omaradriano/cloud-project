import { useEffect, useState } from "react"
import { generateDocument, handleValidations, submitData, validateAll } from "../../utils/forms_functions"
import Input from "../Components/Input"
import { months } from "../../utils/some_aux"
import Icon from "../../UtilComponents/Icon"
import { serverDomain } from "../../config"
import InputSelect from "../Components/InputSelect"
import InputTextarea from "../Components/InputTextarea"
import InputText from "../Components/InputText"

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
            {/*  ----------------- Validar primer periodo ----------------- */}
            <div className="formdata__group mb-5p">
                <h4>Primer periodo</h4>
                <div className="formdata__options">
                    <InputSelect
                        handleChange={handleChange}
                        label={'Dia de inicio'}
                        name={'p_1_d'}
                        renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_1_d}
                        completed={validations.p_1_d}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Mes de inicio'}
                        name={'p_1_m'}
                        renderArray={months.map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_1_m}
                        completed={validations.p_1_m}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Año de inicio'}
                        name={'p_1_y'}
                        renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_1_y}
                        completed={validations.p_1_y}
                    />
                </div>
            </div>
            {/*  ----------------- Actividades del primer periodo ----------------- */}
            <InputTextarea
                handleChange={handleChange}
                label='Actividades a realizar en el periodo'
                maxLength={150}
                name='p_1_activities'
                placeholder={'Ej. descripción de actividades'}
                value={values.p_1_activities}
                completed={validations.p_1_activities}
            />
            {/*  ----------------- Gente beneficiada del primer periodo ----------------- */}
            <InputText
                handleChange={handleChange}
                label='Personas beneficiadas'
                name={'p_1_people'}
                placeholder={'Ej. 126'}
                value={values.p_1_people}
                completed={validations.p_1_people}
                popover={true}
                popoverText="Cantidad de personas que son beneficiadas gracias a las acciones del prestador de servicio social"
            />


            {/*  ----------------- Validar segundo periodo ----------------- */}
            <div className="formdata__group mb-5p">
                <h4>Segundo periodo</h4>
                <div className="formdata__options">
                    <InputSelect
                        handleChange={handleChange}
                        label={'Dia de inicio'}
                        name={'p_2_d'}
                        renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_2_d}
                        completed={validations.p_2_d}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Mes de inicio'}
                        name={'p_2_m'}
                        renderArray={months.map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_2_m}
                        completed={validations.p_2_m}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Año de inicio'}
                        name={'p_2_y'}
                        renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_2_y}
                        completed={validations.p_2_y}
                    />
                </div>
            </div>
            {/*  ----------------- Actividades del segundo periodo ----------------- */}
            <InputTextarea
                handleChange={handleChange}
                label='Actividades a realizar en el periodo'
                maxLength={150}
                name='p_2_activities'
                placeholder={'Ej. descripción de actividades'}
                value={values.p_2_activities}
                completed={validations.p_2_activities}
            />
            {/*  ----------------- Gente beneficiada del segundo periodo ----------------- */}
            <InputText
                handleChange={handleChange}
                label='Personas beneficiadas'
                name={'p_2_people'}
                placeholder={'Ej. 126'}
                value={values.p_2_people}
                completed={validations.p_2_people}
                popover={true}
                popoverText="Cantidad de personas que son beneficiadas gracias a las acciones del prestador de servicio social"
            />



            {/*  ----------------- Validar tercer periodo ----------------- */}
            <div className="formdata__group mb-5p">
                <h4>Tercer periodo</h4>
                <div className="formdata__options">
                    <InputSelect
                        handleChange={handleChange}
                        label={'Dia de inicio'}
                        name={'p_3_d'}
                        renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_3_d}
                        completed={validations.p_3_d}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Mes de inicio'}
                        name={'p_3_m'}
                        renderArray={months.map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_3_m}
                        completed={validations.p_3_m}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Año de inicio'}
                        name={'p_3_y'}
                        renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.p_3_y}
                        completed={validations.p_3_y}
                    />
                </div>
            </div>
            {/*  ----------------- Actividades del tercer periodo ----------------- */}
            <InputTextarea
                handleChange={handleChange}
                label='Actividades a realizar en el periodo'
                maxLength={150}
                name='p_3_activities'
                placeholder={'Ej. descripción de actividades'}
                value={values.p_3_activities}
                completed={validations.p_3_activities}
            />
            {/*  ----------------- Gente beneficiada del tercer periodo ----------------- */}
            <InputText
                handleChange={handleChange}
                label='Personas beneficiadas'
                name={'p_3_people'}
                placeholder={'Ej. 126'}
                value={values.p_3_people}
                completed={validations.p_3_people}
                popover={true}
                popoverText="Cantidad de personas que son beneficiadas gracias a las acciones del prestador de servicio social"
            />

            {/*  ----------------- Validar fin del servicio social ----------------- */}
            <div className="formdata__group mb-5p">
                <h4>Fin de servicio</h4>
                <div className="formdata__options">
                    <InputSelect
                        handleChange={handleChange}
                        label={'Dia de fin'}
                        name={'fp_d'}
                        renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.fp_d}
                        completed={validations.fp_d}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Mes de fin'}
                        name={'fp_m'}
                        renderArray={months.map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.fp_m}
                        completed={validations.fp_m}
                    />
                    <InputSelect
                        handleChange={handleChange}
                        label={'Año de fin'}
                        name={'fp_y'}
                        renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                            return <option key={index} value={elem}>{elem}</option>
                        })}
                        value={values.fp_y}
                        completed={validations.fp_y}
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
            <input type="button" value="Guardar" className={`btn btn__save btn__save--file`} onClick={() => submitData(auth, values, componentName, serverDomain)} />
        </>
    )
}

export default PlanTrabajo