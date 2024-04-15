import { useEffect, useState } from "react"
import Input from "./Components/Input"
import { careers } from "../utils/files"
import Icon from "../UtilComponents/Icon";
import { months } from "../utils/aux";

const CartaCompromiso = () => {

    // Funciones para validar los campos input NUMBER
    // Evita que se usen las flechas del teclado arriba y abajo
    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            console.log(event.key);
            event.preventDefault();
        }
    };

    const careerarray = Object.keys(careers)

    const [values, setValues] = useState({
        name: '',
        n_control: '',
        address: '',
        tel: '',
        career: 'default',
        sem: '1',
        dependency_name: '',
        dependency_address: '',
        responsable: '',
        s_d: '', //start day
        e_d: '', //end day
        a_d: '', //actual day
        s_m: 'Enero', //start month
        e_m: 'Enero', //end month
        a_m: '', //actual month
        s_y: '', //start year
        e_y: '', //end year
        a_y: ''  //actual year
    })

    const [validations, setValidations] = useState({
        //Los valores comentados no son necesarios para las validaciones pero de todos modos lo dejo xd
        name: null,
        n_control: null,
        address: null,
        tel: null,
        career: null,
        // sem: null,
        dependency_name: null,
        dependency_address: null,
        responsable: null,
        s_d: null, //start day
        e_d: null, //end day
        // a_d: null, //actual day
        // s_m: null, //start month
        // e_m: null, //end month
        // a_m: null, //actual month
        s_y: null, //start year
        e_y: null, //end year
        // a_y: null  //actual year
    })


    // function handleValidations() {
    //     //Verificar name
    //     if (values.name.length !== 0) { <--------------------------------- Esta validacion la dejo aqui por si tengo que copiarla en otro lado
    //         setValidations(prev => ({ ...prev, name: true }))
    //     } else {
    //         setValidations(prev => ({ ...prev, name: false }))
    //     }
    //     console.log('Se ha cambiado un valor en el formulario');
    // }

    const validationRules = {
        name: 1,
        n_control: 8,
        address: 1,
        tel: 10,
        career: 'default',
        dependency_name: 1,
        dependency_address: 1,
        responsable: 1,
        s_d: 1,
        e_d: 1,
        s_y: 1,
        e_y: 1
    };

    function handleValidations() {
        const updatedValidations = {};

        for (const key in validationRules) {
            const value = values[key];

            if (value.length !== 0 && (value !== 'default' || key !== 'career')) {
                updatedValidations[key] = true;
            } else {
                updatedValidations[key] = false;
            }
        }

        setValidations(prev => ({ ...prev, ...updatedValidations }));

        console.log('Se ha cambiado un valor en el formulario');
    }

    // state que maneja el cambio de los valores en los input
    function handleChange(evt) {
        const { target } = evt
        const { name, value } = target

        console.log(target);

        setValues({
            ...values,
            [name]: value
        })
    }
    useEffect(() => {
        handleValidations()
        console.log(values);
        console.log(validations);
    }, [values])

    //Este useEffect solo se usa una vez para obtener la fecha actual
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

    //Envio de formulario cuando se presiona el boton verde
    // function handleSubmit() {

    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(values),
    //     };
    //     console.log('Enviando formulario');
    //     console.log(values);
    //     fetch('http://192.168.1.78:3005/download/carta_compromiso/pdf', options)
    // }

    function handleSubmit() {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        };

        fetch('http://192.168.1.78:3005/download/carta_compromiso/pdf', options)
            .then(response => {
                // Verificar si la respuesta fue exitosa (status 200)
                if (!response.ok) {
                    throw new Error('Error al obtener el archivo PDF');
                }
                // Convertir la respuesta a un objeto de tipo Blob
                return response.blob();
            })
            .then(blob => {
                // Crear una URL para el Blob
                const url = URL.createObjectURL(blob);
                // Crear un enlace temporal para descargar el archivo PDF
                const a = document.createElement('a');
                a.href = url;
                a.download = 'carta_compromiso.pdf';
                // Hacer clic automáticamente en el enlace para iniciar la descarga del archivo PDF
                document.body.appendChild(a);
                a.click();
                // Limpiar la URL creada para el Blob
                URL.revokeObjectURL(url);
                // Remover el enlace del cuerpo del documento después de la descarga
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    return (
        <>
            <div className="formData">
                {/*  ----------------- Validar nombre ----------------- */}
                <Input
                    value={values.nombre}
                    name={'name'}
                    label={'Nombre completo'}
                    type={'text'}
                    handleChange={handleChange}
                ></Input>
                <ul className='validationList'>
                    {(validations.name === false && validations.name !== null) ? (
                        <div className="validationList__item">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Campo obligatorio</p>
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
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Se necesitan almenos 8 carácteres</p>
                        </div>
                    ) : null}
                </ul>

                {/*  ----------------- Validar direccion ----------------- */}
                <Input
                    value={values.address}
                    name={'address'}
                    label={'Direccion'}
                    type={'text'}
                    handleChange={handleChange}>
                </Input>
                <ul className='validationList'>
                    {(validations.address === false) ? (
                        <div className="validationList__item validationList__item--form">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Campo obligatorio</p>
                        </div>
                    ) : null}
                </ul>

                {/*  ----------------- Validar telefono ----------------- */}
                <Input
                    value={values.tel}
                    name={'tel'}
                    label={'Numero de telefono'}
                    type={'number'}
                    handleChange={handleChange}>
                </Input>
                <ul className='validationList'>
                    {(validations.tel === false) ? (
                        <div className="validationList__item">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Se necesitan 10 caracteres</p>
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
                        <select className="formData__select" name="sem" id="sem" onChange={handleChange}>
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
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Se debe especificar una carrera</p>
                        </div>
                    ) : null}
                </ul>

                {/*  ----------------- Validar nombre de la dependencia ----------------- */}
                <Input
                    name={'dependency_name'}
                    value={values.dependency_name}
                    type={'text'}
                    label={'Nombre de la dependencia'}
                    handleChange={handleChange}
                ></Input>
                <ul className='validationList'>
                    {(validations.dependency_name === false) ? (
                        <div className="validationList__item">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Campo vacío</p>
                        </div>
                    ) : null}
                </ul>

                {/*  ----------------- Validar direccion de la dependencia ----------------- */}
                <Input
                    name={'dependency_address'}
                    value={values.dependency_address}
                    type={'text'}
                    label={'Direccion de la dependencia'}
                    handleChange={handleChange}
                ></Input>
                <ul className='validationList'>
                    {(validations.dependency_address === false) ? (
                        <div className="validationList__item">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Campo vacío</p>
                        </div>
                    ) : null}
                </ul>


                {/*  ----------------- Validar responsable de la dependencia ----------------- */}
                <Input
                    name={'responsable'}
                    value={values.responsable}
                    type={'text'}
                    label={'Responsable de la dependencia'}
                    handleChange={handleChange}
                ></Input>
                <ul className='validationList'>
                    {(validations.responsable === false) ? (
                        <div className="validationList__item">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Campo vacío</p>
                        </div>
                    ) : null}
                </ul>

                {/*  ----------------- Validar fecha de inicio ----------------- */}
                <div className="formData__block">
                    <label className="formData__label">Fecha de inicio</label>
                    <div className="formData__group formData__group--date">
                        <div className="formData__date">
                            <label htmlFor="s_d">Dia</label>
                            <input name="s_d" type="number" className="formData__input" onChange={handleChange} onKeyDown={handleKeyDown} />
                        </div> /
                        <div className="formData__date">
                            <label htmlFor="s_m">Mes</label>
                            <select name="s_m" id="s_m" onChange={handleChange}>
                                {months.map((elem, index) => {
                                    return <option key={index} value={elem}>{elem}</option>
                                })}
                            </select>
                        </div> /
                        <div className="formData__date">
                            <label htmlFor="s_y">Año</label>
                            <input name="s_y" type="number" className="formData__input" onChange={handleChange} onKeyDown={handleKeyDown} />
                        </div>
                    </div>
                </div>
                <ul className='validationList'>
                    {(validations.s_d === false || validations.s_y === false) ? (
                        <div className="validationList__item">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Se deben llenar todos los campos</p>
                        </div>
                    ) : null}
                </ul>

                {/*  ----------------- Validar fecha de finalizacion ----------------- */}
                <div className="formData__block">
                    <label className="formData__label">Fecha de finalizacion</label>
                    <div className="formData__group formData__group--date">
                        <div className="formData__date">
                            <label htmlFor="e_d">Dia</label>
                            <input name="e_d" type="number" className="formData__input" onChange={handleChange} onKeyDown={handleKeyDown} />
                        </div> /
                        <div className="formData__date">
                            <label htmlFor="e_m">Mes</label>
                            <select name="e_m" id="e_m" onChange={handleChange}>
                                {months.map((elem, index) => {
                                    return <option key={index} value={months[index]}>{months[index]}</option>
                                })}
                            </select>
                        </div> /
                        <div className="formData__date">
                            <label htmlFor="e_y">Año</label>
                            <input name="e_y" type="number" className="formData__input" onChange={handleChange} onKeyDown={handleKeyDown} />
                        </div>
                    </div>
                </div>
                <ul className='validationList'>
                    {(validations.e_d === false || validations.e_y === false) ? (
                        <div className="validationList__item">
                            <Icon icon={'cancel'} customIconClassName='danger'></Icon>
                            <p>Se deben llenar todos los campos</p>
                        </div>
                    ) : null}
                </ul>

            </div>
            <span onClick={handleSubmit} className='btn btn_download'>
                {/* <p>Terminar y descargar</p> */}
                <Icon icon={'download'}></Icon>
            </span>
        </>
    )
}

export default CartaCompromiso