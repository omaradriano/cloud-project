import {
    createBrowserRouter
} from "react-router-dom";

import Auth from '../Body/Auth.jsx'
import App from "../App.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import Landing from "../Body/Landing.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "../Body/Profile.jsx";
// import GenerateFile from "../Files/GenerateFile.jsx";
import GeneralForm from "../Files/GeneralForm.jsx";
import GenerateFile from "../Files/GenerateFile.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "home", //Renderiza la pagina landing
                element: <Landing />,
                default: true
            },
            {
                path: "auth", //Renderiza el registro y autenticación del usuario
                element: <Auth/>,
            },
            {
                path: "filesfill", //Aquí se llenan los formularios para descargar un documento
                element: <ProtectedRoute><GenerateFile/></ProtectedRoute>
            },
            {
                path: "profile", //Perfil de usuario
                element: <ProtectedRoute><Profile/></ProtectedRoute>,
            },
            {
                path: "generalform", //Formulario general previo a la vista para descargar documentos
                element: <ProtectedRoute><GeneralForm/></ProtectedRoute>,
            },
        ]
    },
]);

export default router