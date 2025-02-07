import axios from "axios";

export interface Employee {
  id: number;
  name: string;
  department: string;
  contact: string;
}

const API_URL = "http://localhost:5000/employees";

export const fetchEmployees = () => axios.get<Employee[]>(API_URL);

export const addEmployee = (employee: Omit<Employee, "id">) =>
  axios.post<Employee>(API_URL, employee);

export const updateEmployee = (id: number, employee: Partial<Employee>) =>
  axios.put<Employee>(`${API_URL}/${id}`, employee);

export const deleteEmployee = (id: number) => 
  axios.delete(`${API_URL}/${id}`);
