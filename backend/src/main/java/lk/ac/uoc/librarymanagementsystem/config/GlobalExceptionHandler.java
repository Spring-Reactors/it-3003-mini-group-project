package lk.ac.uoc.librarymanagementsystem.config;

// Import HTTP status codes and response handling classes
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

// Import validation exception class for handling @Valid errors
import org.springframework.web.bind.MethodArgumentNotValidException;

// Import annotations for exception handling
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Import Java Libraries
import java.util.LinkedHashMap;
import java.util.Map;

// Global exception handler class
// Handles exceptions thrown by all REST controllers in the application,
// and returns consistent JSON error responses
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handles validation errors caused by @Valid annotation
    // Example: Invalid email, missing required fields, exceeded length limits
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(
            MethodArgumentNotValidException ex) {

        // Stores the complete error response body
        Map<String, Object> body = new LinkedHashMap<>();

        // Add HTTP status information to the response
        body.put("status", HttpStatus.BAD_REQUEST.value());

        // Add general error message
        body.put("error", "Validation failed");

        // Stores individual field validation errors
        Map<String, String> fieldErrors = new LinkedHashMap<>();

        // Extract validation errors for each field
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(fe ->
                    fieldErrors.put(
                            fe.getField(),
                            fe.getDefaultMessage()
                    )
        );

        // Add field-specific errors to response
        body.put("fields", fieldErrors);

        // Return HTTP 400 response with validation error details
        return ResponseEntity.badRequest().body(body);

    }
}
