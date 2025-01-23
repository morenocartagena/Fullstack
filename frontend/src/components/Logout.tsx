import React from 'react';
import { Button } from 'primereact/button';
import AuthService from '../services/authService';

const Logout: React.FC = () => {
    const handleLogout = () => {
        AuthService.logout().then(() => {
            window.location.href = '/';
        });
    };

    return (
        <div className="p-d-flex p-flex-column p-ai-center" style={{ height: '100vh', textAlign: 'center' }}>
            <p>Dar click en Logout para salir:</p>
            <Button label="Logout" icon="pi pi-sign-out" className="p-mb-3" onClick={handleLogout} />
        </div>
    );
};

export default Logout;
