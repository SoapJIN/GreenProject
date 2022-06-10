package com.green.computer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Springboot0419Application {

	public static void main(String[] args) {
		SpringApplication.run(Springboot0419Application.class, args);
	}

}
