import React from "react";
import { Card } from "primereact/card";
import "primeflex/primeflex.css"; // Asegúrate de importar PrimeFlex CSS

const Home: React.FC = () => {
  const header = <div><h2>PRUEBA TÉCNICA PARA DESARROLLADOR FULLSTACK</h2><h2>MODULO DE VENTAS POR CLIENTES</h2></div>;
  const imageUrl = "/online-shop.png";

  return (
    <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh', textAlign: 'center' }}>
      <Card title={header} className="p-shadow-3 p-p-4">
        <img src={imageUrl} alt="online-shop" style={{ marginBottom: '10px' }} />
        <h3>Usuarios de prueba:</h3>
        <p>Usuario: admin</p>
        <p>Password: admin</p><br />
        <p>Usuario: operador</p>
        <p>Password: operador</p>
      </Card>
    </div>
  );
};

export default Home;
