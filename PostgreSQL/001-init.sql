-- VENTASDB SE CREA EN EL DOCKER COMPOSE
-- Crear la base de datos VENTASDB
-- CREATE DATABASE VENTASDB;

-- ***************************************************
-- CREAR TABLAS PARA VENTAS

-- Crear tabla Productos
CREATE TABLE IF NOT EXISTS Productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

-- Crear tabla Clientes 
CREATE TABLE IF NOT EXISTS Clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL
);

-- Crear tabla Ventas
CREATE TABLE IF NOT EXISTS Ventas(
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cliente_asociado INT NOT NULL,
    total DECIMAL(10, 2),
    FOREIGN KEY (cliente_asociado) REFERENCES Clientes(id)
);

-- Crear tabla ProductosComprados
CREATE TABLE IF NOT EXISTS ProductosComprados (
    id SERIAL PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES Ventas(id),
    FOREIGN KEY (producto_id) REFERENCES Productos(id)
);

-- ***************************************************
-- CREA TABLAS PARA AUTENTICACION

-- Crear tabla Users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

-- Crear tabla Roles
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

-- Crear tabla Users_roles
CREATE TABLE IF NOT EXISTS users_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users) THEN
		INSERT INTO users (id, username, password) VALUES (1, 'admin','$2a$10$B8/uqjxHAh8pzFK8VKTioOthX3i7rABdNHM/H14q3PkLkN2dgnaGq');
		INSERT INTO users (id, username, password) VALUES (2, 'operador','$2a$10$lGy3KKVjpQciVomvVDT.NOHEU59B3WYZ63rq10.0mwIF4s194xQYq');
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM roles) THEN
		INSERT INTO roles (id, name) VALUES (1, 'ROLE_USER');
		INSERT INTO roles (id, name) VALUES (200, 'ROLE_ADMIN');
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users_roles) THEN
		INSERT INTO users_roles (user_id, role_id) VALUES (1, 200);
		INSERT INTO users_roles (user_id, role_id) VALUES (2, 1);
    END IF;
END
$$;

-- ***************************************************
-- INSERTAR DATOS DE PRUEBA DE OTROS ARCHIVOS

-- Incluir el script de inserción de datos de Clientes 
\i /docker-entrypoint-initdb.d/002-Clientes.sql

-- Incluir el script de inserción de datos de Clientes 
\i /docker-entrypoint-initdb.d/003-Productos.sql

-- Incluir el script de inserción de datos de Clientes 
\i /docker-entrypoint-initdb.d/004-Ventas.sql

-- Incluir el script de inserción de datos de Clientes 
\i /docker-entrypoint-initdb.d/005-ProductosComprados.sql


-- ***************************************************
-- FUNCIONES PARA CALCULAR TOTALES DE DATOS DE PRUEBA
CREATE OR REPLACE FUNCTION calcular_total_y_subtotal(p_venta_id INT) RETURNS VOID AS $$
BEGIN
    -- Actualizar subtotal
    UPDATE ProductosComprados SET subtotal = (SELECT precio FROM Productos WHERE Productos.id = ProductosComprados.producto_id) * cantidad
    WHERE ProductosComprados.venta_id = p_venta_id;

    -- Actualizar total
    UPDATE Ventas SET total = (SELECT SUM(subtotal) FROM ProductosComprados WHERE ProductosComprados.venta_id = p_venta_id)
    WHERE Ventas.id = p_venta_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calcular_totales_para_todas_las_ventas() RETURNS VOID AS $$
DECLARE
    venta RECORD;
BEGIN
    FOR venta IN SELECT id FROM Ventas LOOP
        PERFORM calcular_total_y_subtotal(venta.id);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

SELECT calcular_totales_para_todas_las_ventas();

