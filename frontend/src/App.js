import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/employee')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleAddEmployee = () => {
    axios.post('http://localhost:4000/api/employee', newEmployee)
      .then(response => {
        setEmployees([...employees, response.data]);
        setNewEmployee({});
      })
      .catch(error => console.error('Error adding employee: ', error));
  };

  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:4000/api/employee/${id}`)
      .then(response => setEmployees(employees.filter(employee => employee._id !== id)))
      .catch(error => console.error('Error deleting employee: ', error));
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>
            {employee.name} - {employee.position} - {employee.department}
            <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Add Employee</h2>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name || ''}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.position || ''}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newEmployee.department || ''}
          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
    </div>
  );
}

export default App;