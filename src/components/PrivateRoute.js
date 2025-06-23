import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const [ checking, setChecking ] = useState(true);

    useEffect(() => {
        // simulate checking auth state if needed
        setChecking(false);
      }, [user]);
    
      if (checking) return null; // or a loading spinner
    
    return user ? children : <Navigate to="/login" replace />;
}
export default PrivateRoute;