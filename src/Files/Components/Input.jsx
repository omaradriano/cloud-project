
// Este componente se usa UNICAMENTE para los input tipo number y text

const Input = ({label, name, type, value, handleChange = ()=>{}, maxlength}) => {

    // Funciones para validar los campos input NUMBER
    // Evita que se usen las flechas del teclado arriba y abajo
    const handleKeyDown = (event) => {
        if (type === 'number' && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            // console.log(event.key);
            event.preventDefault();
        }
    };
    // Elimina los valores euler (o sea la letra 'e') 
    //Esta funcion no funciona como deberia y borra el contenido de todo el input cuando se ingresa una e
    function deleteEulerLetter(event) {
        const input = event.target;
        input.value = input.value.replace(/[eE]/g, '');
    }

    return (
        <>
            <div className="formData__block">
                <label className="formData__label" htmlFor={name}>{label}</label>
                <input 
                    onChange={handleChange} 
                    value={value || ''} 
                    onKeyDown={type === 'number' ? handleKeyDown : ()=>{}} 
                    onInput={type === 'number' ? deleteEulerLetter : ()=>{}} 
                    className="formData__input" 
                    name={name}
                    id={name} 
                    type={type} 
                    maxLength={maxlength}/>
            </div>
        </>
    )
}

export default Input