import React, { useState, useEffect , useCallback} from "react";
import {
  Container,
  Button,
  Snackbar,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeDialog from "../components/AddEmployeeDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../services/employeeService";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    employeeId: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });


  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      showSnackbar("Failed to load employees", "error");
    } finally {
      setLoading(false);
    }
 }, []);



  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

 
  const handleAddEmployee = async (data) => {
    try {
      setLoading(true);

      await createEmployee({
        employeeId: data.id,
        fullName: data.name,
        email: data.email,
        department: data.department,
      });

      showSnackbar("Employee added successfully");

      setOpenDialog(false);

      
      await fetchEmployees();
    } catch (error) {
      let message = "Failed to add employee";

      if (error.response?.status === 409) {
        message = "Employee already exists";
      }

      showSnackbar(message, "error");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDeleteClick = (employeeId) => {
    console.log(employeeId)

    setDeleteConfirm({
      open: true,
      employeeId,
    });
  };

  
  const handleConfirmDelete = async () => {
    try {
      setLoading(true);

      await deleteEmployee(deleteConfirm.employeeId);

      showSnackbar("Employee deleted successfully");

      setDeleteConfirm({ open: false, employeeId: null });

      await fetchEmployees();
    } catch (error) {
      showSnackbar("Failed to delete employee", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
     
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Employee Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          disabled={loading}
        >
          Add Employee
        </Button>
      </Box>

     

      {loading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <EmptyState message="No employees found. Click 'Add Employee' to create one." />
      ) : (
        <EmployeeTable
          employees={employees}
          onDelete={handleDeleteClick}
          isLoading={loading}
        />
      )}

      
      <AddEmployeeDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleAddEmployee}
        isLoading={loading}
      />

     
      <ConfirmDialog
        open={deleteConfirm.open}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteConfirm({ open: false, employeeId: null })
        }
        isLoading={loading}
      />

    
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EmployeesPage;
