package yrx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = {"yrx"})
@EntityScan(basePackages = {"yrx"})
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(yrx.Application.class, args);
    }
}
