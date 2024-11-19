package minha.api.voos_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("model")
@ComponentScan(basePackages = "controller")
@EnableJpaRepositories("repositorios")
public class ApiDeVoosApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiDeVoosApplication.class, args);
    }
}
