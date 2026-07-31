package lk.ac.uoc.librarymanagementsystem.entity;

// Import JPA annotations for entity mapping
import jakarta.persistence.*;

// Import Lombok annotations to reduce boilerplate code
import lombok.*;

/**
 * Reservation Entity
 * Represents the "reservations" table in the database.
 */
@Entity
@Table(name = "reservations")
@Data                   // Generates getters, setters, toString(), equals(), and hashCode()
@NoArgsConstructor      // Generates a no-argument constructor
@AllArgsConstructor     // Generates a constructor with all fields
public class Reservation {

    // ==========================================================
    // Primary Key
    // ==========================================================

    // Auto-increment primary key for each reservation
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================================
    // Member Details
    // ==========================================================

    // Stores the ID of the member who made the reservation
    private Long member_id;

    // Stores the member name for display purposes
    // Sent by the frontend together with member_id
    private String member_name;


    // ==========================================================
    // Book Details
    // ==========================================================

    // Stores the ID of the reserved book
    private Long book_id;

    // Stores the book title for display purposes
    // Sent by the frontend together with book_id
    private String book_title;


    // ==========================================================
    // Reservation Information
    // ==========================================================

    // Stores the reservation date
    // Stored as plain text (yyyy-MM-dd) to match the date string
    // received from the frontend
    private String reservation_date;

    // Stores the current reservation status
    // Example: Pending, Approved, Completed, Cancelled
    private String status;
}