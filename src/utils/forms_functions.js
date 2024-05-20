import { serverDomain } from "../config"
import { docsKeys } from "./files"

/**
 * @abstract Verifica que todos los campos del objeto de validaciones sean validados para poder proceder en el llenado del formulario
 * @param {object} validations_obj Objecto de las validaciones que se manejan en el formulario
 * @returns {boolean}
 */
export function validateAll(validations_obj) {
    let validate = true
    for (const key in validations_obj) {
        if (Object.hasOwnProperty.call(validations_obj, key)) {
            if (validations_obj[key] === false) {
                validate = false
            }
        }
    }
    return validate
}

/**
 * @abstract Verifica los campos que estan vacíos para mostrar una alerta del campo vacío
 * @param {Object} objectValidations Es el state que contiene las validaciones
 * @param {useState} stateFunction Funcion de estado que actualiza los valores del objectValidations
 * @param {Object} valuesObject Valores que son pasados para ser validados y evitar que sean campos vacíos
 */
export function handleValidations(objectValidations, stateFunction, valuesObject) {
    const keys = Object.keys(objectValidations)
    keys.forEach((elem) => {
        // console.log(elem);
        if (valuesObject[elem].length === 0) {
            stateFunction(prev => ({ ...prev, [elem]: false }))
        } else {
            stateFunction(prev => ({ ...prev, [elem]: true }))
        }
    })
}

export function generateDocument(document_name, type, auth, documentData = {}) {


    try {
        const finalData = JSON.parse(localStorage.getItem('generalUserData'))

        if (!finalData) throw new Error('No se ha podido obtener la información del almacenamiento del navegador')

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...finalData, ...documentData })
        }
        // console.log(auth);
        console.log('Información enviada', finalData);
        // console.log(docsKeys[document_name]);
        if (auth) {
            // console.log('Generando documento');
            switch (type) {
                case 'pdf':
                    fetch(`${serverDomain}/files/download/${docsKeys[document_name]}/pdf`, options)
                        .then(response => {
                            // Verificar si la respuesta es exitosa
                            if (!response.ok) {
                                throw new Error('Error al obtener el archivo');
                            }
                            // Devolver el cuerpo de la respuesta como JSON
                            return response.json();
                        })
                        .then(data => {
                            // Obtener la URL del objeto de respuesta
                            const url = data.url;
                            // console.log(url);
                            // Crear un enlace <a> temporal
                            const link = document.createElement('a');
                            link.href = url;
                            // Establecer el nombre de archivo para el enlace (puedes ajustarlo según tu preferencia)
                            link.setAttribute('download', `${docsKeys[document_name]}.pdf`);
                            // Simular un clic en el enlace para descargar el archivo
                            document.body.appendChild(link);
                            link.click();
                            // Limpiar el enlace después de la descarga
                            document.body.removeChild(link);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    break
                case 'docx':
                    fetch(`${serverDomain}/files/download/${docsKeys[document_name]}/docx`, options)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al descargar el archivo');
                            }
                            return response.blob();
                        })
                        .then(blob => {
                            // Crear un objeto URL para el Blob
                            const url = window.URL.createObjectURL(new Blob([blob]));
                            // Crear un enlace <a> temporal
                            const link = document.createElement('a');
                            link.href = url;
                            // Establecer el nombre de archivo para el enlace
                            link.setAttribute('download', `${docsKeys[document_name]}.docx`);
                            // Simular un clic en el enlace para descargar el archivo
                            document.body.appendChild(link);
                            link.click();
                            // Limpiar el enlace y el objeto URL después de la descarga
                            link.parentNode.removeChild(link);
                            window.URL.revokeObjectURL(url);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        })
                    break
            }
        } else {
            console.log('No auth');
        }
    } catch (error) {
        console.Error('Error: ', error.message);
    }
}

//Carga los datos a la base de datos y guarda un objeto en localStorage
export function submitData(auth, values, componentName, serverDomain) {
    if (auth) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: auth.email, ...values })
            // , name: values.name.split(' ').slice(2,).concat(values.name.split(' ').slice(0,2))
        }

        // let userData = JSON.parse(localStorage.getItem('generalUserData'))
        // localStorage.setItem('generalUserData', JSON.stringify({ email: authentication.email, ...values }))

        fetch(`${serverDomain}/data/updateUserFile/${componentName}`, options)
            .then(res => res.json())
            .then(res => console.log(res))
    } else {
        console.log('No existe autenticacion, no se pueden enviar los datos');
    }
}