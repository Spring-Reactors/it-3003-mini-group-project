package lk.ac.uoc.librarymanagementsystem.controller;

// Import the Publisher entity
import lk.ac.uoc.librarymanagementsystem.entity.Publisher;

// Import the Publisher repository
import lk.ac.uoc.librarymanagementsystem.repository.PublisherRepository;

// Import validation support
import jakarta.validation.Valid;

// Import Spring Framework classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Import Java Libraries
import java.util.List;

/**
 * REST Controller for Publisher operations.
 * Handles HTTP requests related to publishers.
 */
@RestController
@RequestMapping("/api/publishers")   // Base URL: /api/publishers
public class PublisherController {

    // ==========================================================
    // Dependency Injection
    // ==========================================================

    // Inject the PublisherRepository to perform database operations
    @Autowired
    private PublisherRepository repository;


    // ==========================================================
    // Retrieve All Publishers (GET)
    // ==========================================================

    // GET /api/publishers
    // Returns a list of all publishers stored in the database
    @GetMapping
    public List<Publisher> getAll() {
        return repository.findAll();
    }


    // ==========================================================
    // Create a New Publisher (POST)
    // ==========================================================

    // POST /api/publishers
    // Saves a new publisher after validating the request body
    @PostMapping
    public Publisher create(@Valid @RequestBody Publisher publisher) {
        return repository.save(publisher);
    }


    // ==========================================================
    // Update an Existing Publisher (PUT)
    // ==========================================================

    // PUT /api/publishers/{id}
    // Updates the publisher with the given ID if it exists
    @PutMapping("/{id}")
    public ResponseEntity<Publisher> update(@PathVariable Long id,
                                            @Valid @RequestBody Publisher updated) {

        return repository.findById(id)
                .map(existing -> {

                    // Keep the original publisher ID during the update
                    updated.setId(id);

                    // Save the updated publisher details
                    return ResponseEntity.ok(repository.save(updated));
                })

                // Return HTTP 404 if the publisher does not exist
                .orElse(ResponseEntity.notFound().build());
    }


    // ==========================================================
    // Delete a Publisher (DELETE)
    // ==========================================================

    // DELETE /api/publishers/{id}
    // Deletes the publisher with the given ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        // Check whether the publisher exists before deleting
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Delete the publisher from the database
        repository.deleteById(id);

        // Return HTTP 204 (No Content) after successful deletion
        return ResponseEntity.noContent().build();
    }
}