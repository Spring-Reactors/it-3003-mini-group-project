package lk.ac.uoc.librarymanagementsystem.repository;

// Import the Book entity class
import lk.ac.uoc.librarymanagementsystem.entity.Book;

// Import JpaRepository to provide built-in CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Book entity.
 * JpaRepository<Book, Long> provides:
 * - Save a book
 * - Find a book by ID
 * - Retrieve all books
 * - Update a book
 * - Delete a book
 * - And many other database operations without writing SQL
 */
public interface BookRepository extends JpaRepository<Book, Long> {

    // Custom query methods can be added here if needed.
    // Example:
    // List<Book> findByTitle(String title);

}