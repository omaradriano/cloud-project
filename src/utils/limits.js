// Funciones para validar los campos input NUMBER
// Evita que se usen las flechas del teclado arriba y abajo
export const handleKeyDown = (event) => {
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
        console.log(event.key);
        event.preventDefault();
    }
};
// Elimina los valores euler (o sea la letra 'e') //De momento hay un error aqui por que en ninguno de los campos se puede usar la "e"
export function deleteEulerLetter(evnt){
    let prevValue = evnt.target.value
    console.log(prevValue);
    if(evnt.key === 'e') evnt.target.value = evnt.target.value.replace(/[eE]/g,prevValue)
    evnt.preventDefault()
}