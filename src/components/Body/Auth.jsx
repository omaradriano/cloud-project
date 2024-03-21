import { useState } from 'react'
import googleauthicon from '../../assets/icons/google-icon.png'
import outlookauthicon from '../../assets/icons/outlook-icon.png'

const Auth = () => {

    const [authMode, setAuthMode] = useState('signup')

    // function validateEmail(e){
    //     // Este se puede usar de manera temporal para validar el intitucional
    //     let regInstitucional = /L(B|C)?[0-9]{8}@chihuahua2.tecnm.mx/gi
    //     // Este reg no se si se va a implementar, no coincide con el institucional
    //     let regAnother = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    //     console.log('Validadando con regAnother ',regAnother.test(e.target.value));
    //     console.log(regInstitucional.test(e.target.value)===true ? 'Institucional':'otro');
    // }

    function toggleAuthMode(e){
        setAuthMode(e.target.value.toLowerCase())
        console.log(e.target.value.toLowerCase());
    }

    return(
        <>
            <div className="auth">
                <div className="auth__form">
                    <h2>Bienvenido Bisonte</h2>
                    <div className="auth__mode">
                        <input onClick={toggleAuthMode} className={`btn ${authMode === 'signup' ? 'auth__mode--active' : ''}`} type="button" value="SignUp" />
                        <input onClick={toggleAuthMode} className={`btn ${authMode === 'signin' ? 'auth__mode--active' : ''}`} type="button" value="SignIn" />
                    </div>
                    <input onInput={validateEmail} name='email' className={`auth__input`} type="text"  placeholder="Escribe tu correo"/>
                    <input name='password' className='auth__input' type="password" placeholder="Contrasena"/>
                    {authMode === 'signup' ? (
                        <input name='repeatpassword' className='auth__input' type="password" placeholder="Repite contrasena"/>
                    ): null} 
                    <input className='btn auth_confirm' type="button" value={`${authMode === 'signup' ? 'Sign Up' : 'Sign In'}`} />
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
            </div>
        </>
    )
}

export default Auth