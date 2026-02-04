import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';

const Navbar = () => (
  <AppBar position="sticky" sx={{ mb: 4 }}>
    <Toolbar>
      <PeopleIcon sx={{ mr: 2, fontSize: 28 }} />
      <Typography
        variant="h6"
        sx={{
          flexGrow: 1,
          fontWeight: 700,
          letterSpacing: 0.5,
        }}
      >
        HRMS Lite
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          color="inherit"
          component={RouterLink}
          to="/employees"
          sx={{
            textTransform: 'none',
            fontSize: 16,
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          Employees
        </Button>
        <Button
          color="inherit"
          component={RouterLink}
          to="/attendance"
          sx={{
            textTransform: 'none',
            fontSize: 16,
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          Attendance
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
