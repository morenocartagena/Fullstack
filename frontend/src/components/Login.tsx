import React, { useState } from 'react';
import { Button } from 'primereact/button';
import AuthService from '../services/authService';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        AuthService.login(username, password).then(
            () => {
                window.location.href = '/';
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
            }
        );
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <br />
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <Button label="Login" icon="pi pi-sign-in" className="p-mb-3" type="submit" />
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
