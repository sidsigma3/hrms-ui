import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormHelperText,
} from '@mui/material';

const AddEmployeeDialog = ({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    department: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.id.trim()) newErrors.id = 'Employee ID is required';
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.department.trim())
      newErrors.department = 'Department is required';

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
        id: '',
        name: '',
        email: '',
        department: '',
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      id: '',
      name: '',
      email: '',
      department: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Add New Employee</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <Box>
            <TextField
              fullWidth
              label="Employee ID"
              name="id"
              value={formData.id}
              onChange={handleChange}
              error={Boolean(errors.id)}
              disabled={isLoading}
            />
            {errors.id && (
              <FormHelperText error>{errors.id}</FormHelperText>
            )}
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
              disabled={isLoading}
            />
            {errors.name && (
              <FormHelperText error>{errors.name}</FormHelperText>
            )}
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
              disabled={isLoading}
            />
            {errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              error={Boolean(errors.department)}
              disabled={isLoading}
            />
            {errors.department && (
              <FormHelperText error>{errors.department}</FormHelperText>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Employee'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;
