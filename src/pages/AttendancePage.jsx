import React, { useState, useEffect } from "react";
import {
  Container,
  Snackbar,
  Alert,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import { getEmployees } from "../services/employeeService";
import {
  markAttendance,
  getAttendanceByEmployee,
} from "../services/attendanceService";

const AttendancePage = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  
  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);

      const employeeData = await getEmployees();
      setEmployees(employeeData);

      
      let allRecords = [];

      await Promise.all(
        employeeData.map(async (emp) => {
          const records = await getAttendanceByEmployee(emp.employeeId);

          const enriched = records.map((rec) => ({
            ...rec,
            employeeName: emp.fullName,
          }));

          allRecords = [...allRecords, ...enriched];
        })
      );

    
      allRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

      setAttendanceRecords(allRecords);
    } catch (error) {
      showSnackbar("Failed to load attendance data", "error");
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

 
  const handleMarkAttendance = async (data) => {
    try {
      setLoading(true);

      await markAttendance({
        employeeId: data.employeeId,
        date: data.date,
        status: data.status,
      });

      showSnackbar("Attendance marked successfully");

     
      await fetchInitialData();
    } catch (error) {
      let message = "Failed to mark attendance";

      if (error.response?.status === 409) {
        message = "Attendance already marked for this date";
      }

      if (error.response?.status === 404) {
        message = "Employee not found";
      }

      showSnackbar(message, "error");
    } finally {
      setLoading(false);
    }
  };


  const calculatePresentDays = (employeeId) => {
    return attendanceRecords.filter(
      (rec) =>
        rec.employeeId === employeeId &&
        rec.status === "Present"
    ).length;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Attendance Management
      </Typography>

      {loading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <EmptyState message="No employees found. Please add employees first." />
      ) : (
        <>
          <AttendanceForm
            employees={employees}
            onSubmit={handleMarkAttendance}
            isLoading={loading}
          />

          {/* BONUS CARD */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Total Present Days Per Employee
            </Typography>

            <Grid container spacing={2}>
              {employees.map((employee) => (
                <Grid item xs={12} sm={6} md={4} key={employee.employeeId}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {employee.fullName}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "primary.main",
                      }}
                    >
                      {calculatePresentDays(employee.employeeId)} days
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* TABLE */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Attendance Records
            </Typography>

            {attendanceRecords.length === 0 ? (
              <EmptyState message="No attendance records found." />
            ) : (
              <AttendanceTable records={attendanceRecords} />
            )}
          </Box>
        </>
      )}

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

export default AttendancePage;
