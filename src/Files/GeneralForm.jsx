import { useContext, useEffect, useState } from "react"
import Input from "./Components/Input"
import { careers } from "../utils/files"
import Icon from "../UtilComponents/Icon";
import { months } from "../utils/some_aux";
import { AuthContext } from "../Context/Context";
import { Link } from "react-router-dom";

import bisonte from '../assets/imgs/bisontepapel.png'

import { validateAll, handleValidations } from "../utils/forms_functions";
import { serverDomain } from "../config";
import InputText from "./Components/InputText";
import InputSelect from "./Components/InputSelect";

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
        inLocation: '',
        location_name: '',
        gender: ''
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
        gender: null
    })

    const [validationsCompleted, setValidationsCompleted] = useState(false)

    //Esto se ejecuta cada vez que un valor en el formulario cambia
    useEffect(() => {
        handleValidations(values, setValidations, values)
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

            fetch(`${serverDomain}/data/updatetest`, options)
                .then(res => res.json())
                .then(res => console.log(res))
        } else {
            console.log('No existe autenticacion, no se pueden enviar los datos');
        }
    }

    //Este useEffect solo se usa una vez para obtener la fecha actual y cargarla al state de values
    useEffect(() => {
        let date = new Date()

        const day = date.getDate(); // Obtiene el día del mes (1-31)
        const month = date.getMonth(); // Obtiene el mes (0-11), por lo que sumamos 1 para obtener el mes actual (1-12)
        const year = date.getFullYear(); // Obtiene el año (cuatro dígitos)

        setValues({
            ...JSON.parse(localStorage.getItem('generalUserData')),
            a_d: String(day),
            a_m: months[month],
            a_y: String(year)
        })
    }, [])

    useEffect(() => {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

        // Devuelve una función de limpieza para detener las instancias del popover cuando el componente se desmonte
        return () => {
            popoverList.forEach(popover => popover.dispose());
        };
    }, []);

    return (
        <>
            <div className="files">
                {/* <img src={bisonte} alt="Imagen de bisonte con un papel awwww" className="form-bg"/> */}
                <div className="formData">
                    <input type="button" value="Guardar" className={`btn btn__save`} onClick={() => submitData()} />
                    {/* <input type="button" value="Llenar formularios" className={`btn btn__tofill ${!validationsCompleted ? 'disabled' : ''}`}/> */}
                    <Link className={`btn btn__tofill ${!validationsCompleted ? 'disabled' : ''}`} to={`/filesfill`}>Llenado de documentos <Icon icon={'arrow_forward'}></Icon></Link>

                    <div className="formData__section">

                    </div>

                    {/*  ----------------- Validar nombre ----------------- */}
                    <InputText
                        name={'name'}
                        label={'Nombre'}
                        placeholder={'Paterno - Materno - Nombres'}
                        value={values.name}
                        completed={validations.name}
                        popover={true}
                        popoverText="Apellido Paterno - Materno - Nombres"
                        handleChange={handleChange}
                    ></InputText>

                    {/*  ----------------- Numero de control ----------------- */}
                    <InputText
                        name={'n_control'}
                        placeholder={'Numero de control'}
                        label={'Numero de control'}
                        value={values.n_control}
                        completed={validations.n_control}
                        popover={true}
                        handleChange={handleChange}
                        popoverText="Numero de control del estudiante"
                    ></InputText>

                    {/*  ----------------- Validar direccion ----------------- */}
                    <InputText
                        name={'address'}
                        placeholder={'Ej. Calle y numero - Colonia - Ciudad y estado'}
                        label={'Dirección particular'}
                        value={values.address}
                        completed={validations.address}
                        popover={true}
                        popoverText="Calle y número - Colonia - Ciudad y estado"
                        handleChange={handleChange}
                    ></InputText>

                    {/*  ----------------- Validar edad ----------------- */}
                    <InputText
                        name={'age'}
                        placeholder={'Ej. 24'}
                        label={'Edad'}
                        value={values.age}
                        completed={validations.age}
                        handleChange={handleChange}
                    ></InputText>

                    {/*  ----------------- Validar teléfono ----------------- */}
                    <InputText
                        name={'tel'}
                        handleChange={handleChange}
                        label={'Telefono no celular'}
                        placeholder={'Ej. 6141234567'}
                        value={values.tel}
                        completed={validations.tel}
                    ></InputText>

                    {/*  ----------------- Validar telefono celular ----------------- */}
                    <InputText
                        name={'cel'}
                        handleChange={handleChange}
                        label={'Telefono celular'}
                        placeholder={'Ej. 6141234567'}
                        value={values.cel}
                        completed={validations.cel}
                    ></InputText>

                    {/* CARRERA Y SEMESTRE */}
                    <div className="formdata__group mb-5p">
                        <div className="formdata__options">
                            <InputSelect
                                name={'career'}
                                handleChange={handleChange}
                                label={'Carrera'}
                                renderArray={careerarray.map((elem, index) => {
                                    return (
                                        <option key={index} value={careers[elem]}>{careers[elem]}</option>
                                    )
                                })}
                                value={values.career}
                                completed={validations.career}
                            ></InputSelect>
                            <InputSelect
                                handleChange={handleChange}
                                label={'Semestre'}
                                name={'sem'}
                                renderArray={months.map((_elem, index) => {
                                    return <option key={index + 1} value={index + 1}>{index + 1}</option>
                                })}
                                value={values.sem}
                                completed={validations.sem}

                            ></InputSelect>
                        </div>
                    </div>

                    {/*  ----------------- Validar nombre de la dependencia ----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Nombre de la dependencia'}
                        name={'dependency_name'}
                        placeholder={'Ej. ITCH II'}
                        value={values.dependency_name}
                        completed={validations.dependency_name}
                        popover={true}
                        popoverText="Nombre completo de la dependencia donde se realiza el servicio social"
                    ></InputText>

                    {/*  ----------------- Validar direccion de la dependencia ----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Dirección de la dependencia'}
                        name={'dependency_address'}
                        placeholder={'Ej. ITCHII #12345, Colonia parque industrial'}
                        value={values.dependency_address}
                        completed={validations.dependency_address}
                        popover={true}
                        popoverText="Domicilio de la dependencia de realización (Calle - numero - Colonia)"
                    ></InputText>

                    {/*  ----------------- Validar responsable celular ----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Responsable del programa'}
                        name={'responsable_name'}
                        placeholder={'Ej. Javier Lopez'}
                        value={values.responsable_name}
                        completed={validations.responsable_name}
                        popover={true}
                        popoverText="Nombre del responsable del programa o supervisor del servicio social del organismo"
                    />

                    {/*  ----------------- Validar rol del responsable ----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Rol del responsable del programa'}
                        name={'responsable_role'}
                        placeholder={'Ej. Javier Lopez'}
                        value={values.responsable_role}
                        completed={validations.responsable_role}
                        popover={true}
                        popoverText="Puesto que desempeña el responsable del programa o supervisor del servicio social"
                    />

                    {/*  ----------------- Validar fecha de inicio ----------------- */}
                    <div className="formdata__group mb-5p">
                        <div className="formdata__options">
                            <InputSelect
                                handleChange={handleChange}
                                label={'Dia de inicio'}
                                name={'s_d'}
                                renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                                    return <option key={index} value={elem}>{elem}</option>
                                })}
                                value={values.s_d}
                                completed={validations.s_d}
                            />
                            <InputSelect
                                handleChange={handleChange}
                                label={'Mes de inicio'}
                                name={'s_m'}
                                renderArray={months.map((elem, index) => {
                                    return <option key={index} value={elem}>{elem}</option>
                                })}
                                value={values.s_m}
                                completed={validations.s_m}
                            />
                            <InputSelect
                                handleChange={handleChange}
                                label={'Año de inicio'}
                                name={'s_y'}
                                renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                                    return <option key={index} value={elem}>{elem}</option>
                                })}
                                value={values.s_y}
                                completed={validations.s_y}
                            />
                        </div>
                    </div>

                    {/*  ----------------- Validar fecha de finalización ----------------- */}
                    <div className="formdata__group mb-5p">
                        <div className="formdata__options">
                            <InputSelect
                                handleChange={handleChange}
                                label={'Dia de finalización'}
                                name={'e_d'}
                                renderArray={Array.from({ length: 31 }, (_, index) => { return index + 1 }).map((elem, index) => {
                                    return <option key={index} value={elem}>{elem}</option>
                                })}
                                value={values.e_d}
                                completed={validations.e_d}
                            />
                            <InputSelect
                                handleChange={handleChange}
                                label={'Mes de finalización'}
                                name={'e_m'}
                                renderArray={months.map((elem, index) => {
                                    return <option key={index} value={elem}>{elem}</option>
                                })}
                                value={values.e_m}
                                completed={validations.e_m}
                            />
                            <InputSelect
                                handleChange={handleChange}
                                label={'Año de finalización'}
                                name={'e_y'}
                                renderArray={Array.from({ length: 10 }, (_, index) => { return index + Number(new Date().getFullYear()) }).map((elem, index) => {
                                    return <option key={index} value={elem}>{elem}</option>
                                })}
                                value={values.e_y}
                                completed={validations.e_y}
                            />
                        </div>
                    </div>

                    {/*  ----------------- Validar nombre del titular ----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Nombre del titular de la dependencia'}
                        name={'titular_name'}
                        placeholder={'Ej. Javier Lopez'}
                        value={values.titular_name}
                        completed={validations.titular_name}
                        popover={true}
                        popoverText="Nombre completo de titular de la dependencia"
                    />

                    {/*  ----------------- Validar rol del titular ----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Rol del titular de la dependencia'}
                        name={'titular_role'}
                        placeholder={'Ej. Jefe de laboratorio de cómputo'}
                        value={values.titular_role}
                        completed={validations.titular_role}
                        popover={true}
                        popoverText="Rol que desempeña de titular de la dependencia"
                    />

                    {/*  ----------------- Validar nombre del programa----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Nombre del programa'}
                        name={'program_name'}
                        placeholder={'Ej. Auxiliar de laboratorio de computo'}
                        value={values.program_name}
                        completed={validations.program_name}
                        popover={true}
                        popoverText="Este suele ser el puesto que tú como estudiante estará desempeñando en la dependencia"
                    />

                    {/*  ----------------- Validar si es dentro de la institucion ----------------- */}
                    <InputSelect
                        handleChange={handleChange}
                        label={'Es dentro de la institución?'}
                        name={'inLocation'}
                        renderArray={Array.from(['Si', 'No'], (elem, index) => { return <option key={index} value={elem}>{elem}</option> })}
                        value={values.inLocation}
                        completed={validations.inLocation}
                    />

                    {/*  ----------------- Validar genero ----------------- */}
                    <InputSelect
                        handleChange={handleChange}
                        label={'Genero'}
                        name={'gender'}
                        renderArray={Array.from(['Masculino', 'Femenino'], (elem, index) => { return <option key={index} value={elem}>{elem}</option> })}
                        value={values.gender}
                        completed={validations.gender}
                    />

                    {/*  ----------------- Validar ubicación de la dependencia ----------------- */}
                    <InputText
                        handleChange={handleChange}
                        label={'Nombre de realización del servicio'}
                        name={'location_name'}
                        placeholder={'Ej. Instituto Tecnológico de Chihuahua II'}
                        value={values.location_name}
                        completed={validations.location_name}
                        popover={true}
                        popoverText="Nombre del lugar de donde se va a realizar el servicio social"
                    />

                </div>
            </div>
        </>
    )
}

export default GeneralForm