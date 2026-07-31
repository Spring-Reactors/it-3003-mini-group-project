// Import React to enable JSX and component functionality
import React from 'react';

// Import the reusable EntityCrudPage component that provides full CRUD functionality
import EntityCrudPage from '../components/EntityCrudPage';

// Configuration array for category form fields.
const fields = [
    {
        name: 'category_name', // API field name
        label: 'Category Name', // Human-readable label
        type: 'text', // Text input type
        maxLength: 200, // Database varchar(200) limit
        required: true // Must be filled before submission
    },
    {
        name: 'description', // API field name
        label: 'Description', // Human-readable label
        type: 'text', // Text input type
        fullWidth: true, // Takes full width of the form (12 columns)
        maxLength: 500 // Database varchar(500) limit
    }
];

// This page renders a full CRUD (Create, Read, Update, Delete) interface
export default function Categories() {
    // Render the reusable CRUD page with category-specific configuration
    return(
        <EntityCrudPage
            // Page title and plural entity name
            title="Categories"
            // API base URL for CRUD operations
            endpoint="/categories"
            // Form field configuration
            fields={fields} />
    );
}