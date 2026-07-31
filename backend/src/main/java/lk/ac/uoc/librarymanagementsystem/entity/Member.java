package lk.ac.uoc.librarymanagementsystem.entity;

// Import JPA annotations for entity mapping
import jakarta.persistence.*;

// Import Lombok annotations to reduce boilerplate code
import lombok.*;

/**
 * Member Entity
 * Represents the "members" table in the database.
 */
@Entity
@Table(name = "members")
@Data                   // Generates getters, setters, toString(), equals(), and hashCode()
@NoArgsConstructor      // Generates a no-argument constructor
@AllArgsConstructor     // Generates a constructor with all fields
public class Member {

    // ==========================================================
    // Primary Key
    // ==========================================================

    // Auto-increment primary key for each member
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================================
    // Member Personal Details
    // ==========================================================

    // Stores the full name of the member
    private String full_name;

    // Stores the National Identity Card (NIC) number
    private String nic;

    // Stores the member's contact number
    private String contact_number;

    // Stores the member's email address
    private String email;


    // ==========================================================
    // Registration Details
    // ==========================================================

    // Stores the registration date of the member
    // Stored as plain text (yyyy-MM-dd) to match the date string
    // received from the frontend
    private String registration_date;
}