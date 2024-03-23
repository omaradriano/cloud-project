import { useEffect, useState } from 'react'
import googleauthicon from '../../assets/icons/google-icon.png'
import outlookauthicon from '../../assets/icons/outlook-icon.png'
import Icon from '../Icon';

const Auth = () => {
    // state que maneja la opcion de autenticacion (signin y signup)
    const [authMode, setAuthMode] = useState('signup')
    //datos del formulario
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        repeatpassword: ''
    })
    
    //manejo de validaciones
    const [validations, setValidations] = useState({
        email: null,
        password_minlength: null,
        password_maxlength: null,
        password_capitalLetter: null,
        password_number: null,
        password_specialChar: null,
        password_match: null
    })

    //funcion para validar todo el objeto
    function validateAll(validations_obj) {
        let validate = true
        for (const key in validations_obj) {
            if (Object.hasOwnProperty.call(validations_obj, key)) {
                if (validations[key] === false) {
                    validate = false
                }
            }
        }
        return validate
    }

    //cambia el estado de activo e inactivo del boton de submiting auth
    const [submit, setSubmit] = useState(false)

    // state que maneja el cambio de los valores en los input
    function handleChange(evt) {
        const { target } = evt
        const { name, value } = target

        setFormValues({
            ...formValues,
            [name]: value.trim()
        })
    }

    // para poder tener el valor mas reciente
    useEffect(() => {
        // console.log(formValues);
        handleValidations()
    }, [formValues])

    // maneja los valores actualizados para habilitar y desabilitar el boton con el state 'submit'
    useEffect(() => {
        const allValid = validateAll(validations);
        if (allValid && !(formValues.password !== formValues.repeatpassword)) {
            setSubmit(true);
        } else {
            setSubmit(false);
        }
    }, [validations, formValues]);
    

    function handleSubmit(evt) {
        evt.preventDefault()
        //Aqui se va a hacer la validacion de forma asincrona con los datos del servidor
    }

    //maneja la validacion y muestra errores
    function handleValidations() {

        // Lógica de validación del email, etc.
        const regInstitucionalEmail = /L(B|C)?[0-9]{8}@chihuahua2.tecnm.mx/gi;
        const regEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
        const regCapitalLetter = /[A-Z]/g
        const regNumber = /[0-9]/g
        const regSpecialChar = /[\W_]/g

        //Verificar email
        if (regInstitucionalEmail.test(formValues.email) || regEmail.test(formValues.email)) {
            // console.log('Email correcto');
            setValidations(prev => ({ ...prev, email: true }))
        } else {
            // console.log('Email incorrecto');
            setValidations(prev => ({ ...prev, email: false }))
        }
        //No menos de 8 caracteres
        if (formValues.password.length < 8) {
            // console.log('Menos de 8');
            setValidations(prev => ({ ...prev, password_minlength: false }))
        } else {
            // console.log('Mas de 8');
            setValidations(prev => ({ ...prev, password_minlength: true }))
        }
        //No más de 16 caracteres
        if (formValues.password.length > 16) {
            // console.log('Mas de 16');
            setValidations(prev => ({ ...prev, password_maxlength: false }))
        } else {
            // console.log('Menos de 16');
            setValidations(prev => ({ ...prev, password_maxlength: true }))
        }
        //verificar que haya una letra mayuscula
        if (!regCapitalLetter.test(formValues.password)) {
            setValidations(prev => ({ ...prev, password_capitalLetter: false }))
        } else {
            setValidations(prev => ({ ...prev, password_capitalLetter: true }))
        }
        //verificar que haya un numero
        if (!regNumber.test(formValues.password)) {
            setValidations(prev => ({ ...prev, password_number: false }))
        } else {
            setValidations(prev => ({ ...prev, password_number: true }))
        }
        //verificar un caracter especial
        if (!regSpecialChar.test(formValues.password)) {
            setValidations(prev => ({ ...prev, password_specialChar: false }))
        } else {
            setValidations(prev => ({ ...prev, password_specialChar: true }))
        }
        //verificar que las contrasenas sean iguales
        if (authMode === 'signup' && formValues.password !== formValues.repeatpassword) {
            setValidations(prev => ({ ...prev, password_match: false }));
        } else {
            setValidations(prev => ({ ...prev, password_match: true }));
        }

        validateAll(validations) ? setSubmit(true) : setSubmit(false);
    }

    //cambia el modo de autenticacion para mostrar repeatpassword en caso de ser signup
    function toggleAuthMode(e) {
        setAuthMode(e.target.value.toLowerCase())
    }

    return (
        <>
            <div className="auth">
                <div className="auth__form">
                    <h2>Bienvenido Bisonte</h2>
                    <div className="auth__mode">
                        <input onClick={toggleAuthMode} className={`btn ${authMode === 'signup' ? 'auth__mode--active' : ''}`} type="button" value="SignUp" />
                        <input onClick={toggleAuthMode} className={`btn ${authMode === 'signin' ? 'auth__mode--active' : ''}`} type="button" value="SignIn" />
                    </div>
                    <div className="auth__inputContainer">
                        <input value={formValues.email} onChange={handleChange} name='email' className={`auth__input`} type="text" placeholder="Escribe tu correo" />
                        <ul className='validationList'>
                            {(validations.email === false && formValues.email.length !== 0) ? (
                                <div className="validationList__item">
                                    <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                    <p>Correo no valido</p>
                                </div>
                            ) : null}
                        </ul>
                    </div>
                    <div className="auth__inputContainer">
                        <input value={formValues.password} onChange={handleChange} name='password' className='auth__input' type="password" placeholder="Contrasena" />
                        <ul className='validationList'>
                            {(!validations.password_minlength && formValues.password.length !== 0) ? (
                                <div className="validationList__item">
                                    <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                    <p>Almenos 8 caracteres</p>
                                </div>
                            ) : null}
                            {(!validations.password_capitalLetter && formValues.password.length !== 0) ? (
                                <div className="validationList__item">
                                    <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                    <p>Almenos una letra mayúscula</p>
                                </div>
                            ) : null}
                            {(!validations.password_specialChar && formValues.password.length !== 0) ? (
                                <div className="validationList__item">
                                    <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                    <p>Almenos un caracter especial</p>
                                </div>
                            ) : null}
                            {(!validations.password_maxlength && formValues.password.length !== 0) ? (
                                <div className="validationList__item">
                                    <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                    <p>No más de 16 caracteres</p>
                                </div>
                            ) : null}
                            {(!validations.password_number && formValues.password.length !== 0) ? (
                                <div className="validationList__item">
                                    <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                    <p>Almenos un numero</p>
                                </div>
                            ) : null}
                            {/* <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                <p>Contraseña incorrecta</p>
                            </div> */}
                        </ul>
                    </div>
                    {authMode === 'signup' ? (
                        <div className="auth__inputContainer">
                            <input value={formValues.repeatpassword} onChange={handleChange} name='repeatpassword' className='auth__input' type="password" placeholder="Repite contrasena" />
                            <ul className='validationlist'>
                                {formValues.password !== formValues.repeatpassword ? (
                                    <div className="validationList__item">
                                        <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                                        <p>Las contraseñas no coinciden</p>
                                    </div>
                                ) : null}
                            </ul>
                        </div>
                    ) : null}
                    <input onClick={()=>console.log('Subiendo informacion')} disabled={!submit} className={`btn auth_confirm ${submit === false ? 'disabled' : null}`} type="button" value={`${authMode === 'signup' ? 'Sign Up' : 'Sign In'}`} />
                </div>
                <div className="auth__divider">
                    <div className="line"></div>
                    <p>O continua con</p>
                    <div className="line"></div>
                </div>
                <div className="auth__options">
                    <img src={googleauthicon} alt="Google auth icon" />
                    <img src={outlookauthicon} alt="Outlook auth icon" />
                </div>
            </div>
        </>
    )
}

export default Auth