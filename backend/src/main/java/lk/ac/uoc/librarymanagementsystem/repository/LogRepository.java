package lk.ac.uoc.librarymanagementsystem.repository;

// Import the Log entity class
import lk.ac.uoc.librarymanagementsystem.entity.Log;

// Import JpaRepository to provide built-in CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Log entity.
 * JpaRepository<Log, Long> provides:
 * - Save a log record
 * - Find a log record by ID
 * - Retrieve all log records
 * - Update a log record
 * - Delete a log record
 * - And many other database operations without writing SQL
 */
public interface LogRepository extends JpaRepository<Log, Long> {

    // Custom query methods can be added here if needed.
    // Example:
    // List<Log> findByMemberId(Long memberId);

}