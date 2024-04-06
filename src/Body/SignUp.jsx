import { useEffect, useState } from "react";
import { careers } from "../../utils/files"
import InputData from './../Reusables/InputData';

const keys = Object.keys(careers);

const SignUp = () => {

    const [tel_home, setTel_home] = useState(false)
    const [tel_cel, setTel_cel] = useState(false)
    const [n_control, setN_control] = useState(false)
    const [password, setPassword] = useState(false)
    const [passwordData, setPasswordData] = useState('')
    const [repeatPassword, setRepeatPassword] = useState(false)
    const [repeatPasswordData, setRepeatPasswordData] = useState('')

    // Validacion para el numero de telefono de casa
    function validate_tel_home(e) {
        try {
            if (e.target.value.length < 10) throw new Error('Almenos 10 digitos en tel home')
            setTel_home(true)
        } catch (error) {
            setTel_home(false)
            console.log(error.message)
        }
    }
    // Validacion para el numero de telefono celular
    function validate_tel_cel(e) {
        try {
            if (e.target.value.length < 10) throw new Error('Almenos 10 digitos en tel cel')
            setTel_cel(true)
        } catch (error) {
            setTel_cel(false)
            console.log(error.message)
        }
    }
    // Valida el numero de control cuente con almenos 8 digitos
    function validate_n_control(e) {
        try {
            if (e.target.value.length < 8) throw new Error('Almenos 8 digitos en n_control')
            setN_control(true)
        } catch (error) {
            setN_control(false)
            console.log(error.message)
        }
    }

    // Validaciones de contrasena
    function validate_password(e) {
        let regCapitalLetters = /[A-Z]/g
        let regNumbers = /[0-9]/g
        try {
            if (!regCapitalLetters.test(e.target.value)) throw new Error('Debe de tener almenos una letra mayuscula')
            if (e.target.value.length < 8) throw new Error('La contrasena debe de tener almenos 8 caracteres')
            if (!regNumbers.test(e.target.value)) throw new Error('Debe de tener almenos un numero')
            setPassword(true)
        } catch (error) {
            setPassword(false)
            console.log(error.message)
        }
        setPasswordData(e.target.value)
    }

    // Validaciones de repetir contrasena (Deben de ser iguales)
    function validate_repeat_password(e) {
        try {
            console.log(e.target.value)
            console.log(passwordData)
            if (e.target.value !== passwordData) throw new Error('Las contrasenas no coinciden')
            setRepeatPassword(true)
        } catch (error) {
            setRepeatPassword(false)
            console.log(error.message)
        }
        setRepeatPasswordData(e.target.value)
    }
    // Este useEffect viene con la validacion de las contrasenas para que sean iguales
    useEffect(() => {
        console.log(passwordData,' ',repeatPasswordData)
        if(passwordData !== repeatPasswordData){
            setRepeatPassword(false)
        }else if(repeatPasswordData.length === 0){
            setRepeatPassword(false)
        }else{
            setRepeatPassword(true)
        }
    }, [passwordData, repeatPasswordData]);

    return (
        <>
            <form className="signup">
                <h3>Registro de usuario</h3>
                {/* <InputData name={'codigo'} key={'codigo'} labelContent={'Ingresar un codigo'} inputType={'text'} isValidationCompleted={test} validationFunction={testValidation}/> */}
                {/* Nombre */}
                <div className="inputData">
                    <label className="inputData__label" htmlFor="name">Nombre</label>
                    <input className="inputData__input" type="text" id="name" />
                </div>
                {/* Numero de casa */}
                <InputData name='tel_house' key='tel_casa' labelContent='Telefono de casa' inputType='number' isValidationCompleted={tel_home} validationFunction={validate_tel_home} />
                {/* Numero celular */}
                <InputData name='tel_cel' key='tel_cel' labelContent='Telefono celular' inputType='number' isValidationCompleted={tel_cel} validationFunction={validate_tel_cel} />
                {/* Address o domicilio */}
                <div className="inputData">
                    <label className="inputData__label" htmlFor="address">Domicilio</label>
                    <input className="inputData__input" type="text" id="address" placeholder="Calle, número y colonia" />
                </div>
                {/* Numero de control */}
                <InputData name='n_control' key='n_control' labelContent='Numero de control' inputType='text' isValidationCompleted={n_control} validationFunction={validate_n_control} />
                {/* Genero */}
                <div className="inputData">
                    <label className="inputData__label" htmlFor="gender">Genero</label>
                    <select className="inputData__select" name="gender" id="gender" defaultValue={'unselect'}>
                        <option value="unselect">Selecciona una opcion</option>
                        <option value="h">Hombre</option> {/** h: hombre, m:mujer, i:prefiero no especificar */}
                        <option value="m">Mujer</option>
                        <option value="i">Prefiero no especificar</option>
                    </select>
                </div>
                {/* Carrera */}
                <div className="inputData">
                    <label className="inputData__label" htmlFor="career">Carrera</label>
                    <select className="inputData__select" name="career" id="career">
                        {keys.map((_elem, index) => {
                            return <option key={keys[index]} value={keys[index]}>{careers[keys[index]]}</option>
                        })}
                    </select>
                </div>
                {/* Contrasena */}
                <InputData name='password' key='password' labelContent='Contrasena' inputType='text' isValidationCompleted={password} validationFunction={validate_password} />
                {/* Repite contrasena */}
                <InputData name='repeatpassword' key='repeatpassword' labelContent='Repite contrasena' inputType='text' isValidationCompleted={repeatPassword} validationFunction={validate_repeat_password} />
                {/* Boton para enviar datos */}
                <input disabled type="button" value="Registrar" className="btn btn__signup" />
            </form>
        </>
    )
}

export default SignUp