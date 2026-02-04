import api from "./api";

export const markAttendance = async ({ employeeId, date, status }) => {
  try {
    const response = await api.post("/attendance", {
      employeeId,
      date,
      status,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAllAttendance = async () => {
  try {
    const response = await api.get("/attendance");
    return response.data;
  } catch (error) {
    throw error;
  }
};



export const getAttendanceByEmployee = async (employeeId) => {
  try {
    const response = await api.get(`/attendance/${employeeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAttendanceByDate = async (date) => {
  try {
    const response = await api.get(`/attendance?date=${date}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
