import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';


const EmptyState = ({ message = 'No data available' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      gap: 2,
    }}
  >
    <InboxIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
    <Typography variant="h6" color="text.secondary">
      {message}
    </Typography>
  </Box>
);

export default EmptyState;
