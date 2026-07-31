package lk.ac.uoc.librarymanagementsystem.controller;

// Import the Log entity
import lk.ac.uoc.librarymanagementsystem.entity.Log;

// Import the Log repository
import lk.ac.uoc.librarymanagementsystem.repository.LogRepository;

// Import validation support
import jakarta.validation.Valid;

// Import Spring Framework classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Import Java Libraries
import java.util.List;

/**
 * REST Controller for Log operations.
 * Handles HTTP requests related to log records.
 */
@RestController
@RequestMapping("/api/logs")   // Base URL: /api/logs
public class LogController {

    // ==========================================================
    // Dependency Injection
    // ==========================================================

    // Inject the LogRepository to perform database operations
    @Autowired
    private LogRepository repository;


    // ==========================================================
    // Retrieve All Log Records (GET)
    // ==========================================================

    // GET /api/logs
    // Returns a list of all log records in the database
    @GetMapping
    public List<Log> getAll() {
        return repository.findAll();
    }


    // ==========================================================
    // Create a New Log Record (POST)
    // ==========================================================

    // POST /api/logs
    // Saves a new log record after validating the request body
    @PostMapping
    public Log create(@Valid @RequestBody Log log) {
        return repository.save(log);
    }


    // ==========================================================
    // Update an Existing Log Record (PUT)
    // ==========================================================

    // PUT /api/logs/{id}
    // Updates the log record with the given ID if it exists
    @PutMapping("/{id}")
    public ResponseEntity<Log> update(@PathVariable Long id,
                                      @Valid @RequestBody Log updated) {

        return repository.findById(id)
                .map(existing -> {

                    // Ensure the existing ID is retained
                    updated.setId(id);

                    // Save the updated log record
                    return ResponseEntity.ok(repository.save(updated));
                })

                // Return HTTP 404 if the log record does not exist
                .orElse(ResponseEntity.notFound().build());
    }


    // ==========================================================
    // Delete a Log Record (DELETE)
    // ==========================================================

    // DELETE /api/logs/{id}
    // Deletes the specified log record if it exists
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        // Check whether the log record exists
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Delete the log record
        repository.deleteById(id);

        // Return HTTP 204 (No Content)
        return ResponseEntity.noContent().build();
    }
}