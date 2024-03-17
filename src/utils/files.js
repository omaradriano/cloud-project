import autoevaluacion_cualitativa from '../assets/FilesImages/formulario_autoevaluacion_cualitativa_PRESTADOR.png'
import carta_compromiso from '../assets/FilesImages/formulario_carta_compromiso.png'
import actividades from '../assets/FilesImages/formulario_de_actividades_PRESTADOR.png'
import carta_asignacion from '../assets/FilesImages/formulario_de_carta_de_asignacion.png'
import reporte_bimestral from '../assets/FilesImages/formulario_de_reporte_bimestral.png'
import solicitud from '../assets/FilesImages/formulario_de_solicitud.png'
import evaluacion_cualitativa from '../assets/FilesImages/formulario_evaluacion_cualitativa_INSTITUCION.png'
import plan_de_trabajo from '../assets/FilesImages/formulario_plan_de_trabajo.png'

// Este documento contiene informacion que se reusa en los select dentro de formularios

/**
 * @abstract Objeto que exporta imagenes de los documentos usados.
 * Se usa en:
 *  ~ SelectFile.jsx
 */
export const SS_files = {
    "file_1": {
        name: 'Formato de Autoevaluación Cualitativa',
        filename: autoevaluacion_cualitativa
    },
    "file_2": {
        name: 'Formato de Evaluación Cualitativa llenado por la Institución',
        filename: evaluacion_cualitativa
    },
    "file_3": {
        name: 'Formulario de carta compromiso',
        filename: carta_compromiso
    },
    "file_4": {
        name: 'Formato de Evaluación de las Actividades por el prestador de Servicio Social',
        filename: actividades
    },
    "file_5": {
        name: 'Formulario de Carta de Asignación',
        filename: carta_asignacion
    },
    "file_6": {
        name: 'Formato de Reporte Bimestral',
        filename: reporte_bimestral
    },
    "file_7": {
        name: 'Formulario de Solicitud',
        filename: solicitud
    },
    "file_8": {
        name: 'Formulario de Plan de Trabajo',
        filename: plan_de_trabajo
    },
}

/**
 * @abstract Objeto que exporta las carreras de los documentos usados.
 * Se usa en:
 *  ~ SelectFile.jsx
 */
export const careers = {
    "career_1":"Arquitectura"       ,     
    "career_2":"Ingeniería en gestión empresarial",            
    "career_3":"Ingeniería industrial",          
    "career_4":"Ingeniería en diseño industrial",            
    "career_5":"Ingeniería en sistemas computacionales",            
    "career_6":"Ingeniería informática",           
    "career_7":"Licenciatura en informática",            
    "career_8":"Licenciatura en administación",            
    "career_9":"Licenciatura en relaciones industriales",
}
