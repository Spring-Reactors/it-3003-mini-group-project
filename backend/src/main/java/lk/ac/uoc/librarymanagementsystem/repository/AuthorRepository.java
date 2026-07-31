package lk.ac.uoc.librarymanagementsystem.repository;

// Import the Author entity class
import lk.ac.uoc.librarymanagementsystem.entity.Author;

// Import JpaRepository to provide built-in CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for Author entity
public interface AuthorRepository extends JpaRepository<Author, Long> {
    // JpaRepository automatically provides methods such as:
    // save()
    // findById()
    // findAll()
    // deleteById()
    // existsById()
    // count()
    // No additional code is required unless custom queries are needed.
}