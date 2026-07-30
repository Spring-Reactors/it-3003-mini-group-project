// Import React core library
import * as React from 'react';

// Import routing hooks from React Router
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// Import Material-UI components
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

// Import navigation icons
import DashboardIcon from '@mui/icons-material/DashboardRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

// Define the fixed width of the sidebar drawer
const drawerWidth = 240;

// Navigation items configuration array.
const navItems = [
    { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
    { label: 'Authors', path: '/authors', icon: <PersonRoundedIcon /> },
    { label: 'Publishers', path: '/publishers', icon: <BusinessRoundedIcon /> },
    { label: 'Categories', path: '/categories', icon: <CategoryRoundedIcon /> },
    { label: 'Books', path: '/books', icon: <MenuBookRoundedIcon /> },
    { label: 'Members', path: '/members', icon: <GroupsRoundedIcon /> },
    { label: 'Reservations', path: '/reservations', icon: <EventAvailableRoundedIcon /> },
    { label: 'Logs', path: '/logs', icon: <HistoryRoundedIcon /> },
];

// Main layout component for the authenticated dashboard.
export default function DashboardLayout() {

    // Get the current route location to determine active page
    const location = useLocation();

    // Get navigation function for programmatic routing
    const navigate = useNavigate();

    // Find the current navigation item matching the current path
    // If none found, defaults to 'Dashboard'
    const current = navItems.find((item) => item.path === location.pathname);

    return (

        // Main container with flex layout and full viewport height
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f9fc' }}>

            {/* CssBaseline normalizes CSS across browsers */}
            <CssBaseline />

            {/* ===== TOP APP BAR ===== */}
            {/* Fixed position, right of the sidebar */}
            <AppBar
                position="fixed" // Stays fixed at top when scrolling
                elevation={0} // Remove shadow for flat design
                sx={{
                    // Width excludes sidebar width
                    width: `calc(100% - ${drawerWidth}px)`,
                    // Push app bar to the right of the drawer
                    ml: `${drawerWidth}px`,
                    // White background
                    bgcolor: '#fff',
                    // Dark text for readability
                    color: 'text.primary',
                    // Subtle bottom border
                    borderBottom: '1px solid #eaecef',
                }}
            >

                <Toolbar sx={{ gap: 1 }}>
                    {/* Page title - shows current navigation label */}
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        {current ? current.label : 'Dashboard'}
                    </Typography>

                    {/* User avatar - shows initials */}
                    <Avatar sx={{ width: 34, height: 34, bgcolor: '#3b82f6', fontSize: 14 }}>AD</Avatar>
                </Toolbar>
            </AppBar>

            {/* ===== SIDEBAR DRAWER ===== */}
            {/* Permanent drawer that remains always visible */}
            <Drawer
                // Always open, not collapsible
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0, // Prevent drawer from shrinking
                    // Target the paper element inside the drawer
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box', // Include padding in width calculation
                        bgcolor: '#111827', // Dark background (slate-900)
                        color: '#e5e7eb', // Light text color (slate-200)
                        borderRight: 'none', // Remove default border
                    },
                }}
            >

                {/* Brand/Logo section */}
                <Toolbar sx={{ px: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                        Admin Dashboard
                    </Typography>
                </Toolbar>

                {/* Divider with semi-transparent color */}
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                {/* Navigation list */}
                <List sx={{ px: 1.5, py: 1 }}>
                    {navItems.map((item) => {
                        // Check if this item matches the current route
                        const selected = location.pathname === item.path;

                        return (
                            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                                <ListItemButton
                                    selected={selected} // Highlight active item
                                    onClick={() => navigate(item.path)} // Navigate on click
                                    sx={{
                                        borderRadius: 2, // Rounded corners
                                        // Color changes based on selected state
                                        color: selected ? '#fff' : '#9ca3af',
                                        // Selected state styles (dark blue background)
                                        '&.Mui-selected': {
                                            bgcolor: '#3b82f6', // Blue-500
                                            color: '#fff',
                                            '&:hover': { bgcolor: '#3b82f6' }, // Stay blue on hover
                                        },
                                        // Hover state for non-selected items
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                                    }}
                                >
                                    {/* Icon - inherits color from parent */}
                                    <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
                                        {item.icon}
                                    </ListItemIcon>

                                    {/* Label text with font size and weight */}
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{
                                            fontSize: 14,
                                            fontWeight: selected ? 600 : 500 // Bold when selected
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>

            {/* ===== MAIN CONTENT AREA ===== */}
            <Box
                component="main" // Semantic HTML5 element
                sx={{
                    flexGrow: 1, // Take remaining space
                    width: `calc(100% - ${drawerWidth}px)`, // Exclude sidebar width
                    px: 4, // Horizontal padding (32px)
                    py: 4, // Vertical padding (32px)
                    mt: 8, // Margin top to clear the AppBar (64px)
                }}
            >
                {/* Outlet renders the current route's component */}
                {/* This is where page content (dashboard, products, etc.) appears */}
                <Outlet />
            </Box>
        </Box>
    );
}
