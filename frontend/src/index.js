// The main entry point for the React application.

// Import React Library
import React from 'react';


// Import ReactDOM Client
import ReactDOM from 'react-dom/client';

// Import Global CSS Styles
import './index.css';

// Import Main App Component
import App from './App';

// Create the React Root Container
const root = ReactDOM.createRoot(document.getElementById('root'));

// This mounts the React application into the DOM.
root.render(

    // React Strict Mode
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
