package lk.ac.uoc.librarymanagementsystem.entity;

// Import JPA annotations for entity mapping
import jakarta.persistence.*;

// Import validation annotations
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

// Import Lombok annotations to reduce boilerplate code
import lombok.*;

/**
 * Book Entity
 * Represents the "books" table in the database.
 */
@Entity
@Table(name = "books")
@Data                   // Generates getters, setters, toString(), equals(), and hashCode()
@NoArgsConstructor      // Generates a no-argument constructor
@AllArgsConstructor     // Generates a constructor with all fields
public class Book {

    // ==========================================================
    // Primary Key
    // ==========================================================

    // Auto-increment primary key for each book
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // ==========================================================
    // Publisher Details
    // ==========================================================

    // Stores the publisher ID
    private Long publisherId;

    // Stores the publisher name (maximum 200 characters)
    @Size(max = 200)
    private String publisherName;


    // ==========================================================
    // Author Details
    // ==========================================================

    // Stores the author ID
    private Long authorId;

    // Stores the author name (maximum 200 characters)
    @Size(max = 200)
    private String authorName;


    // ==========================================================
    // Category Details
    // ==========================================================

    // Stores the category ID
    private Long categoryId;

    // Stores the category name (maximum 200 characters)
    // This is mainly used for displaying data sent by the frontend.
    @Size(max = 200)
    private String categoryName;


    // ==========================================================
    // Book Information
    // ==========================================================

    // Number of available copies (must be between 1 and 100)
    @Min(1)
    @Max(100)
    private Integer quantity;

    // Title of the book (maximum 200 characters)
    @Size(max = 200)
    private String bookTitle;
}