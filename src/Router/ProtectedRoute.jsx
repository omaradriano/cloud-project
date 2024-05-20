import { Navigate } from 'react-router-dom';

import { AuthContext } from '../Context/Context';
import { useContext, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {

    const {authentication} = useContext(AuthContext)

    useEffect(()=>{
        // console.log(authentication, 'From Protected route');
    },[])
    

    if (!authentication) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute;