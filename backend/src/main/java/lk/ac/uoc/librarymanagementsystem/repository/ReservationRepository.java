package lk.ac.uoc.librarymanagementsystem.repository;

// Import the Reservation entity class
import lk.ac.uoc.librarymanagementsystem.entity.Reservation;

// Import JpaRepository to provide built-in CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Reservation entity.
 * JpaRepository<Reservation, Long> provides:
 * - Save a reservation
 * - Find a reservation by ID
 * - Retrieve all reservations
 * - Update a reservation
 * - Delete a reservation
 * - And many other database operations without writing SQL queries
 */
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Custom query methods can be added here if required.
    // Example:
    // List<Reservation> findByMemberId(Long memberId);
    // List<Reservation> findByBookId(Long bookId);

}