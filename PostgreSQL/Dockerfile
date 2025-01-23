# Utiliza la imagen oficial de PostgreSQL más reciente
FROM postgres:latest

# Configura las variables de entorno para PostgreSQL
ENV POSTGRES_USER=admin \
    POSTGRES_PASSWORD=admin \
    POSTGRES_DB=ventasdb

# Copia el script SQL de inicialización al directorio de entrada de Docker
COPY 001-init.sql /docker-entrypoint-initdb.d/001-init.sql
COPY 002-Clientes.sql /docker-entrypoint-initdb.d/002-Clientes.sql
COPY 003-Productos.sql /docker-entrypoint-initdb.d/003-Productos.sql
COPY 004-Ventas.sql /docker-entrypoint-initdb.d/004-Ventas.sql
COPY 005-ProductosComprados.sql /docker-entrypoint-initdb.d/005-ProductosComprados.sql