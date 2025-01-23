import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card } from 'primereact/card';

interface ClienteConIngresoDto {
    cliente: {
        id: number;
        nombre: string;
        correo: string;
    };
    totalIngreso: number;
}

interface IngresoMensualDto {
    totalIngresoMensual: number;
}

const Ventas: React.FC = () => {
    // Estado para almacenar los datos del cliente, ingreso mensual y productos más vendidos
    const [clienteConMayorIngreso, setClienteConMayorIngreso] = useState<ClienteConIngresoDto | null>(null);
    const [ingresoMensual, setIngresoMensual] = useState<IngresoMensualDto | null>(null);
    const [productosMasVendidos, setProductosMasVendidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Llamada al endpoint
        const fetchData = async () => {
            try {
                const clienteResponse = await axios.get('http://localhost:8080/siman/api/ventas/cliente-mayor-ingreso');
                const ingresoResponse = await axios.get('http://localhost:8080/siman/api/ventas/ingreso-mensual');
                const productosResponse = await axios.get('http://localhost:8080/siman/api/ventas/productos-mas-vendidos');
                
                setClienteConMayorIngreso(clienteResponse.data);
                setIngresoMensual(ingresoResponse.data);
                setProductosMasVendidos(productosResponse.data);
                setLoading(false);
            } catch (error) {
                setError("Error al cargar los datos");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!clienteConMayorIngreso || !ingresoMensual) {
        return <p>No hay datos disponibles</p>;
    }

    const cardImage1 = (
        <img alt="Top 3" src="/online-shop-1.png" width="440" height="235" />
    );

    const cardImage2 = (
        <img alt="Ciente con más ingreso" src="/online-shop-2.png" width="440" height="235" />
    );

    const cardImage3 = (
        <img alt="Ganancias del último mes" src="/online-shop-3.png" width="440" height="235" />
    )

    const footer = (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <i className="pi pi-check" style={{ fontSize: '48px', color: 'green' }}></i>
        </div>
    );

    return (
        <div className="card flex justify-content-center" style={{ height: '80vh', marginTop: '2rem' }}>
            <Card title="¿Cuáles son los 3 productos más vendidos?" subTitle="" header={cardImage1} footer={footer} className="md:w-25rem" style={{ margin: '1rem' }}>
                <div style={{ fontSize: '100%' }}>
                    {productosMasVendidos.map((producto: any) => (
                        <div key={producto.producto_id}>
                            <strong>ID:</strong> {producto.producto_id} - <strong>Nombre:</strong> {producto.producto_nombre} <br />
                            <strong>Unidades Vendidas:</strong> {producto.total_vendido} <br /><br />
                        </div>
                    ))}
                </div>
            </Card>
            <Card title="¿Qué cliente generó el mayor ingreso?" header={cardImage2} footer={footer} className="md:w-25rem" style={{ margin: '1rem' }}>
                <p className="m-0" style={{ fontSize: '130%' }}>
                    Cliente ID: {clienteConMayorIngreso.cliente.id} <br />
                    Nombre: {clienteConMayorIngreso.cliente.nombre} <br />
                    Correo: {clienteConMayorIngreso.cliente.correo} <br />
                    Total Gastado: ${clienteConMayorIngreso.totalIngreso}
                </p>
            </Card>
            <Card title="¿Cuál es el ingreso total generado en el último mes?" subTitle="" header={cardImage3} footer={footer} className="md:w-25rem" style={{ margin: '1rem' }}>
                <p className="m-0" style={{ fontSize: '135%' }}>
                    Ingreso total del último mes: ${ingresoMensual.totalIngresoMensual}
                </p>
            </Card>
        </div>
    );
};

export default Ventas;
