package lk.ac.uoc.librarymanagementsystem.controller;

// Import the Member entity
import lk.ac.uoc.librarymanagementsystem.entity.Member;

// Import the Member repository
import lk.ac.uoc.librarymanagementsystem.repository.MemberRepository;

// Import validation support
import jakarta.validation.Valid;

// Import Spring Framework classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// Import Java Libraries
import java.util.List;

/**
 * REST Controller for Member operations.
 * Handles HTTP requests related to members.
 */
@RestController
@RequestMapping("/api/members")   // Base URL: /api/members
public class MemberController {

    // ==========================================================
    // Dependency Injection
    // ==========================================================

    // Inject the MemberRepository to perform database operations
    @Autowired
    private MemberRepository repository;


    // ==========================================================
    // Retrieve All Members (GET)
    // ==========================================================

    // GET /api/members
    // Returns a list of all members stored in the database
    @GetMapping
    public List<Member> getAll() {
        return repository.findAll();
    }


    // ==========================================================
    // Create a New Member (POST)
    // ==========================================================

    // POST /api/members
    // Saves a new member after validating the request body
    @PostMapping
    public Member create(@Valid @RequestBody Member member) {
        return repository.save(member);
    }


    // ==========================================================
    // Update an Existing Member (PUT)
    // ==========================================================

    // PUT /api/members/{id}
    // Updates the member with the given ID if it exists
    @PutMapping("/{id}")
    public ResponseEntity<Member> update(@PathVariable Long id,
                                         @Valid @RequestBody Member updated) {

        return repository.findById(id)
                .map(existing -> {

                    // Keep the original member ID during the update
                    updated.setId(id);

                    // Save the updated member details
                    return ResponseEntity.ok(repository.save(updated));
                })

                // Return HTTP 404 if the member does not exist
                .orElse(ResponseEntity.notFound().build());
    }


    // ==========================================================
    // Delete a Member (DELETE)
    // ==========================================================

    // DELETE /api/members/{id}
    // Deletes the member with the given ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        // Check whether the member exists before deleting
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Delete the member from the database
        repository.deleteById(id);

        // Return HTTP 204 (No Content) after successful deletion
        return ResponseEntity.noContent().build();
    }
}