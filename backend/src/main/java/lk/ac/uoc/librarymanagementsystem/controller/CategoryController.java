package lk.ac.uoc.librarymanagementsystem.controller;

// Import the Category entity
import lk.ac.uoc.librarymanagementsystem.entity.Category;

// Import validation support
import jakarta.validation.Valid;

// Import the Category repository
import lk.ac.uoc.librarymanagementsystem.repository.CategoryRepository;

// Import Spring Framework classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Import Java Libraries
import java.util.List;

/**
 * REST Controller for Category operations.
 * Handles HTTP requests related to categories.
 */
@RestController
@RequestMapping("/api/categories")   // Base URL: /api/categories
public class CategoryController {

    // ==========================================================
    // Dependency Injection
    // ==========================================================

    // Inject the CategoryRepository to perform database operations
    @Autowired
    private CategoryRepository repository;


    // ==========================================================
    // Retrieve All Categories (GET)
    // ==========================================================

    // GET /api/categories
    // Returns a list of all categories in the database
    @GetMapping
    public List<Category> getAll() {
        return repository.findAll();
    }


    // ==========================================================
    // Create a New Category (POST)
    // ==========================================================

    // POST /api/categories
    // Saves a new category after validating the request body
    @PostMapping
    public Category create(@Valid @RequestBody Category category) {
        return repository.save(category);
    }


    // ==========================================================
    // Update an Existing Category (PUT)
    // ==========================================================

    // PUT /api/categories/{id}
    // Updates the category with the given ID if it exists
    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Long id,
                                           @Valid @RequestBody Category updated) {

        return repository.findById(id)
                .map(existing -> {

                    // Ensure the existing ID is retained
                    updated.setId(id);

                    // Save the updated category
                    return ResponseEntity.ok(repository.save(updated));
                })

                // Return HTTP 404 if the category does not exist
                .orElse(ResponseEntity.notFound().build());
    }


    // ==========================================================
    // Delete a Category (DELETE)
    // ==========================================================

    // DELETE /api/categories/{id}
    // Deletes the specified category if it exists
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        // Check whether the category exists
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Delete the category
        repository.deleteById(id);

        // Return HTTP 204 (No Content)
        return ResponseEntity.noContent().build();
    }
}