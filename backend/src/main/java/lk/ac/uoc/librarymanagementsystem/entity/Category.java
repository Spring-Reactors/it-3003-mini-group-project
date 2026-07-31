package lk.ac.uoc.librarymanagementsystem.entity;

// Import JPA annotations for entity mapping
import jakarta.persistence.*;

// Import Lombok annotations to reduce boilerplate code
import lombok.*;

/**
 * Category Entity
 * Represents the "categories" table in the database.
 */
@Entity
@Table(name = "categories")
@Data                   // Generates getters, setters, toString(), equals(), and hashCode()
@NoArgsConstructor      // Generates a no-argument constructor
@AllArgsConstructor     // Generates a constructor with all fields
public class Category {

    // ==========================================================
    // Primary Key
    // ==========================================================

    // Auto-increment primary key for each category
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================================
    // Category Details
    // ==========================================================

    // Name of the category
    private String category_name;

    // Description of the category
    private String description;
}