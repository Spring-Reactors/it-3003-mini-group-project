package lk.ac.uoc.librarymanagementsystem.controller;

// Import the Book entity
import lk.ac.uoc.librarymanagementsystem.entity.Book;

// Import the Book repository
import lk.ac.uoc.librarymanagementsystem.repository.BookRepository;

// Import validation support
import jakarta.validation.Valid;

// Import Spring Framework classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Import Java Libraries
import java.util.List;

/**
 * REST Controller for Book operations.
 * Handles HTTP requests related to books.
 */
@RestController
@RequestMapping("/api/books")   // Base URL: /api/books
public class BookController {

    // ==========================================================
    // Dependency Injection
    // ==========================================================

    // Inject the BookRepository to perform database operations
    @Autowired
    private BookRepository repository;


    // ==========================================================
    // Retrieve All Books (GET)
    // ==========================================================

    // GET /api/books
    // Returns a list of all books in the database
    @GetMapping
    public List<Book> getAll() {
        return repository.findAll();
    }


    // ==========================================================
    // Create a New Book (POST)
    // ==========================================================

    // POST /api/books
    // Saves a new book after validating the request body
    @PostMapping
    public Book create(@Valid @RequestBody Book book) {
        return repository.save(book);
    }


    // ==========================================================
    // Update an Existing Book (PUT)
    // ==========================================================

    // PUT /api/books/{id}
    // Updates the book with the given ID if it exists
    @PutMapping("/{id}")
    public ResponseEntity<Book> update(@PathVariable Long id,
                                       @Valid @RequestBody Book updated) {

        return repository.findById(id)
                .map(existing -> {
                    // Ensure the existing ID is retained
                    updated.setId(id);

                    // Save the updated book
                    return ResponseEntity.ok(repository.save(updated));
                })

                // Return 404 if the book does not exist
                .orElse(ResponseEntity.notFound().build());
    }


    // ==========================================================
    // Delete a Book (DELETE)
    // ==========================================================

    // DELETE /api/books/{id}
    // Deletes the specified book if it exists
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        // Check whether the book exists
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Delete the book
        repository.deleteById(id);

        // Return HTTP 204 (No Content)
        return ResponseEntity.noContent().build();
    }
}