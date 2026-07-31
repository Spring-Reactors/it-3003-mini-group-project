// Import React to enable JSX and component functionality
import React from 'react';

// Import the reusable EntityCrudPage component that provides full CRUD functionality
import EntityCrudPage from '../components/EntityCrudPage';

// Configuration array for publisher form fields.
const fields = [
    {
        name: 'publisher_name',  // API field name / database column
        label: 'Publisher Name', // Display label shown to users
        type: 'text',            // Standard text input
        maxLength: 200,          // Database VARCHAR(200) limit
        required: true,          // Must be filled before submission
    },
    {
        name: 'address',         // API field name
        label: 'Address',        // Display label
        type: 'text',            // Text input type
        maxLength: 200,          // Database VARCHAR(200) limit
        fullWidth: true,         // Takes full width of the form (12 columns)
    },
    {
        name: 'contact_number',  // API field name
        label: 'Contact Number', // Display label
        type: 'text',            // Text input to allow special characters (+, spaces)
        maxLength: 12,           // Maximum 12 characters (including + and spaces)
        pattern: "^(\\+94\\s\\d{9}|0\\d{9}|0\\d{2}\\s\\d{7})$", // Sri Lankan Phone Number
    },
    {
        name: 'email',           // API field name
        label: 'Email',          // Human-readable label
        type: 'email',           // Email input type with built-in HTML5 validation
        maxLength: 200,          // Database VARCHAR(200) limit
    },
];

// Publishers Page Component
export default function Publishers() {
    return(
        // Render the reusable CRUD page with publisher-specific configuration
        <EntityCrudPage
            // Page title and plural entity name
            title="Publishers"
            // All endpoints derive from this
            endpoint="/publishers"
            // Form field configuration
            fields={fields}
        />
    );
}