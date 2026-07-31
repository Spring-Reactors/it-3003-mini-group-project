package lk.ac.uoc.librarymanagementsystem.repository;

// Import the Category entity class
import lk.ac.uoc.librarymanagementsystem.entity.Category;

// Import JpaRepository to provide built-in CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Category entity.
 * JpaRepository<Category, Long> provides:
 * - Save a category
 * - Find a category by ID
 * - Retrieve all categories
 * - Update a category
 * - Delete a category
 * - And many other database operations without writing SQL
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Custom query methods can be added here if needed.
    // Example:
    // List<Category> findByCategoryName(String categoryName);

}