package lk.ac.uoc.librarymanagementsystem;

// Import Spring Boot application runner class
import org.springframework.boot.SpringApplication;

// Import annotation that enables Spring Boot features and component scanning
import org.springframework.boot.autoconfigure.SpringBootApplication;


// Main Spring Boot Application Class
@SpringBootApplication
public class LibrarymanagementsystemApplication {


	// Main method: Entry point of the Spring Boot application
	public static void main(String[] args) {

		// Starts the Spring Boot application
		// Initializes Spring container and loads application configuration
		SpringApplication.run(LibrarymanagementsystemApplication.class, args);
	}

}