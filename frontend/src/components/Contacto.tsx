import React from 'react';
import 'primeflex/primeflex.css';

const Contacto: React.FC = () => {
    return (
        <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh', textAlign: 'center' }}>
            <div>
                <h2>Contacto</h2>
                <p>
                    Autor: Mario Efrain Moreno Cartagena
                </p>
                <p>
                    Correo electrónico: 
                    <a href="mailto:morenocartagena@outlook.com"> morenocartagena@outlook.com</a>
                </p>
                <p>
                    GitHub: 
                    <a href="https://github.com/morenocartagena" target="_blank" rel="noopener noreferrer">
                        https://github.com/morenocartagena
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Contacto;
