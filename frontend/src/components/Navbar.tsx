import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import AuthService from '../services/authService';

const Navbar: React.FC = () => {
    const currentUser = AuthService.getCurrentUser();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            template: (item, options) => (
                <Link to="/" className={options.className}>
                    <span className={`pi ${item.icon}`}></span><span className="p-menuitem-text">{item.label}</span>
                </Link>
            )
        },
        currentUser && currentUser.roles.includes('ROLE_ADMIN') && {
            label: 'Clientes',
            icon: 'pi pi-fw pi-info-circle',
            template: (item, options) => (
                <Link to="/clientes" className={options.className}>
                    <span className={`pi ${item.icon}`}></span><span className="p-menuitem-text">{item.label}</span>
                </Link>
            )
        },
        currentUser && currentUser.roles.includes('ROLE_ADMIN') && {
            label: 'Ventas',
            icon: 'pi pi-fw pi-info-circle',
            template: (item, options) => (
                <Link to="/ventas" className={options.className}>
                    <span className={`pi ${item.icon}`}></span><span className="p-menuitem-text">{item.label}</span>
                </Link>
            )
        },
        currentUser && (currentUser.roles.includes('ROLE_ADMIN') || currentUser.roles.includes('ROLE_USER')) && {
            label: 'Productos',
            icon: 'pi pi-fw pi-info-circle',
            template: (item, options) => (
                <Link to="/productos" className={options.className}>
                    <span className={`pi ${item.icon}`}></span><span className="p-menuitem-text">{item.label}</span>
                </Link>
            )
        },
        {
            label: 'Contacto',
            icon: 'pi pi-fw pi-envelope',
            template: (item, options) => (
                <Link to="/contacto" className={options.className}>
                    <span className={`pi ${item.icon}`}></span><span className="p-menuitem-text">{item.label}</span>
                </Link>
            )
        },
        currentUser ? {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            template: (item, options) => (
                <Link to="/logout" className={options.className}>
                    <span className={`pi ${item.icon}`}></span><span className="p-menuitem-text">{item.label}</span>
                </Link>
            )
        } : {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            template: (item, options) => (
                <Link to="/login" className={options.className}>
                    <span className={`pi ${item.icon}`}></span><span className="p-menuitem-text">{item.label}</span>
                </Link>
            )
        }
    ].filter(Boolean);  // Elimina los elementos nulos o indefinidos

    const start = <Link to="/"><img alt="logo" src="/logo.png" height="40" style={{ marginRight: '10px' }} /></Link>;

    const userDisplay = currentUser ? (
        <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '1.1rem' }}>
            {`Bienvenido, ${currentUser.username}!`}
        </span>
    ) : null;    

    return (
        <div className="card">
            <Menubar model={items} start={start} end={userDisplay} />
        </div>
    );
};

export default Navbar;
