package com.revature;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication()
public class MtsBootApplication {

	public static void main(String[] args) {

//		SpringApplication.run(MtsBootApplication.class, args);

		ConfigurableApplicationContext configurableApplicationContext =
			SpringApplication.run(MtsBootApplication.class, args);


	}
}
