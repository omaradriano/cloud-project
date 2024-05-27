import { useContext, useEffect, useState } from "react";
import { generateDocument, handleValidations, submitData, validateAll } from "../../utils/forms_functions";
import Icon from "../../UtilComponents/Icon";
import Input from "../Components/Input";
import { AuthContext } from "../../Context/Context";
import { serverDomain } from "../../config";
import InputRadios from "../Components/InputRadios";
import InputText from "../Components/InputText";
import InputTextarea from "../Components/InputTextarea";

const CartaAsignacion = ({ componentName, auth }) => {

    let checkOptions = {
        act_t_1: '',
        act_t_2: '',
        act_t_3: '',
        act_t_4: '',
        act_t_5: '',
    }

    const [validationsCompleted, setValidationsCompleted] = useState(false)

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
        console.log(values);
        console.log('Validations ', validations);
        // isChecked ? setValues(prev => ({...prev, isFinal: 'x'})) :setValues(prev => ({...prev, isFinal: ''}))
        checkOptionsOnChange(values.activity_type)
        validateAll(validations) ? setValidationsCompleted(true) : setValidationsCompleted(false);
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
            if (fileData.files[componentName]) {
                setValues({ ...fileData.files[componentName] })
            }
        }
    }, [])

    return (
        <>
            <h5>Carta de Asignación</h5>
            <input type="button" value="Guardar" className={`btn btn__save btn__save--file`} onClick={() => submitData(auth, values, componentName, serverDomain)} />

            {/* Creditos aprobados */}
            <InputText
                handleChange={handleChange}
                label={'Creditos aprobados'}
                name={'credits'}
                placeholder='Ej. 172'
                value={values.credits}
                completed={validations.credits}
                popover={true}
                popoverText="Cantidad de creditos cursados + cantidad de creditos en el semestre. Ej. 170 acumulados + 22 semestre actual"
            />

            {/* Objetivo de la realizacion del servicio */}
            <InputTextarea
                handleChange={handleChange}
                label={'Objetivo'}
                maxLength={350}
                name={'objetive'}
                placeholder={'Objetivo de la realización del servicio social'}
                value={values.objetive}
                completed={validations.objetive}
                popover={true}
                popoverText="Indicar el objetivo del programa de servicio social a desarrollar en la dependencia u organismo"
            />


            <h5>Actividades a desarrollar</h5>
            {/* {[{ description: 'Actividad 1', name: 'act_1' }]} */}
            {Array.from({ length: 5 }, (_, index) => {
                return index + 1
            }).map((elem) => {
                return <InputText
                    key={elem}
                    handleChange={handleChange}
                    label={`Actividad ${elem}`}
                    name={`act_${elem}`}
                    placeholder={`Ej. de actividad ${elem}`}
                    value={values[`act_${elem}`]}
                    completed={validations[`act_${elem}`]}
                />
            })}

            {/* Tipo de actividad a desarrollar */}
            <InputRadios
                handleChange={handleChange}
                label={'Tipo de actividad a desarrollar'}
                name={'activity_type'}
                value={values.activity_type}
                completed={validations.activity_type}
                options={
                    {
                        optionValues: ['TÉCNICAS', 'ASESORIA', 'INVESTIGACION', 'DOCENTES', 'OTRAS'],
                        optionKeys: ['act_t_1', 'act_t_2', 'act_t_3', 'act_t_4', 'act_t_5',]
                    }}
                popover={true}
                popoverText="Tipo de actividad a desarrollar durante el servicio social"
            />

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