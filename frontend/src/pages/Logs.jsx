// Import React to enable JSX and component functionality
import React from 'react';

// Import the reusable EntityCrudPage component that provides full CRUD functionality
import EntityCrudPage from '../components/EntityCrudPage';

// Configuration array for Logs form fields.
const fields = [
    {
        name: 'member_id',            // API field name
        label: 'Member',              // Label shown on the dropdown
        type: 'select',               // Renders as a dropdown
        optionsEndpoint: '/members',  // Loaded live from the database
        optionLabelField: 'full_name', // Text shown for each option
        linkedField: 'member_name',   // Auto-filled when a member is chosen
        numeric: true,
        required: true,               // Must select a member
    },
    {
        name: 'member_name',    // API field name
        label: 'Member Name',   // Display label
        type: 'text',           // Auto-filled, read-only
        readOnly: true,
    },
    {
        name: 'date',                     // API field name
        label: 'Date',                    // Display Label
        type: 'text',                     // Date input with built-in date picker
        required: true,                   // Must select a date
        pattern: "^\\d{4}-\\d{2}-\\d{2}$" // Pattern
    },
    {
        name: 'in_time',              // API field name
        label: 'In Time',             // Display label
        type: 'time',                 // Time input with built-in time picker
        required: true,               // Must select a time
    },
    {
        name: 'out_time',             // API field name
        label: 'Out Time',            // Display label
        type: 'time',                 // Time input with built-in time picker
        required: true,               // Must select a time
    },
    {
        name: 'status',               // API field name
        label: 'Status',              // Display label
        type: 'select',               // Select dropdown with predefined options
        required: true,               // Must select a status
        options: [                    // Predefined status options
            { value: 'Ongoing', label: '🟢 Ongoing' },  // Member is currently present
            { value: 'Ended', label: '🔴 Ended' }       // Member has left/completed
        ],
    },
];

// Table columns: show friendly names instead of raw foreign-key IDs
const columns = [
    { field: 'id', label: 'ID' },
    { field: 'member_name', label: 'Member' },
    { field: 'date', label: 'Date' },
    { field: 'in_time', label: 'In Time' },
    { field: 'out_time', label: 'Out Time' },
    { field: 'status', label: 'Status' },
];

export default function Logs() {
    // Render the reusable CRUD page with log-specific configuration
    return(
        <EntityCrudPage
            // Page title and plural entity name
            title="Logs"
            // API base URL for CRUD operations
            endpoint="/logs"
            // Form field configuration
            fields={fields}
            // Custom table columns (friendly names, not raw IDs)
            columns={columns} />
    );
}
