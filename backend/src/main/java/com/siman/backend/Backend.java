/**
 * @author Mario Efrain Moreno Cartagena
 * email: morenocartagena@outlook.com
 */

package com.siman.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;


//@OpenAPIDefinition
@EnableAspectJAutoProxy
@EnableScheduling
@SpringBootApplication
//@EntityScan(basePackages = {"com.siman.backend.entities"})
public class Backend {

    public static void main(String[] args) {
    SpringApplication.run(Backend.class, args);

    }

}
