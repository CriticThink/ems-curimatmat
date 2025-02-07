import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, "employees.json");

app.use(cors());
app.use(express.json());

const loadEmployees = (): any[] => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return data ? JSON.parse(data) : [];
};

const saveEmployees = (employees: any[]) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2), "utf8");
};

app.get("/employees", (req: Request, res: Response) => {
  res.json(loadEmployees());
});

app.post("/employees", (req: Request, res: Response) => {
  const employees = loadEmployees();
  const newEmployee = { id: employees.length + 1, ...req.body };
  employees.push(newEmployee);
  saveEmployees(employees);
  res.status(201).json(newEmployee);
});

app.put("/employees/:id", (req: Request, res: Response) => {
  const employees = loadEmployees();
  const index = employees.findIndex((emp) => emp.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employees[index] = { ...employees[index], ...req.body };
  saveEmployees(employees);
  res.json(employees[index]);
});

app.delete("/employees/:id", (req: Request, res: Response) => {
  const employees = loadEmployees();
  const filteredEmployees = employees.filter((emp) => emp.id !== Number(req.params.id));

  if (employees.length === filteredEmployees.length) {
    return res.status(404).json({ message: "Employee not found" });
  }

  saveEmployees(filteredEmployees);
  res.json({ message: "Employee deleted successfully" });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
