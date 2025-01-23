/**
 * @author Mario Efrain Moreno Cartagena
 * email: morenocartagena@outlook.com
 */

package com.siman.backend.configuration;

import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.info.*;
import io.swagger.v3.oas.annotations.servers.Server;
//import io.swagger.v3.oas.annotations.OpenAPIDefinition;
//import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
        info = @Info(
                title = "Backend",
                description = "API Sistema de Ventas",
                version = "1.0.0",
                contact = @Contact(
                        name = "Mario Efraín Moreno Cartagena",
                        url = "https://github.com/morenocartagena",
                        email = "morenocartagena@outlook.com"                
                )
        ),
        servers = {
            @Server(
                    description = "DEV SERVER",
                    url = "http://localhost:8080/siman"
            ),
            @Server(
                    description = "PROD SERVER",
                    url = "http://pending:8088/siman"
            )         
        }      
)
public class SwaggerConfig {}
