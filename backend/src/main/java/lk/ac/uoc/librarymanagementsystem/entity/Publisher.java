package lk.ac.uoc.librarymanagementsystem.entity;

// Import JPA annotations for entity mapping
import jakarta.persistence.*;

// Import Lombok annotations to reduce boilerplate code
import lombok.*;

/**
 * Publisher Entity
 * Represents the "publishers" table in the database.
 */
@Entity
@Table(name = "publishers")
@Data                   // Generates getters, setters, toString(), equals(), and hashCode()
@NoArgsConstructor      // Generates a no-argument constructor
@AllArgsConstructor     // Generates a constructor with all fields
public class Publisher {

    // ==========================================================
    // Primary Key
    // ==========================================================

    // Auto-increment primary key for each publisher
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================================
    // Publisher Details
    // ==========================================================

    // Stores the name of the publisher
    private String publisher_name;

    // Stores the address of the publisher
    private String address;

    // Stores the contact number of the publisher
    private String contact_number;

    // Stores the email address of the publisher
    private String email;
}