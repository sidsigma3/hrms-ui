import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const AttendanceTable = ({ records }) => {
  const getStatusColor = (status) => {
    return status === 'Present' ? 'success' : 'error';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell sx={{ fontWeight: 700 }}>Employee</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Employee ID</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record, index) => (
            <TableRow
              key={index}
              sx={{
                '&:hover': { backgroundColor: '#fafafa' },
              }}
            >
              <TableCell>{record.employeeName}</TableCell>
              <TableCell>{record.employeeId}</TableCell>
              <TableCell>
                {new Date(record.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </TableCell>

              <TableCell>
                <Chip
                  label={record.status}
                  color={getStatusColor(record.status)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
