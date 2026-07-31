package lk.ac.uoc.librarymanagementsystem.entity;

// Import JPA annotations for entity mapping
import jakarta.persistence.*;

// Import Lombok annotations to reduce boilerplate code
import lombok.*;

/**
 * Log Entity
 * Represents the "logs" table in the database.
 */
@Entity
@Table(name = "logs")
@Data                   // Generates getters, setters, toString(), equals(), and hashCode()
@NoArgsConstructor      // Generates a no-argument constructor
@AllArgsConstructor     // Generates a constructor with all fields
public class Log {

    // ==========================================================
    // Primary Key
    // ==========================================================

    // Auto-increment primary key for each log record
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================================
    // Member Details
    // ==========================================================

    // Stores the ID of the member
    private Long member_id;

    // Stores the member's name
    // Sent by the frontend together with the member ID
    private String member_name;


    // ==========================================================
    // Attendance Details
    // ==========================================================

    // Stores the log date as plain text
    private String date;

    // Stores the check-in time
    private String in_time;

    // Stores the check-out time
    private String out_time;

    // Stores the attendance status
    private String status;
}