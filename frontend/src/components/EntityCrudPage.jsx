// EntityCrudPage.jsx
//===================

// A reusable React CRUD component that automatically provides search, table,
// add / edit / delete operations, dialogs, and Spring Boot API integration through
// simple configuration.

// Imports React itself plus 3 "hooks" special functions for state and side effects
import React, { useEffect, useMemo, useState } from 'react';

// Import Material UI Library components for layout, typography, buttons, tables, dialogs
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';

// Imports axios instance from earlier [Used to make HTTP requests to the backend]
import api from '../api/api';

// Generic CRUD Page
// Declares a function named EntityCrudPage and exports it so other files can import it.
// { title, endpoint, fields, columns } is "destructuring" - pulling 4 named values
// out of the single "props" object React passes in.
export default function EntityCrudPage({ title, endpoint, fields, columns }) {

    // "items" = variable holding the list of records (starts empty array)
    // "setItems" = the ONLY function allowed to update "items"
    // useState([]) = a React Hook (function) that creates this pair
    const [items, setItems] = useState([]);

    // Boolean variable: true = "still fetching data, show spinner"
    const [loading, setLoading] = useState(true);

    // String Variable: holds whatever the user typed in the search box
    const [search, setSearch] = useState('');

    // Boolean: true = the Add/Edit popup is currently visible
    const [dialogOpen, setDialogOpen] = useState(false);

    // Holds the ID of the item pending deletion (null = no delete confirmation showing)
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    // null = we're creating a NEW item; a number = we're editing an EXISTING item with that id
    const [editingId, setEditingId] = useState(null);

    // Object holding the current values typed into the Add/Edit form fields
    const [form, setForm] = useState({});

    // Object controlling the little toast notification (visible? what text? success or error color?)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Holds the fetched records for any field configured with `optionsEndpoint`
    // (e.g. the list of authors used to populate the "Author" dropdown on the
    // Books page). Keyed by field name: { authorId: [...], publisherId: [...] }
    const [optionsData, setOptionsData] = useState({});

    // Tracks whether each `optionsEndpoint` field is still loading, so the
    // dropdown can show a "Loading..." state instead of a premature
    // "No record found" while the request is in flight.
    const [optionsLoading, setOptionsLoading] = useState({});

    // Builds a "blank" version of the form (every field name → empty string)
    // () => ... is an "arrow function" (anonymous JS function)
    // Object.fromEntries + .map() are built-in JS array/object functions
    // [fields] = "only recalculate this if fields changes" (dependency array)
    const emptyForm = useMemo(
        () => Object.fromEntries(fields.map((f) => [f.name, ''])),
        [fields]
    );

    // If "columns" prop was given, use it. Otherwise (||), build default columns
    // from "fields" automatically. "..." is the spread operator (unpacks an array).
    const cols = columns || [
        { field: 'id', label: 'ID' },
        ...fields.map((f) => ({ field: f.name, label: f.label })),
    ];

    // This function handles the entire data fetching lifecycle.
    const fetchItems = () => {

        // Set loading state to true to show loading indicators in the UI
        setLoading(true);

        // Make the API GET request to the configured endpoint
        api
            .get(endpoint)

            // Handle successful response: extract data and update items state
            .then((res) => setItems(res.data))

            // Handle errors: display an error message via snackbar
            .catch(() =>
                setSnackbar({ open: true, message: 'Failed to load data.', severity: 'error' })
            )

            // Cleanup: hide loading indicator regardless of success or failure
            .finally(() => setLoading(false));
    };

    // Effect hook that fetches items whenever the endpoint changes.
    useEffect(() => {
        // Execute the data fetching function
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint]);

    // Effect hook that loads lookup data (e.g. the list of authors, publishers,
    // categories, members, or books) for every field configured with
    // `optionsEndpoint`, so the Add/Edit dialog can render a real dropdown
    // sourced from the database instead of a free-text ID field.
    useEffect(() => {
        fields.forEach((f) => {
            if (!f.optionsEndpoint) return;

            setOptionsLoading((prev) => ({ ...prev, [f.name]: true }));

            api
                .get(f.optionsEndpoint)
                .then((res) => setOptionsData((prev) => ({ ...prev, [f.name]: res.data })))
                // If the lookup fails to load, treat it the same as "no records"
                // rather than leaving the dropdown stuck loading forever.
                .catch(() => setOptionsData((prev) => ({ ...prev, [f.name]: [] })))
                .finally(() => setOptionsLoading((prev) => ({ ...prev, [f.name]: false })));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fields]);

    // Opens the dialog in "add" mode for creating a new item.
    const openAddDialog = () => {

        // Reset form fields to their initial empty state for a new entry
        setForm(emptyForm);

        // Clear the editing ID to indicate we're creating a new item (not editing existing)
        setEditingId(null);

        // Open the dialog/modal to show the form to the user
        setDialogOpen(true);

    };

    // Opens the dialog in "edit" mode for updating an existing item.
    const openEditDialog = (item) => {

        // Create a shallow copy of the empty form template to avoid mutating the original
        const next = { ...emptyForm };

        // Iterate through each field definition to populate the form
        fields.forEach((f) => {

            // Populate the field with the item's value, or default to empty string
            // if the value is null or undefined (nullish coalescing operator)
            next[f.name] = item[f.name] ?? '';
        });

        // Update form state with the populated data
        setForm(next);

        // Store the item's ID to identify which record is being edited
        setEditingId(item.id);

        // Open the dialog/modal to show the populated form to the user
        setDialogOpen(true);

    };

    // Closes the dialog/modal by setting its open state to false.
    const closeDialog = () =>

        // Update state to close the dialog
        setDialogOpen(false);

    // Updates form state as the user types/selects, and auto-fills any linked
    // display-name field (e.g. choosing an Author ID also fills Author Name).
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Find the configuration for the field that just changed
        const field = fields.find((f) => f.name === name);

        setForm((prev) => {
            // Spread existing form fields, then update the changed field
            const next = { ...prev, [name]: value };

            // If this field drives a linked display-name field (a dropdown backed
            // by optionsEndpoint), look up the chosen record and copy its label
            // into the linked field automatically.
            if (field && field.linkedField) {
                const records = optionsData[name] || [];
                const valueField = field.optionValueField || 'id';
                const match = records.find((r) => String(r[valueField]) === String(value));
                next[field.linkedField] = match ? (match[field.optionLabelField] ?? '') : '';
            }

            return next;
        });
    };

    // Builds the final payload object for API submission.
    const buildPayload = () => {

        // Start with a shallow copy of the current form state
        const payload = { ...form };

        // Iterate through each field definition to process specific types
        fields.forEach((f) => {

            // Check if the field type is 'number'.
            // Fields backed by a database lookup (`optionsEndpoint`, e.g. authorId,
            // publisherId, categoryId, member_id, book_id) and fields typed 'select'
            // without a static `options` list are numeric foreign-key IDs, so they
            // need the same string -> Number conversion as plain number fields.
            const isNumericField =
                f.type === 'number' ||
                !!f.optionsEndpoint ||
                (f.type === 'select' && !f.options);

            if (isNumericField) {

                // If the number field is empty string, set to null
                // Otherwise, convert the string value to a Number
                payload[f.name] = payload[f.name] === '' ? null : Number(payload[f.name]);
            }
        });

        // Return the processed payload
        return payload;
    };

    // Handles the form submission for creating or updating an item.
    const handleSubmit = async (e) => {

        // Prevent the default form submission which would reload the page
        e.preventDefault();

        // Build the formatted payload from the current form state
        // This converts number fields and handles empty values
        const payload = buildPayload();

        try {
            // Check if we're editing an existing item (editingId is not null)
            if (editingId) {

                // EDIT MODE: Make a PUT request to update the existing item
                // URL format: /api/items/{id} (e.g., /api/users/123)
                await api.put(`${endpoint}/${editingId}`, payload);

                // Show success message for update operation
                // title.slice(0, -1) removes the last character (plural 's') for singular form
                // Example: "Users" becomes "User"
                setSnackbar({
                    open: true,
                    message: `${title.endsWith("ies")
                        ? title.slice(0, -3) + "y"
                        : title.slice(0, -1)} updated.`,
                    severity: 'success' });
            } else {

                // ADD MODE: Make a POST request to create a new item
                await api.post(endpoint, payload);

                // Show success message for creation operation
                // title.slice(0, -1) removes the last character for singular form
                setSnackbar({
                    open: true,
                    message: `${title.endsWith("ies")
                        ? title.slice(0, -3) + "y"
                        : title.slice(0, -1)} created.`,
                    severity: 'success' });
            }

            // Close the dialog/modal after successful operation
            setDialogOpen(false);

            // Refresh the items list to show the new/updated data
            fetchItems();

        } catch (err) {
            // ERROR HANDLING: Catch any network or server errors
            // Display a generic error message to the user
            setSnackbar({
                open: true,
                message: 'Something went wrong. Please try again.',
                severity: 'error' });
        }
    };

    // Handles the deletion of an item from the system.
    const handleDelete = async () => {

        // Retrieve the ID of the item to be deleted from the confirmation state
        // This ID is set when the user clicks the delete button on an item
        const id = confirmDeleteId;

        // Reset the confirmation ID to null to clear the delete state
        // This also closes any confirmation dialog that might be open
        setConfirmDeleteId(null);

        try {

            // Make a DELETE request to the API endpoint with the specific item ID
            // URL format: /api/items/{id} (e.g., /api/users/123)
            await api.delete(`${endpoint}/${id}`);

            // Show success message for deletion operation
            // title.slice(0, -1) removes the last character (plural 's') for singular form
            // Example: "Users" becomes "User"
            setSnackbar({
                open: true,
                message: `${title.endsWith("ies")
                    ? title.slice(0, -3) + "y"
                    : title.slice(0, -1)} deleted.`,
                severity: 'success'
            });

            // Refresh the items list to reflect the removal
            // This ensures the UI stays in sync with the database
            fetchItems();

            // ERROR HANDLING: Catch any network or server errors
            // Display a user-friendly error message
        } catch (err) {
            setSnackbar({
                open: true,
                message: 'Delete failed.',
                severity: 'error' });
        }

    };

    // Filters the items array based on a search term across multiple columns.
    const filteredItems = items.filter((item) => {

        // If search is empty or contains only whitespace, include all items
        // trim() removes leading/trailing whitespace to check for empty search
        if (!search.trim()) return true;

        // Build a single searchable string from all column values of this item
        // - Map each column to its value from the item
        // - Handle null/undefined by defaulting to empty string
        // - Convert to string and lowercase for case-insensitive search
        // - Join all values with a space separator
        const haystack = cols
            .map((c) => (item[c.field] ?? '').toString().toLowerCase())
            .join(' ');

        // Return true if the haystack contains the search term (case-insensitive)
        // Returns false otherwise, filtering out this item
        return haystack.includes(search.toLowerCase());
    });

    return (
        // Main container Box component

        <Box>
            {/*===== HEADER SECTION =====*/}
            {/* Container for title and Add button - flex layout with space between */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>

                {/* Left side: Title and record count */}
                <Box>

                    {/* Main title - bold and large */}
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {title}
                    </Typography>

                    {/* Subtitle showing total number of records with proper pluralization */}
                    <Typography variant="body2" color="text.secondary">
                        Total Records: {String(items.length).padStart(2, '0')}
                    </Typography>
                </Box>

                {/* Right side: Add button with icon */}
                {/* onClick triggers the function to open dialog in add mode */}
                <Button variant="contained" startIcon={<AddIcon />} onClick={openAddDialog}>
                    {/* Remove trailing 's' for singular form */}
                    Add {title.endsWith("ies") ? title.slice(0, -3) + "y" : title.slice(0, -1)}
                </Button>
            </Box>

            {/* ===== SEARCH BAR SECTION ===== */}
            {/* Paper container for search input with rounded corners */}
            <Paper sx={{ p: 2, mb: 2, borderRadius: 3 }} variant="outlined">
                <TextField
                    // Takes full width of container
                    fullWidth
                    // Compact size for better spacing
                    size="small"

                    // Dynamic placeholder text
                    placeholder={`Search ${title.toLowerCase()}...`}
                    // Controlled component - value from state
                    value={search}
                    // Update search state on change
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        // Customize input field properties
                        startAdornment: (
                            // Add search icon at the beginning of the input
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Paper>

            {/* ===== TABLE SECTION ===== */}
            {/* Paper container for the table with rounded corners and hidden overflow */}
            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }} variant="outlined">
                <TableContainer>
                    <Table>
                        {/* ===== TABLE HEADER ===== */}
                        <TableHead>
                            {/* Header row with light background color */}
                            <TableRow sx={{ bgcolor: '#f8fafc' }}>
                                {/* Dynamically render column headers from cols configuration */}
                                {cols.map((c) => (
                                    <TableCell key={c.field} sx={{ fontWeight: 600 }}>
                                        {c.label}
                                    </TableCell>
                                ))}
                                {/* Actions column header - right aligned */}
                                <TableCell align="right" sx={{ fontWeight: 600 }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* ===== TABLE BODY ===== */}
                        <TableBody>

                            {/* LOADING STATE: Show spinner when data is being fetched */}
                            {loading && (
                                <TableRow>

                                    {/* Span across all columns + actions column */}
                                    <TableCell colSpan={cols.length + 1} align="center" sx={{ py: 6 }}>
                                        <CircularProgress size={28} />
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* EMPTY STATE: Show message when no records match the search */}
                            {!loading && filteredItems.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={cols.length + 1} align="center" sx={{ py: 6 }}>
                                        <Typography color="text.secondary">No records found.</Typography>
                                    </TableCell>
                                </TableRow>
                            )}

                            {/* DATA ROWS: Render filtered items when not loading and data exists */}
                            {!loading &&
                                filteredItems.map((item) => (
                                    <TableRow key={item.id} hover>
                                        {/* hover adds interactive effect */}
                                        {cols.map((c) => (
                                            <TableCell key={c.field}>
                                                {/* Apply custom formatter if defined, otherwise display raw value */}
                                                {c.format ? c.format(item[c.field], item) : item[c.field]}
                                            </TableCell>
                                        ))}

                                        {/* Actions cell with Edit and Delete buttons */}
                                        <TableCell align="right">

                                            {/* EDIT BUTTON with tooltip */}
                                            <Tooltip title="Edit">
                                                <IconButton size="small" onClick={() => openEditDialog(item)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>

                                            {/* DELETE BUTTON with tooltip - sets confirmDeleteId to open confirmation */}
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => setConfirmDeleteId(item.id)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* ===== ADD/EDIT FORM DIALOG ===== */}
            {/* Dialog for creating new records or editing existing ones */}
            <Dialog

                // Controlled by dialogOpen state
                open={dialogOpen}

                // Close on backdrop click or ESC key
                onClose={closeDialog}

                // Take full width of the container
                fullWidth

                // Maximum width set to small (600px)
                maxWidth="sm">

                {/* Form element - onSubmit triggers handleSubmit */}
                <form onSubmit={handleSubmit}>

                    {/* Dialog title - changes based on edit or add mode */}
                    <DialogTitle sx={{ fontWeight: 700 }}>
                        {editingId ? `Edit ${title.endsWith("ies")
                            ? title.slice(0, -3) + "y"
                            : title.slice(0, -1)}` : `Add ${title.endsWith("ies")
                            ? title.slice(0, -3) + "y"
                            : title.slice(0, -1)}`}
                    </DialogTitle>

                    {/* Dialog content with dividers and form fields */}
                    <DialogContent dividers>
                        {/* Grid container with spacing between fields */}
                        <Grid container spacing={2} sx={{ mt: 0.5 }}>

                            {/* Map through fields configuration to render form inputs */}
                            {fields.map((f) => {
                                // A field can be one of four kinds:
                                // 1. Dynamic dropdown: sourced live from the database via optionsEndpoint
                                //    (e.g. Author, Publisher, Category, Member, Book lookups).
                                // 2. Static dropdown: a fixed `options` list (e.g. status enums).
                                // 3. Read-only: an auto-filled display-name field paired with a
                                //    dynamic dropdown above (e.g. Author Name next to Author ID).
                                // 4. Plain input: everything else (text/number/date/time/email).
                                const isDynamicDropdown = !!f.optionsEndpoint;
                                const isStaticDropdown = f.type === 'select' && Array.isArray(f.options);
                                const isReadOnly = !!f.readOnly;
                                const isIdField = f.type === 'select' && !isStaticDropdown && !isDynamicDropdown;

                                const records = optionsData[f.name] || [];
                                const loadingOptions = !!optionsLoading[f.name];
                                const valueField = f.optionValueField || 'id';

                                // MUI v9's Grid uses the `size` prop instead of the old
                                // `item`/`xs`/`sm` props.
                                return (
                                    <Grid size={{ xs: 12, sm: f.fullWidth ? 12 : 6 }} key={f.name}>
                                        {isDynamicDropdown ? (
                                            <TextField
                                                select // Renders as an MUI Select via TextField
                                                fullWidth
                                                name={f.name}
                                                label={f.label}
                                                value={form[f.name] ?? ''}
                                                onChange={handleChange}
                                                required={!!f.required}
                                                size="small"
                                                // Disable the field entirely while loading or when the
                                                // lookup table has no rows to pick from.
                                                disabled={loadingOptions || records.length === 0}
                                                helperText={
                                                    loadingOptions
                                                        ? 'Loading…'
                                                        : records.length === 0
                                                            ? 'No record found'
                                                            : ' '
                                                }
                                            >
                                                {loadingOptions ? (
                                                    <MenuItem value="" disabled>Loading…</MenuItem>
                                                ) : records.length === 0 ? (
                                                    <MenuItem value="" disabled>No record found</MenuItem>
                                                ) : (
                                                    records.map((r) => (
                                                        <MenuItem key={r[valueField]} value={r[valueField]}>
                                                            {r[f.optionLabelField]}
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </TextField>
                                        ) : isStaticDropdown ? (
                                            <TextField
                                                select // Renders as an MUI Select via TextField
                                                fullWidth
                                                name={f.name}
                                                label={f.label}
                                                value={form[f.name] ?? ''}
                                                onChange={handleChange}
                                                required={!!f.required}
                                                size="small"
                                            >
                                                {f.options.map((opt) => (
                                                    <MenuItem key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        ) : (
                                            <TextField
                                                fullWidth // Takes full width of grid item
                                                name={f.name} // Field name for state updates
                                                label={f.label} // Display label
                                                type={
                                                    isIdField ? 'number'
                                                        : f.type === 'number' ? 'number'
                                                            : f.type === 'date' ? 'date'
                                                                : f.type === 'time' ? 'time'
                                                                    : f.type === 'email' ? 'email'
                                                                        : 'text'
                                                }
                                                value={form[f.name] ?? ''} // Controlled value - fallback to empty string
                                                onChange={handleChange} // Update form state on change
                                                required={!!f.required && !isReadOnly} // Set required attribute if specified
                                                // Auto-filled name fields are display-only; they're
                                                // populated automatically when the linked ID dropdown changes.
                                                disabled={isReadOnly}
                                                InputLabelProps={
                                                    f.type === 'date' || f.type === 'time' ? { shrink: true } : undefined
                                                }
                                                inputProps={{
                                                    maxLength: f.maxLength,
                                                    pattern: f.pattern,
                                                    min: f.min,
                                                    max: f.max,
                                                }}
                                                size="small" // Compact input size
                                            />
                                        )}
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </DialogContent>

                    {/* Dialog action buttons */}
                    <DialogActions sx={{ px: 3, py: 2 }}>

                        {/* Cancel button - closes dialog without saving */}
                        <Button onClick={closeDialog}>Cancel</Button>

                        {/* Submit button - text changes based on mode */}
                        <Button type="submit" variant="contained">
                            {editingId ? 'Save changes' : 'Create'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            {/* ===== DELETE CONFIRMATION DIALOG ===== */}
            {/* Dialog that appears when user clicks delete icon */}
            <Dialog
                open={!!confirmDeleteId} // Opens when confirmDeleteId has a value
                onClose={() => setConfirmDeleteId(null)} // Close by resetting state
            >
                <DialogTitle>Delete {title.endsWith("ies")
                    ? title.slice(0, -3) + "y"
                    : title.slice(0, -1)}?</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        This action cannot be undone. Are you sure you want to delete this record?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    {/* Cancel button - closes without deleting */}
                    <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                    {/* Delete button - triggers handleDelete function */}
                    <Button color="error" variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ===== SNACKBAR NOTIFICATION ===== */}
            {/* Temporary notification that appears at bottom-right of screen */}
            <Snackbar
                open={snackbar.open} // Controlled by snackbar state
                autoHideDuration={3000} // Auto-closes after 3 seconds
                onClose={() => setSnackbar({ ...snackbar, open: false })} // Close handler
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position
            >

                {/* Alert component with dynamic severity (success/error) */}
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })} // Close button handler
                    severity={snackbar.severity} // 'success' or 'error'
                    variant="filled" // Filled style for better visibility
                    sx={{ width: '100%' }}
                >
                    {snackbar.message} {/* Dynamic message content */}
                </Alert>
            </Snackbar>
        </Box>
    );
}