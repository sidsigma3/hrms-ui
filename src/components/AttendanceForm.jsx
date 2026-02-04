import React, { useState } from 'react';
import {
  Paper,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from '@mui/material';

const AttendanceForm = ({
  employees,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.employeeId) newErrors.employeeId = 'Please select an employee';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.status) newErrors.status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
      setFormData({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      });
      setErrors({});
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <FormControl sx={{ minWidth: 200 }} error={Boolean(errors.employeeId)}>
          <InputLabel>Select Employee</InputLabel>

          <Select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            label="Select Employee"
            disabled={isLoading}
          >
            {employees.map((emp) => (
              <MenuItem
                key={emp.employeeId}
                value={emp.employeeId}
              >
                {emp.fullName} (ID: {emp.employeeId})
              </MenuItem>
            ))}
          </Select>

          {errors.employeeId && (
            <FormHelperText>{errors.employeeId}</FormHelperText>
          )}
        </FormControl>


        <Box>
          <TextField
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            error={Boolean(errors.date)}
            disabled={isLoading}
            InputLabelProps={{ shrink: true }}
          />
          {errors.date && <FormHelperText error>{errors.date}</FormHelperText>}
        </Box>

        <FormControl sx={{ minWidth: 150 }} error={Boolean(errors.status)}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
            disabled={isLoading}
          >
            <MenuItem value="Present">Present</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
          </Select>
          {errors.status && (
            <FormHelperText>{errors.status}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading}
          sx={{ mt: 1 }}
        >
          {isLoading ? 'Marking...' : 'Mark Attendance'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AttendanceForm;
