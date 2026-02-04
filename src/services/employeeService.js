import api from "./api";


export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data;
};


export const createEmployee = async (data) => {
  const res = await api.post("/employees", data);
  return res.data;
};


export const deleteEmployee = async (employeeId) => {
  const res = await api.delete(`/employees/${employeeId}`);
  return res.data;
};
