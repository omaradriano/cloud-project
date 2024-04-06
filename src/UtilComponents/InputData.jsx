import Icon from './Icon';

/**
 * Este componente se usa para validación de datos en formularios
 * @component
 * @param {string} name - Nombre que se le da al atributo htmlFor del label y al id del input
 * @param {string} inputType - Tipo de dato que se va a manejar en el input
 * @param {string} labelContent - Texto que se va a mostrar en el label
 * 
 * Datos de la validación
 * @param {function} validationFunction - Función (aún no se si callback) para generar la validacion 
 * De manera implicita si el componente cuenta con una validationFunction se entiende que necesita cumplir una validacion
 */

const InputData = ({ name, inputType = 'text', labelContent = 'Label de prueba', validationFunction = undefined, isValidationCompleted }) => {

    // Funciones para validar los campos input NUMBER
    // Evita que se usen las flechas del teclado arriba y abajo
    const handleKeyDown = (event) => {
        if (inputType === 'number' && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            event.preventDefault();
        }
    };
    // Elimina los valores euler (o sea la letra 'e') //De momento hay un error aqui por que en ninguno de los campos se puede usar la "e"
    function deleteEulerLetter(event) {
        const input = event.target;
        input.value = input.value.replace(/[eE]/g, '');
    }

    return (
        <>
            {/* <div className={`inputData ${(focus && popover) ? 'activeInput' : ''}`}> */}
            <div className={`inputData`}>
                <label className="inputData__label" htmlFor={name}>{labelContent}</label>
                <div className="inputData__validation">
                    {
                        inputType === 'password' ? (
                            <input onInput={deleteEulerLetter} onChange={validationFunction} inputMode="none" onKeyDown={handleKeyDown} className="inputData__input" type={inputType} id={name} />

                        ) : (
                            <input onChange={validationFunction} inputMode="none" onKeyDown={handleKeyDown} className="inputData__input" type={inputType} id={name} />
                        )
                    }
                    {validationFunction !== null ? (
                        <span className={`validationIcon ${isValidationCompleted ? 'validationOK' : 'validationERR'}`}>
                            <Icon icon={`${isValidationCompleted ? 'check_circle' : 'cancel'}`}></Icon>
                        </span>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default InputData