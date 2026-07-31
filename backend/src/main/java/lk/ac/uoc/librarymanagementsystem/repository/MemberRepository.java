package lk.ac.uoc.librarymanagementsystem.repository;

// Import the Member entity class
import lk.ac.uoc.librarymanagementsystem.entity.Member;

// Import JpaRepository to provide built-in CRUD operations
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for the Member entity.
 * JpaRepository<Member, Long> provides:
 * - Save a member
 * - Find a member by ID
 * - Retrieve all members
 * - Update a member
 * - Delete a member
 * - And many other database operations without writing SQL queries
 */
public interface MemberRepository extends JpaRepository<Member, Long> {

    // Custom query methods can be added here if required.
    // Example:
    // List<Member> findByFullName(String fullName);

}