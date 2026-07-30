// Import React hooks for state and side effects
import React, { useEffect, useState } from 'react';

// Import navigation hook for programmatic routing
import { useNavigate } from 'react-router-dom';

// Import Material-UI components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

// Import icons for each dashboard card
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

// Import API client for making HTTP requests
import api from '../api/api';

// Configuration array for dashboard cards.
const cards = [
    { key: 'authors', label: 'Authors', path: '/authors', icon: <PersonRoundedIcon />, color: '#3b82f6' },
    { key: 'publishers', label: 'Publishers', path: '/publishers', icon: <BusinessRoundedIcon />, color: '#8b5cf6' },
    { key: 'categories', label: 'Categories', path: '/categories', icon: <CategoryRoundedIcon />, color: '#10b981' },
    { key: 'books', label: 'Books', path: '/books', icon: <MenuBookRoundedIcon />, color: '#f59e0b' },
    { key: 'members', label: 'Members', path: '/members', icon: <GroupsRoundedIcon />, color: '#ef4444' },
    { key: 'reservations', label: 'Reservations', path: '/reservations', icon: <EventAvailableRoundedIcon />, color: '#06b6d4' },
    { key: 'logs', label: 'Logs', path: '/logs', icon: <HistoryRoundedIcon />, color: '#ec4899' },
];

// Dashboard Page Component
function Dashboard() {

    // Hook to navigate programmatically to different routes
    const navigate = useNavigate();

    // State to store entity counts
    // Structure: { authors: 42, publishers: 15, categories: 8, ... }
    const [counts, setCounts] = useState({});

    // Effect hook that fetches counts for all entity types on component mount.
    useEffect(() => {

        // Iterate over each card configuration
        cards.forEach((c) => {

            // Make GET request to fetch all records for this entity
            api
                // GET /author
                .get(`/${c.key}`)

                // Update counts state with the total number of records
                .then((res) => setCounts((prev) => ({ ...prev, [c.key]: res.data.length })))
                // Use functional update to preserve other count values
                .catch(() =>
                    // On error, set count to null to indicate data couldn't be loaded
                    setCounts((prev) => ({ ...prev, [c.key]: null })));
        });
    }, []); // Empty array = run once on component mount

    return (
        <Box>

            {/* ===== WELCOME HEADER ===== */}
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Welcome, Administrator
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Manage your library's collections, members, reservations, and
                system records from a single, easy-to-use dashboard.
            </Typography>

            {/* ===== DASHBOARD CARDS GRID ===== */}
            {/* Grid container with 3px spacing between items */}
            <Grid container spacing={3}>

                {/* Map over card configurations to render each card */}
                {cards.map((c) => (

                    // Each card takes: full width on mobile, 50% on small, 33% on medium, 25% on large
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={c.key}>

                        {/* ButtonBase makes the entire card clickable */}
                        <ButtonBase
                            onClick={() => navigate(c.path)} // Navigate to entity page on click
                            sx={{ width: '100%', textAlign: 'left', borderRadius: 3 }}
                        >
                            {/* Paper component acts as the card container */}
                            <Paper
                                variant="outlined" // Outlined style instead of elevated
                                sx={{
                                    width: '100%', // Full width of grid item
                                    p: 3, // Padding (theme spacing = 24px)
                                    borderRadius: 3, // Rounded corners
                                    display: 'flex', // Flexbox layout
                                    flexDirection: 'column', // Vertical stacking
                                    gap: 1.5, // Spacing between children
                                    // Animation and interaction effects
                                    transition: 'box-shadow .2s, transform .2s',
                                    // Hover effect: subtle lift and shadow
                                    '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
                                }}
                            >
                                {/* Avatar with entity-specific icon and color */}
                                <Avatar sx={{ bgcolor: c.color, width: 44, height: 44 }}>{c.icon}</Avatar>

                                {/* Count display - handles loading and error states */}
                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                    {counts[c.key] === undefined ? '—' : counts[c.key] === null ? '–' : counts[c.key]}
                                </Typography>

                                {/* Entity label */}
                                <Typography variant="body2" color="text.secondary">
                                    {c.label}
                                </Typography>
                            </Paper>
                        </ButtonBase>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;
