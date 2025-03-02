import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "../components/Section";
import "../App.css";

// mui imports
import { Button, TextField, Box, Container, Stack, Typography } from "@mui/material";

//auth import -- protect the employee-mgmt page with a required login
import { useAuthContext } from "@asgardeo/auth-react";

const EmployeeMgmt = () => {

  // logged in state
  const { state, signIn } = useAuthContext();
  

  // If user is not authenticated, show a login message and button
  if (!state?.isAuthenticated) {
    return (
      <Section>
        <Container sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="body1" sx={{ mt: 2 }}>
            You must sign in to view this page.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => signIn()} 
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </Container>
      </Section>
    );
  }

  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    birthdate: "",
    salary: "",
  });

  // State to track which employee is being edited
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")  // Ensure this matches your backend route
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  // Function to handle the form submission
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const formattedBirthdate = new Date(newEmployee.birthdate).toISOString().split('T')[0];
    console.log("CLEARRRRR")
    console.log(formattedBirthdate)
  
    axios.post("http://localhost:5000/employees", { ...newEmployee, birthdate: formattedBirthdate })
      .then((response) => {
        console.log("Employee added:", response.data);
        setEmployees((prevEmployees) => [...prevEmployees, response.data]);
  
        setNewEmployee({
          first_name: "",
          last_name: "",
          email: "",
          birthdate: "", 
          salary: "",
        });
      })
      .catch((error) => console.error("Error adding employee:", error));
  };

  const handleEditEmployee = (e) => {
    e.preventDefault();
    
    const formattedBirthdate = new Date(newEmployee.birthdate).toISOString().split('T')[0];
  
    console.log("Formatted Birthdate:", formattedBirthdate);
    console.log("New Employee Data:", newEmployee);
    console.log("Editing Employee ID:", editingEmployee?.employee_id);
  
    axios.put(`http://localhost:5000/employees/${editingEmployee.employee_id}`, 
      { ...newEmployee, birthdate: formattedBirthdate })
      .then(() => {  // No longer relying on response.data.updatedEmployee
        setEmployees((prevEmployees) => 
          prevEmployees.map((emp) =>
            emp.employee_id === editingEmployee.employee_id
              ? { ...emp, ...newEmployee, birthdate: formattedBirthdate } // Manually update the UI
              : emp
          )
        );
  
        setNewEmployee({
          first_name: "",
          last_name: "",
          email: "",
          birthdate: "", 
          salary: "",
        });
  
        setEditingEmployee(null); // Clear editing state
      })
      .catch((error) => console.error("Error updating employee:", error));
  };
  


  // handle deleting
  const handleDelete = (employee_id) => {
    console.log("Deleting employee with ID:", employee_id); // correct console log
    axios.delete(`http://localhost:5000/employees/${employee_id}`)
      .then((response) => {
        console.log("Employee deleted:", response.data);
        // Remove the deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((emp) => emp.employee_id !== employee_id)
        );
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  // // Format birthdate in local time zone
  // const formatBirthday = (birthday) => {
  //   const date = new Date(birthday);
  //   const localDate = new Date(date.toLocaleString()); // Convert UTC to local time
  //   const formattedDate = localDate.toLocaleDateString("en-US", {
  //     month: "short", 
  //     day: "2-digit", 
  //     year: "numeric",
  //   });
  //   return formattedDate;
  // };

  const formatBirthday = (birthday) => {
    const date = new Date(birthday);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC", // Ensure date is formatted in UTC
    });
  };

  // Function to format salary as currency
  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,  // Ensures no decimals are shown
    }).format(salary);
  };

  return (
    <>

    <Section title="Employee List">

    <table>
          <thead>
            <tr>
              {/* <th> employee id</th> */}
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index}>
                {/* <td>{emp.employee_id}</td> */}
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{formatBirthday(emp.birthdate)}</td>
                <td>{formatSalary(emp.salary)}</td>
                <td>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      console.log("Selected Employee:", emp);  // Check if employee_id exists
                      console.log("Employee ID:", emp.employee_id);

                      if (emp) {
                        setEditingEmployee(emp);
                        setNewEmployee({
                          first_name: emp.first_name || "",
                          last_name: emp.last_name || "",
                          email: emp.email || "",
                          birthdate: emp.birthdate ? new Date(emp.birthdate).toISOString().split('T')[0] : "",
                          salary: emp.salary || "",
                        });
                        console.log(`Editing employee: ${emp.employee_id}`)
                      }
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      console.log(`Attempting to delete employee with ID: ${emp.employee_id}`);
                      handleDelete(emp.employee_id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </Section>  

    <Section title={editingEmployee ? "Edit Employee" : "Add New Employee"}>
        <Container>
          <Box>
            <form onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}>
              <Stack spacing={2} justifyContent="center">
                <TextField
                  label="First Name"
                  fullWidth
                  value={newEmployee.first_name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, first_name: e.target.value })}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  value={newEmployee.last_name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, last_name: e.target.value })}
                />
                <TextField
                  label="Email"
                  fullWidth
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
                <TextField
                  label="Birthdate"
                  type="date"
                  fullWidth
                  value={newEmployee.birthdate}
                  onChange={(e) => setNewEmployee({ ...newEmployee, birthdate: e.target.value })}
                  InputLabelProps={{
                    shrink: true, // Ensure the label stays on top of the field
                  }}
                />
                <TextField
                  label="Salary"
                  fullWidth
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                  type="number"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  { editingEmployee ? "Edit Employee" : "Add Employee" } 
                </Button>
              </Stack>
            </form>
          </Box>
        </Container>
      </Section>

      <br></br>
      <br></br>
      <hr></hr>
     
    </>
  );
};

export default EmployeeMgmt;
