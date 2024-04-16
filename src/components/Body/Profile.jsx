import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            axios.get('/api/user') // Reemplaza esto con tu endpoint
                .then(response => {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                })
                .catch(error => {
                    console.error('Error fetching user', error);
                });
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            {/* Renderiza aquí el resto de la información del usuario */}
        </div>
    );
}

export default Profile;