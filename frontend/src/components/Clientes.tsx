import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable, DataTablePageParams } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(50);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    loadClientes(first / rows, rows);
  }, [first, rows]); // Agrega first y rows como dependencias

  const loadClientes = (page: number, size: number) => {
    axios.get(`http://localhost:8080/siman/api/clientes/listar?page=${page}&size=${size}`)
      .then(response => {
        setClientes(response.data.content);
        setTotalRecords(response.data.totalElements);
      })
      .catch(error => {
        setError("Error al cargar los datos.");
        console.error(error); // Agrega esta línea para imprimir el error en la consola
      });
  };

  const onPageChange = (e: DataTablePageParams) => {
    setFirst(e.first);
    setRows(e.rows);
    loadClientes(e.page, e.rows);
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-flex-column" style={{ minHeight: '80vh', textAlign: 'center' }}>
      <h2>Listado de Clientes</h2>
      {error && <p>{error}</p>}
      <div className="card">
        <DataTable value={clientes} paginator={true} lazy={true} totalRecords={totalRecords}
                paginatorPosition="both" onPage={onPageChange} first={first} rows={rows} rowsPerPageOptions={[50, 100, 150]}>
          <Column field="id" header="ID"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="correo" header="Correo"></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Clientes;
