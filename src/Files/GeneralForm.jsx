import { useContext, useEffect, useState } from "react"
import Input from "./Components/Input"
import { careers } from "../utils/files"
import Icon from "../UtilComponents/Icon";
import { months } from "../utils/aux";
import { AuthContext } from "../Context/Context";
import { Link } from "react-router-dom";

const GeneralForm = () => {

    const careerarray = Object.keys(careers)

    //Contexto que tiene la autenticación
    const { authentication } = useContext(AuthContext)

    //Estado que tiene los datos de todo el formulario
    const [values, setValues] = useState({
        name: '',
        n_control: '',
        age: '',
        address: '',
        tel: '',
        cel: '',
        career: '',
        sem: '',
        dependency_name: '',
        dependency_address: '',
        responsable_name: '',
        responsable_role: '',
        s_d: '', //start day
        s_m: 'Enero', //end day
        s_y: '', //actual day
        e_d: '', //start month
        e_m: 'Enero', //end month
        e_y: '', //actual month
        a_d: '', //start year
        a_m: '', //end year
        a_y: '',  //actual year
        titular_name: '',
        titular_role: '',
        program_name: '',
        inLocation: 'no',
        location_name: '',
    })

    //validaciones de cada uno de los campos (únicamente valida que no sean campos vacíos)
    const [validations, setValidations] = useState({
        name: '',
        n_control: '',
        age: null,
        address: null,
        tel: null,
        cel: null,
        career: null,
        sem: null,
        dependency_name: null,
        dependency_address: null,
        responsable_name: null,
        responsable_role: null,
        s_d: null, //start day
        s_m: null, //end day
        s_y: null, //actual day
        e_d: null, //start month
        e_m: null, //end month
        e_y: null, //actual month
        a_d: null, //start year
        a_m: null, //end year
        a_y: null,  //actual year
        titular_name: null,
        titular_role: null,
        program_name: null,
        // inLocation: null,
        location_name: null,
    })

    const [validationsCompleted, setValidationsCompleted] = useState(false)

    //Verifica los campos que estan vacíos para mostrar una alerta del campo vacío
    function handleValidations(objectValidations) {
        const keys = Object.keys(objectValidations)
        keys.forEach((elem) => {
            if (values[elem].length === 0) {
                setValidations(prev => ({ ...prev, [elem]: false }))
            } else {
                setValidations(prev => ({ ...prev, [elem]: true }))
            }
        })
    }
    //Esto se ejecuta cada vez que un valor en el formulario cambia
    useEffect(() => {
        handleValidations(values)
    }, [values])

    //Para leer los valores de los formularios en tiempo real
    useEffect(() => {
        console.log(values);
        console.log('Validations ', validations);
        validateAll(validations) ? setValidationsCompleted(true) : setValidationsCompleted(false);
    }, [values, validations])

    // state que maneja el cambio de los valores en los input
    function handleChange(evt) {
        const { target } = evt
        const { name, value } = target
        setValues(prev => ({ ...prev, [name]: value }))
    }

    //Carga los datos a la base de datos y guarda un objeto en localStorage
    function submitData() {
        if (values._id) delete values.id
        delete values._id
        if (authentication) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: authentication.email, ...values })
                // , name: values.name.split(' ').slice(2,).concat(values.name.split(' ').slice(0,2))
            }
            localStorage.setItem('generalUserData', JSON.stringify({ email: authentication.email, ...values }))

            fetch('http://127.0.0.1:5006/data/updatetest', options)
                .then(res => res.json())
                .then(res => console.log(res))
        } else {
            console.log('No existe autenticacion, no se pueden enviar los datos');
        }
    }

    // Valida todos los campos que hay en general form
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

    //Este useEffect solo se usa una vez para obtener la fecha actual y cargarla al state de values
    useEffect(() => {
        let date = new Date()

        const day = date.getDate(); // Obtiene el día del mes (1-31)
        const month = date.getMonth(); // Obtiene el mes (0-11), por lo que sumamos 1 para obtener el mes actual (1-12)
        const year = date.getFullYear(); // Obtiene el año (cuatro dígitos)

        setValues({
            ...values,
            a_d: String(day),
            a_m: months[month],
            a_y: String(year)
        })
    }, [])

    useEffect(() => {
        //Si existe autenticacion, se van a cargar los datos del usuario.
        //En caso de que existan datos en la sesion de localStorage se cargar, sino, se obtienen de la base de datos para cargarlos
        if (authentication) {
            if (localStorage.getItem('generalUserData')) {
                const data = JSON.parse(localStorage.getItem('generalUserData'))
                setValues({ ...data })
            } else {
                fetch(`http://localhost:5006/data/getUserData/${authentication.email}`)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res);
                        const fetchedData = res.userdata
                        delete fetchedData._id //Eliminar el ID de la base de datos para no mostrarlo en el front
                        console.log(fetchedData);
                        localStorage.setItem('generalUserData', JSON.stringify({ ...fetchedData }))
                        setValues({ ...res.userdata })
                    })
            }
        }
    }, [authentication])

    return (
        <>
            <div className="files">
                <div className="formData">
                    <input type="button" value="Guardar" className={`btn btn__save`} onClick={() => submitData()} />
                    {/* <input type="button" value="Llenar formularios" className={`btn btn__tofill ${!validationsCompleted ? 'disabled' : ''}`}/> */}
                    <Link className={`btn btn__tofill ${!validationsCompleted ? 'disabled' : ''}`} to={`/filesfill`}>Llenado de documentos <Icon icon={'arrow_forward'}></Icon></Link>
                    {/*  ----------------- Validar nombre ----------------- */}
                    <Input
                        value={values.name}
                        name={'name'}
                        label={'Nombre completo'}
                        type={'text'}
                        handleChange={handleChange}
                    ></Input>
                    <ul className='validationList'>
                        {validations.name === false ? (
                            <div className="validationList__item">
                                <Icon icon={'warning'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar numero de control ----------------- */}
                    <Input
                        value={values.n_control}
                        name={'n_control'}
                        label={'Numero de control'}
                        type={'number'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.n_control === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar direccion ----------------- */}
                    <Input
                        value={values.address}
                        name={'address'}
                        label={'Dirección'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.address === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar edad ----------------- */}
                    <Input
                        value={values.age}
                        name={'age'}
                        label={'Edad'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.age === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar teléfono ----------------- */}
                    <Input
                        value={values.tel}
                        name={'tel'}
                        label={'Teléfono de casa'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.tel === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar telefono celular ----------------- */}
                    <Input
                        value={values.cel}
                        name={'cel'}
                        label={'Teléfono celular'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.cel === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar carrera y semestre ----------------- */}
                    <div className="formData__group">
                        <div className="formData__block">
                            <label className="formData__label" htmlFor="career">Carrera</label>
                            <select className="formData__select" name="career" id="career" onChange={handleChange}>
                                <option value="default">Selecciona una opcion</option>
                                {careerarray.map((elem, index) => {
                                    return (
                                        <option key={index} value={careers[elem]}>{careers[elem]}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="formData__block">
                            <label htmlFor="sem" className="formData__label">Semestre</label>
                            <select className="formData__select" name="sem" id="sem" value={values.sem} onChange={handleChange}>
                                {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                                {months.map((_elem, index) => {
                                    return <option key={index + 1} value={index + 1}>{index + 1}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <ul className='validationList'>
                        {(validations.career === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Existen campos vacíos</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar nombre de la dependencia ----------------- */}
                    <Input
                        value={values.dependency_name}
                        name={'dependency_name'}
                        label={'Nombre de la dependencia'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.dependency_name === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar direccion de la dependencia ----------------- */}
                    <Input
                        value={values.dependency_address}
                        name={'dependency_address'}
                        label={'Dirección de la dependencia'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.dependency_address === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar telefono celular ----------------- */}
                    <Input
                        value={values.responsable_name}
                        name={'responsable_name'}
                        label={'Nombre del responsable de la dependencia'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.responsable_name === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar rol del responsable ----------------- */}
                    <Input
                        value={values.responsable_role}
                        name={'responsable_role'}
                        label={'Rol del responsable de la dependencia'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.responsable_role === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar fecha de inicio ----------------- */}
                    <div className="formData__group">
                        <div className="formData__block">
                            <label className="formData__label" htmlFor="career">Dia de inicio</label>
                            <Input
                                value={values.s_d}
                                name={'s_d'}
                                type={'text'}
                                handleChange={handleChange}>
                            </Input>
                        </div>
                        <div className="formData__block">
                            <label htmlFor="s_m" className="formData__label">Mes de inicio</label>
                            <select className="formData__select" name="s_m" id="s_m" value={values.s_m} onChange={handleChange}>
                                {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                                {months.map((_elem, index) => {
                                    return <option key={index + 1} value={_elem}>{_elem}</option>
                                })}
                            </select>
                        </div>
                        <div className="formData__block">
                            <label htmlFor="sem" className="formData__label">Año de inicio</label>
                            <Input
                                value={values.s_y}
                                name={'s_y'}
                                type={'text'}
                                handleChange={handleChange}>
                            </Input>
                        </div>
                    </div>
                    <ul className='validationList'>
                        {(validations.s_d === false || validations.s_m === false || validations.s_y === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Existen campos vacíos</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar fecha de finalización ----------------- */}
                    {/* <p>Fecha de finalización</p> */}
                    <div className="formData__group">
                        <div className="formData__block">
                            <label className="formData__label" htmlFor="career">Día de finalización</label>
                            <Input
                                value={values.e_d}
                                name={'e_d'}
                                type={'number'}
                                handleChange={handleChange}>
                            </Input>
                        </div>
                        <div className="formData__block">
                            <label htmlFor="e_m" className="formData__label">Mes de finalización</label>
                            <select className="formData__select" name="e_m" id="e_m" value={values.e_m} onChange={handleChange}>
                                {/* Solo por que la cantidad de semestres es igual a la cantidad de meses pero no deberia de estar así */}
                                {months.map((_elem, index) => {
                                    return <option key={index + 1} value={_elem}>{_elem}</option>
                                })}
                            </select>
                        </div>
                        <div className="formData__block">
                            <label htmlFor="sem" className="formData__label">Año de finalización</label>
                            <Input
                                value={values.e_y}
                                name={'e_y'}
                                type={'number'}
                                handleChange={handleChange}>
                            </Input>
                        </div>
                    </div>
                    <ul className='validationList'>
                        {(validations.e_d === false || validations.e_m === false || validations.e_y === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Existen campos vacíos</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar nombre del titular ----------------- */}
                    <Input
                        value={values.titular_name}
                        name={'titular_name'}
                        label={'Nombre del titular de la dependencia'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.titular_name === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar rol del titular ----------------- */}
                    <Input
                        value={values.titular_role}
                        name={'titular_role'}
                        label={'Rol del titular de la dependencia'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.titular_role === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar nombre del programa----------------- */}
                    <Input
                        value={values.program_name}
                        name={'program_name'}
                        label={'Nombre del programa'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.program_name === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                    {/*  ----------------- Validar si es dentro de la institucion ----------------- */}
                    <div className="formData__block">
                        <label className="formData__label" htmlFor='inLocation'>Será dentro de la institución?</label>
                        <select className="formData__select" value={values.inLocation} name="inLocation" id="inLocation" onChange={handleChange}>
                            <option value="no">No</option>
                            <option value="si">Sí</option>
                        </select>
                    </div>

                    {/*  ----------------- Validar ubicación de la dependencia ----------------- */}
                    <Input
                        value={values.location_name}
                        name={'location_name'}
                        label={'Nombre de realización del servicio'}
                        type={'text'}
                        handleChange={handleChange}>
                    </Input>
                    <ul className='validationList'>
                        {(validations.location_name === false) ? (
                            <div className="validationList__item">
                                <Icon icon={'cancel'} customIconClassName='warning'></Icon>
                                <p>Campo vacío</p>
                            </div>
                        ) : null}
                    </ul>

                </div>
            </div>
        </>
    )
}

export default GeneralForm