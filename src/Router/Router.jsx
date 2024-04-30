import {
    createBrowserRouter
} from "react-router-dom";

import Files from '../Body/Files.jsx'
import Auth from '../Body/Auth.jsx'
import App from "../App.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import Landing from "../Body/Landing.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "../Body/Profile.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: <Landing />,
                default: true
            },
            {
                path: "/auth",
                element: <Auth/>,
            },
            {
                path: "/files/*",
                element: <ProtectedRoute><Files/></ProtectedRoute>
            },
            {
                path: "/profile",
                element: <ProtectedRoute><Profile/></ProtectedRoute>,
            },
        ]
    },
]);

export default router