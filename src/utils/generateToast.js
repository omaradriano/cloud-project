import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/**
 * 
 * @param {*} toastType error | success | warning | success
 * @param {*} message whatever you want
 */
export function generateToast(toastType, message) {
    toast[toastType](message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Slide,
    });
}
