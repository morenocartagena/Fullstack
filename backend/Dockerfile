# Usa una imagen base de Amazon Corretto para Java 21
FROM amazoncorretto:21-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR generado en el contenedor
COPY target/backend-1.0.0.jar backend-1.0.0.jar

# Expone el puerto en el que corre la aplicación
EXPOSE 8080

# Define el comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "backend-1.0.0.jar"]