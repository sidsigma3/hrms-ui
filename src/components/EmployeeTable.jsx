import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeTable = ({ employees, onDelete, isLoading = false }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
          <TableCell sx={{ fontWeight: 700 }}>Employee ID</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>Full Name</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
          <TableCell sx={{ fontWeight: 700 }}>Department</TableCell>
          <TableCell align="center" sx={{ fontWeight: 700 }}>
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees.map((employee) => (
          <TableRow
            key={employee.id}
            sx={{
              '&:hover': { backgroundColor: '#fafafa' },
            }}
          >
            <TableCell>{employee.employeeId}</TableCell>
            <TableCell>{employee.fullName}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell align="center">
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                size="small"
                onClick={() => onDelete(employee.employeeId)}
                disabled={isLoading}
                variant="outlined"
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default EmployeeTable;
