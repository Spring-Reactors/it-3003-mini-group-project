package lk.ac.uoc.librarymanagementsystem.controller;

// Import Author entity
import lk.ac.uoc.librarymanagementsystem.entity.Author;

// Import validation support for request body validation
import jakarta.validation.Valid;

// Import Author repository for database operations
import lk.ac.uoc.librarymanagementsystem.repository.AuthorRepository;

// Import Spring Framework classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Import Java Libraries
import java.util.List;

// REST Controller for handling Author-related API requests
@RestController

// Base URL for all Author endpoints
@RequestMapping("/api/authors")
public class AuthorController {

    // Inject AuthorRepository for database access
    @Autowired
    private AuthorRepository repository;


    // Retrieve all authors
    @GetMapping
    public List<Author> getAll() {
        return repository.findAll();
    }


    // Create a new author
    // @Valid ensures entity validation before saving
    @PostMapping
    public Author create(@Valid @RequestBody Author author) {
        return repository.save(author);
    }


    // Update an existing author by ID
    @PutMapping("/{id}")
    public ResponseEntity<Author> update(@PathVariable Long id, @Valid @RequestBody Author updated) {
        return repository.findById(id)
                .map(existing -> {
                    updated.setId(id);
                    return ResponseEntity.ok(repository.save(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // Delete an author by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        // Return 404 if the author does not exist
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Delete the author and return HTTP 204 (No Content)
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}