package lk.ac.uoc.librarymanagementsystem.entity;

// Import JPA annotations for entity mapping
import jakarta.persistence.*;

// Import validation annotations
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

// Import Lombok annotations to reduce boilerplate code
import lombok.*;

// Marks this class as a JPA entity
@Entity

// Maps this entity to the "authors" table
@Table(name = "authors")

// Lombok: Generates getters, setters, toString(), equals(), and hashCode()
@Data

// Lombok: Generates a no-argument constructor
@NoArgsConstructor

// Lombok: Generates a constructor with all fields
@AllArgsConstructor
public class Author {

    // Primary Key (Auto Increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Full Name (Maximum 200 characters)
    @Column(name = "full_name", nullable = false, length = 200)
    @Size(max = 200)
    private String fullName;

    // Country (Maximum 200 characters)
    @Column(name = "country", nullable = false, length = 200)
    @Size(max = 200)
    private String country;

    // Email (Must be unique and in a valid email format)
    @Column(name = "email", nullable = false, unique = true, length = 200)
    @Email
    @Size(max = 200)
    private String email;
}