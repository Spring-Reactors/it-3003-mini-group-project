// Import React to enable JSX and component functionality
import React from 'react';

// Import the reusable EntityCrudPage component that provides full CRUD functionality
import EntityCrudPage from '../components/EntityCrudPage';

// Configuration array for member form fields.
const fields = [
    {
        name: 'full_name',  // API field name
        label: 'Full Name', // Display label shown to users
        type: 'text',       // Standard text input
        maxLength: 100,     // Database VARCHAR(100) limit
        required: true      // Must be filled before submission
    },
    {
        name: 'nic',         // API field name (National Identity Card)
        label: 'NIC Number', // Display label
        type: 'text',        // Text input type
        required: true,      // Mandatory field - every member must have an NIC
        maxLength: 12,       // Maximum 12 characters (10 digits for old NIC, 12 for new)
        pattern: "^([0-9]{9}[VvXx]|[0-9]{12})$" // Regex validation for Sri Lankan NIC format
    },
    {
        name: 'contact_number',  // API field name
        label: 'Contact Number', // Display label
        maxLength: 12,           // Maximum 12 characters (including spaces and +)
        type: 'text',            // Text input to allow special characters (+, spaces)
        pattern: "^(\\+94\\s\\d{9}|0\\d{9}|0\\d{2}\\s\\d{7})$" // Sri Lankan phone number format
    },
    {
        name: 'email',  // API field name
        label: 'Email', // Human-readable label
        type: 'email',  // Email input type with built-in HTML5 validation
        maxLength: 200  // Database VARCHAR(200) limit
    },
    {
        name: 'registration_date',         // API field name
        label: 'Registration Date',        // Display Label
        type: 'text',                     // Date input with built-in date picker
        required: true,                   // Must select a date
        pattern: "^\\d{4}-\\d{2}-\\d{2}$" // Pattern
    },
];

// Members Page Component
export default function Members() {
    return(
        // Render the reusable CRUD page with member-specific configuration
        <EntityCrudPage
            title="Members"      // Page title and plural entity name
            endpoint="/members"  // API base URL for CRUD operations
            fields={fields}      // Form field configuration with validation
        />