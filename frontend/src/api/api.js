// Bring in the axios library, used to make HTTP requests to the backend
import axios from 'axios';

// Create a reusable axios instance instead of calling axios directly everywhere
// Final Constant Variable [Cannot be reassigned after first assignment]
const api = axios.create({
    // All requests made with "api"will be prefixed with this URL
    // Spring Boot Backend
    baseURL: 'http://localhost:8080/api',
});

// Make this configured instance available to import in other files.
export default api;