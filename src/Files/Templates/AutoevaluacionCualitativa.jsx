import { useEffect, useState } from "react"
import Icon from "../../UtilComponents/Icon"
import { generateDocument, handleValidations, validateAll } from "../../utils/forms_functions"
import InputSelect from "../Components/InputSelect"
import InputCheckbox from "../Components/InputCheckbox"

const AutoevaluacionCualitativa = ({ stateFunction, componentName, auth }) => {

    //Valores que se utilizan en  el formulario de autoevaluacion cualitativa
    const [values, setValues] = useState({
        bimester: '',
    })

    const semesterCounter = [1, 2, 3, 4, 5]

    //Verificar el checkbox Final?
    const [isChecked, setIsChecked] = useState(false);

    const [validations, setValidations] = useState({
        bimester: null,
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
        validateAll(validations) ? stateFunction(true) : stateFunction(false);
    }, [values, validations])

    useEffect(() => {
        handleValidations(validations, setValidations, values)
        // console.log(isChecked);
    }, [values, isChecked])

    // Función para manejar el cambio de estado del checkbox
    const handleCheckboxChange = (event) => {
        isChecked ? setValues(prev => ({ ...prev, isFinal: 'x' })) : setValues(prev => ({ ...prev, isFinal: '' }))
        setIsChecked(event.target.checked);
    };

    return (
        <>
            <InputSelect
                handleChange={handleChange}
                label={'Bimestre de la evaluacion'}
                name={'bimester'}
                renderArray={semesterCounter.map((elem) => {
                    return <option key={String(elem)} value={String(elem)}>{String(elem)}</option>
                })}
                value={values.bimester}
                completed={validations.bimester}
                popover={true}
                popoverText="Este es el bimestre actual de la evaluacion"
            />

            {/* Evaluacion final? */}
            <InputCheckbox
                handleChange={handleCheckboxChange}
                label='Es esta la ultima evaluacion?'
                popover={true}
                popoverText="Indicación si es la ultima evaluación"
                isChecked={isChecked}
            />
            <div className={`dropdown`}>
                <a className={`btn btn-secondary dropdown-toggle ${!validations.bimester ? 'disabled' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Descargar
                </a>

                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'pdf', auth, { ...values, isFinal: isChecked ? 'x' : '' })}>PDF</a></li>
                    <li><a className="dropdown-item" href="#" onClick={() => generateDocument(componentName, 'docx', auth, { ...values, isFinal: isChecked ? 'x' : '' })}>DOCX</a></li>
                </ul>
            </div>
        </>
    )
}

export default AutoevaluacionCualitativa