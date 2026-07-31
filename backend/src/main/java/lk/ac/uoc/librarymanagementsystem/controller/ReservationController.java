package lk.ac.uoc.librarymanagementsystem.controller;

// Import the Reservation entity
import lk.ac.uoc.librarymanagementsystem.entity.Reservation;

// Import the Reservation repository
import lk.ac.uoc.librarymanagementsystem.repository.ReservationRepository;

// Import validation support
import jakarta.validation.Valid;

// Import Spring Framework classes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Reservation operations.
 * Handles HTTP requests related to reservations.
 */
@RestController
@RequestMapping("/api/reservations")   // Base URL: /api/reservations
public class ReservationController {

    // ==========================================================
    // Dependency Injection
    // ==========================================================

    // Inject the ReservationRepository to perform database operations
    @Autowired
    private ReservationRepository repository;


    // ==========================================================
    // Retrieve All Reservations (GET)
    // ==========================================================

    // GET /api/reservations
    // Returns a list of all reservation records stored in the database
    @GetMapping
    public List<Reservation> getAll() {
        return repository.findAll();
    }


    // ==========================================================
    // Create a New Reservation (POST)
    // ==========================================================

    // POST /api/reservations
    // Saves a new reservation after validating the request body
    @PostMapping
    public Reservation create(@Valid @RequestBody Reservation reservation) {
        return repository.save(reservation);
    }


    // ==========================================================
    // Update an Existing Reservation (PUT)
    // ==========================================================

    // PUT /api/reservations/{id}
    // Updates the reservation with the given ID if it exists
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> update(@PathVariable Long id,
                                              @Valid @RequestBody Reservation updated) {

        return repository.findById(id)
                .map(existing -> {

                    // Keep the original reservation ID during the update
                    updated.setId(id);

                    // Save the updated reservation details
                    return ResponseEntity.ok(repository.save(updated));
                })

                // Return HTTP 404 if the reservation does not exist
                .orElse(ResponseEntity.notFound().build());
    }


    // ==========================================================
    // Delete a Reservation (DELETE)
    // ==========================================================

    // DELETE /api/reservations/{id}
    // Deletes the reservation with the given ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        // Check whether the reservation exists before deleting
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Delete the reservation from the database
        repository.deleteById(id);

        // Return HTTP 204 (No Content) after successful deletion
        return ResponseEntity.noContent().build();
    }
}