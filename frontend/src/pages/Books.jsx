// Import React to enable JSX and component functionality
import React from 'react';

// Import the reusable EntityCrudPage component that provides full CRUD functionality
import EntityCrudPage from '../components/EntityCrudPage';

// Configuration array for book form fields.
const fields = [
    {
        name: 'publisherId',              // API field name
        label: 'Publisher',               // Label shown on the dropdown
        type: 'select',                   // Renders as a dropdown
        optionsEndpoint: '/publishers',   // Loaded live from the database
        optionLabelField: 'publisher_name', // Text shown for each option
        linkedField: 'publisherName',     // Auto-filled when a publisher is chosen
        numeric: true,
        required: true,                   // Must select a publisher
    },
    {
        name: 'publisherName',   // API field name
        label: 'Publisher Name', // Display label
        type: 'text',            // Auto-filled, read-only
        readOnly: true,
    },
    {
        name: 'authorId',            // API field name
        label: 'Author',              // Label shown on the dropdown
        type: 'select',               // Renders as a dropdown
        optionsEndpoint: '/authors',  // Loaded live from the database
        optionLabelField: 'fullName', // Text shown for each option
        linkedField: 'authorName',    // Auto-filled when an author is chosen
        numeric: true,
        required: true,               // Must select an author
    },
    {
        name: 'authorName',            // API field name
        label: 'Author Name',              // Display label
        type: 'text',                 // Auto-filled, read-only
        readOnly: true,
    },
    {
        name: 'categoryId',            // API field name
        label: 'Category',            // Label shown on the dropdown
        type: 'select',                // Renders as a dropdown
        optionsEndpoint: '/categories', // Loaded live from the database
        optionLabelField: 'category_name', // Text shown for each option
        linkedField: 'categoryName',   // Auto-filled when a category is chosen
        numeric: true,
        required: true,                // Must select a category
    },
    {
        name: 'categoryName',    // API field name
        label: 'Category Name',  // Display label
        type: 'text',             // Auto-filled, read-only
        readOnly: true,
    },
    {
        name: 'quantity',             // API field name
        label: 'Quantity',            // Display label
        type: 'number',               // Number input with validation
        required: true,               // Must be filled
        min: 1,                       // Minimum quantity (cannot be negative)
        max: 100,                     // Maximum quantity (stock limit)
    },
    {
        name: 'bookTitle',           // API field name
        label: 'Book Title',          // Display label
        type: 'text',                 // Text input type
        maxLength: 200,               // Database VARCHAR(200) limit
        required: true,               // Must be filled
        fullWidth: true,              // Takes full width of the form
    },
];

// Table columns: show friendly names instead of raw foreign-key IDs
const columns = [
    { field: 'id', label: 'ID' },
    { field: 'bookTitle', label: 'Book Title' },
    { field: 'authorName', label: 'Author' },
    { field: 'publisherName', label: 'Publisher' },
    { field: 'categoryName', label: 'Category' },
    { field: 'quantity', label: 'Quantity' },
];

// Books Page Component
export default function Books() {
    return(
        // Render the reusable CRUD page with book-specific configuration
        <EntityCrudPage
            title="Books"     // Page title and plural entity name
            endpoint="/books" // Endpoint
            fields={fields}   // Form field configuration with validation
            columns={columns} // Custom table columns (friendly names, not raw IDs)
        />
    );
}