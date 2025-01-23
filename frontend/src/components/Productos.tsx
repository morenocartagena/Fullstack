import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { DataTable, DataTablePageParams } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

const Productos: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoDialog, setProductoDialog] = useState<boolean>(false);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({id: 0, nombre: '', precio: 0, stock: 0});
  const [error, setError] = useState<string | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(50);
  const [totalRecords, setTotalRecords] = useState(0);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    loadProductos(first / rows, rows);
  }, [first, rows]);

  const loadProductos = (page: number, size: number) => {
    axios.get(`http://localhost:8080/siman/api/productos/listar?page=${page}&size=${size}`)
      .then(response => {
        setProductos(response.data.content);
        setTotalRecords(response.data.totalElements);
      })
      .catch(() => setError("Error al cargar los datos."));
  };

  const onPageChange = (e: DataTablePageParams) => {
    setFirst(e.first);
    setRows(e.rows);
    loadProductos(e.page, e.rows);
  };

  const openNew = () => {
    setNuevoProducto({id: 0, nombre: '', precio: 0, stock: 0});
    setProductoDialog(true);
  }

  const saveProducto = () => {
    if (nuevoProducto.id) {
      // Update existing product
      axios.put(`http://localhost:8080/siman/api/productos/actualizar/${nuevoProducto.id}`, nuevoProducto)
        .then(() => {
          setProductos(productos.map(producto => producto.id === nuevoProducto.id ? nuevoProducto : producto));
          setProductoDialog(false);
          if (toast.current) {
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto actualizado', life: 3000 });
          }
        })
        .catch(() => {
            setError("Error al actualizar el producto.");
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el producto', life: 3000 });
            }
        });
    } else {
      // Add new product
      axios.post('http://localhost:8080/siman/api/productos/guardar', nuevoProducto)
        .then(response => {
          setProductos([...productos, response.data]);
          setProductoDialog(false);
          if (toast.current) {
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto creado', life: 3000 });
          }
        })
        .catch(() => {
            setError("Error al crear el producto.");
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al crear el producto', life: 3000 });
            }
        });
    }
  }

  const editProducto = (producto: Producto) => {
    setNuevoProducto({...producto});
    setProductoDialog(true);
  }

  const deleteProducto = (producto: Producto) => {
    confirmDialog({
      message: `¿Estás seguro de que quieres eliminar el producto "${producto.nombre}"?`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        axios.delete(`http://localhost:8080/siman/api/productos/eliminar/${producto.id}`)
          .then(() => {
            setProductos(productos.filter(item => item.id !== producto.id));
            if (toast.current) {
                toast.current.show({ severity: 'info', summary: 'Éxito', detail: 'Producto eliminado', life: 3000 });
            }
          })
          .catch(() => {
              setError("Error al eliminar el producto.");
              if (toast.current) {
                  toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el producto', life: 3000 });
              }
          });
      }
    });
  }

  const actionBodyTemplate = (rowData: Producto) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProducto(rowData)} /> - 
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteProducto(rowData)} />
      </React.Fragment>
    );
  }

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
        + productos.map(p => `${p.id},${p.nombre},${p.precio},${p.stock}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "productos.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-flex-column" style={{ minHeight: '80vh', textAlign: 'center' }}>
      <Toast ref={toast} />
      <ConfirmDialog /> 
      <h2>CRUD de Productos</h2>
      {error && <p>{error}</p>}
      <Button label="Nuevo Producto" icon="pi pi-plus" className="p-mb-3" onClick={openNew} style={{ marginRight: '10px' }} />
      <Button label="Exportar" icon="pi pi-download" className="p-mb-3" onClick={exportCSV} />
      <div className="card">
        <DataTable value={productos} paginator={true} lazy={true} totalRecords={totalRecords}
                   paginatorPosition="both" onPage={onPageChange} first={first} rows={rows} 
                   rowsPerPageOptions={[50, 100, 150]} tableStyle={{ minWidth: '60rem' }}>
          <Column field="id" header="ID"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="precio" header="Precio"></Column>
          <Column field="stock" header="Stock"></Column>
          <Column body={actionBodyTemplate} header="Acciones"></Column>
        </DataTable>
      </div>

      <Dialog visible={productoDialog} style={{ width: '450px' }} header="Detalles del Producto" modal className="p-fluid" footer={<div>
        <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => setProductoDialog(false)} />
        <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProducto} />
      </div>} onHide={() => setProductoDialog(false)}>
        <div className="p-field">
          <label htmlFor="name">Nombre</label>
          <InputText id="name" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: (e.target as HTMLInputElement).value })} />
        </div>
        <div className="p-field">
          <label htmlFor="price">Precio</label>
          <InputText id="price" value={nuevoProducto.precio || ''} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: parseFloat((e.target as HTMLInputElement).value) || 0 })} />
        </div>
        <div className="p-field">
          <label htmlFor="stock">Stock</label>
          <InputText id="stock" value={nuevoProducto.stock || ''} onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: parseInt((e.target as HTMLInputElement).value, 10) || 0 })} />
        </div>
      </Dialog>
    </div>
  );
}

export default Productos;
