package lk.ac.uoc.librarymanagementsystem.repository;

// Import the Publisher entity class
import lk.ac.uoc.librarymanagementsystem.entity.Publisher;

// Import JpaRepository to provide built-in CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Publisher entity.
 * JpaRepository<Publisher, Long> provides:
 * - Save a publisher
 * - Find a publisher by ID
 * - Retrieve all publishers
 * - Update a publisher
 * - Delete a publisher
 * - And many other database operations without writing SQL queries
 */
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    // Custom query methods can be added here if required.
    // Example:
    // List<Publisher> findByPublisherName(String publisherName);

}