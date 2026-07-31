// Import React to enable JSX and component functionality
import React from 'react';

// Import the reusable EntityCrudPage component that provides full CRUD functionality
import EntityCrudPage from '../components/EntityCrudPage';

// Configuration array for author form fields
const fields = [
    {
        // API field name
        name: 'fullName',
        // Human-readable label
        label: 'Full Name',
        // Text input type
        type: 'text',
        // Database varchar(200) limit
        maxLength: 200,
        // Must be filled before submission
        required: true
    },
    {
        // API field name
        name: 'country',
        // Human-readable label
        label: 'Country',
        // Text input type
        type: 'text',
        // Database varchar(200) limit
        maxLength: 200,
        // Must be filled
        required: true
    },
    {
        // API field name
        name: 'email',
        // Human-readable label
        label: 'Email',
        // Email input type with built-in validation
        type: 'email',
        // Database varchar(200) limit
        maxLength: 200,
        // Must be filled
        required: true
    },
];

//  Authors Page Component
export default function Authors() {
    return(
        // Render the reusable CRUD page with author-specific configuration
        <EntityCrudPage
            title="Authors"      // Page title and plural entity name
            endpoint="/authors"  // API base URL for CRUD operations
            fields={fields}      // Form field configuration
        />
    );
}