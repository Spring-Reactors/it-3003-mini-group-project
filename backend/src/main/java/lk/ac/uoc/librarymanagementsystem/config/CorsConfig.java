package lk.ac.uoc.librarymanagementsystem.config;

// Import Spring annotation to mark this class as a configuration class
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Import classes required for configuring Cross-Origin Resource Sharing (CORS)
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Configuration class for handling CORS settings
@Configuration
public class CorsConfig {

    // Creates a WebMvcConfigurer bean to customize Spring MVC configurations
    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            // Configure CORS rules for API endpoints
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                // Allow frontend applications to access backend APIs
                registry.addMapping("/api/**")

                        // Allow requests from React frontend running on localhost:3000
                        .allowedOrigins("http://localhost:3000")

                        // Allow required HTTP methods for CRUD operations
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")

                        // Allow all request headers
                        .allowedHeaders("*");
            }
        };
    }
}