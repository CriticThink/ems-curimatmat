import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlus, FaEdit, FaSave, FaTimes, FaSearch, FaTrash } from "react-icons/fa";
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee, Employee } from "./api";
import "./Homepage.css";

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    name: "",
    department: "",
    contact: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditClick = (employee: Employee) => {
    setEditingId(employee.id);
    setEditedEmployee({ ...employee });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedEmployee) {
      setEditedEmployee({
        ...editedEmployee,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveClick = async () => {
    if (editedEmployee) {
      await updateEmployee(editedEmployee.id, editedEmployee);
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === editedEmployee.id ? editedEmployee : emp))
      );
      setEditingId(null);
      setEditedEmployee(null);
    }
  };

  const handleAddEmployeeClick = () => {
    setShowModal(true);
  };

  const handleNewEmployeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleSaveNewEmployee = async () => {
    const res = await addEmployee(newEmployee);
    setEmployees([...employees, res.data]);
    setShowModal(false);
    setNewEmployee({ name: "", department: "", contact: "" });
  };

  const handleDeleteClick = async (id: number) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Employee Management System</span>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <button className="btn custom-add-btn" onClick={handleAddEmployeeClick}>
            <FaPlus className="icon" /> Add Employee
          </button>

          <div className="input-group search-bar">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search Employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="table custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                {editingId === employee.id ? (
                  <>
                    <td>{employee.id}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={editedEmployee?.name || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="department"
                        className="form-control"
                        value={editedEmployee?.department || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="contact"
                        className="form-control"
                        value={editedEmployee?.contact || ""}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={handleSaveClick}>
                        <FaSave />
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(null)}>
                        <FaTimes />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.department}</td>
                    <td>{employee.contact}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => handleEditClick(employee)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(employee.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Add Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" name="name" placeholder="Name" className="form-control mb-2" value={newEmployee.name} onChange={handleNewEmployeeChange} />
                <input type="text" name="department" placeholder="Department" className="form-control mb-2" value={newEmployee.department} onChange={handleNewEmployeeChange} />
                <input type="text" name="contact" placeholder="Contact" className="form-control mb-2" value={newEmployee.contact} onChange={handleNewEmployeeChange} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSaveNewEmployee}>Save</button>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;