// Import React to enable JSX and component functionality
import React from 'react';

// Import the reusable EntityCrudPage component that provides full CRUD functionality
import EntityCrudPage from '../components/EntityCrudPage';

// Configuration array for reservation form fields.
const fields = [
    {
        name: 'member_id',           // API field name
        label: 'Member',             // Label shown on the dropdown
        type: 'select',              // Renders as a dropdown
        optionsEndpoint: '/members', // Loaded live from the database
        optionLabelField: 'full_name', // Text shown for each option
        linkedField: 'member_name',  // Auto-filled when a member is chosen
        numeric: true,
        required: true,              // Must select a member - validation rule
    },
    {
        name: 'member_name', // API field name
        label: 'Member Name',   // Display label
        type: 'text',       // Auto-filled, read-only
        readOnly: true,
    },
    {
        name: 'book_id',           // API field name
        label: 'Book',             // Label shown on the dropdown
        type: 'select',            // Renders as a dropdown
        optionsEndpoint: '/books', // Loaded live from the database
        optionLabelField: 'bookTitle', // Text shown for each option
        linkedField: 'book_title', // Auto-filled when a book is chosen
        numeric: true,
        required: true,            // Must select a book - validation rule
    },
    {
        name: 'book_title',  // API field name
        label: 'Book Title',    // Display label
        type: 'text',      // Auto-filled, read-only
        readOnly: true,
    },
    {
        name: 'reservation_date',         // API field name
        label: 'Reservation Date',        // Display Label
        type: 'text',                     // Date input with built-in date picker
        required: true,                   // Must select a date
        pattern: "^\\d{4}-\\d{2}-\\d{2}$" // Pattern
    },
    {
        name: 'status',  // API field name
        label: 'Status', // Display label
        type: 'select',  // Select dropdown with predefined options
        required: true,  // Must select a status - validation rule
        // Predefined status options with emoji icons for visual clarity
        options: [
            { value: 'Pending', label: '🟡 Pending' }, // Yellow circle - waiting
            { value: 'Started', label: '🟢 Started' }, // Green circle - active
            { value: 'Ended', label: '🔴 Ended' }      // Red circle - completed
        ],
    },
];

// Table columns: show friendly names instead of raw foreign-key IDs
const columns = [
    { field: 'id', label: 'ID' },
    { field: 'member_name', label: 'Member' },
    { field: 'book_title', label: 'Book' },
    { field: 'reservation_date', label: 'Date' },
    { field: 'status', label: 'Status' },
];

// Reservations Page Component
export default function Reservations() {
    return(
        // Render the reusable CRUD page with reservation-specific configuration
        <EntityCrudPage
            title="Reservations"      // Page title - displayed in the header and used in messages
            endpoint="/reservations"  // API base URL for CRUD operations
            fields={fields}           // Form field configuration
            columns={columns}         // Custom table columns (friendly names, not raw IDs)
        />
    );
}
