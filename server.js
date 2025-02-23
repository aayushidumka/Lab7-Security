import dotenv from "dotenv";       // Use import instead of require
import express from "express";
import mysql from "mysql2";
import cors from "cors";

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variables from the .env file
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Load from .env
  user: process.env.DB_USER,       // Load from .env
  password: process.env.DB_PASSWORD,  // Load from .env
  database: process.env.DB_NAME,   // Load from .env
  port: process.env.DB_PORT,       // Load from .env
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
    return;
  }
  console.log("Connected to MySQL Database");
});

// API Route to Fetch Employees
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// API Route to Add Employee
app.post("/employees", (req, res) => {
  console.log("Received POST request to /employees");
  const { first_name, last_name, email, birthdate, salary } = req.body;
  const query = "INSERT INTO employees (first_name, last_name, email, birthdate, salary) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [first_name, last_name, email, birthdate, salary], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Fetch the newly inserted employee by its ID
    const newEmployee = {
      employee_id: results.insertId, // Gets the auto-incremented ID
      first_name,
      last_name,
      email,
      birthdate,
      salary
    };

    res.status(201).json(newEmployee); // Return the new employee
  });
});

// API ROUTE UPDATED
// API route to edit employee
app.put('/employees/:employee_id', (req, res) => {
  console.log("Received data to update:", req.body); 
  const { employee_id } = req.params; // Corrected extraction
  const { first_name, last_name, email, birthdate, salary } = req.body;

  const query = `UPDATE employees SET first_name = ?, last_name = ?, email = ?, birthdate = ?, salary = ? WHERE employee_id = ?`;

  db.query(query, [first_name, last_name, email, birthdate, salary, employee_id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found or no changes made" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  });
});






// // API route to edit employee
// app.put('/employees/:employee_id', (req, res) => {
//   console.log("Received data to update:", req.body); 
//   const { employee_id } = req.params.employee_id;
//   const { first_name, last_name, email, birthdate, salary } = req.body;
  
//   const query = `UPDATE employees SET first_name = ?, last_name = ?, email = ?, birthdate = ?, salary = ? WHERE employee_id = ?`;
  
//   // Assuming `db` is your MySQL connection object
//   db.query(query, [first_name, last_name, email, birthdate, salary, employee_id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     res.status(200).json({ message: "Employee updated successfully"})

//     // Now, query the updated employee from the database to send back the updated data
//     // const getUpdatedEmployeeQuery = `SELECT * FROM employees WHERE employee_id = ?`;
//     // db.query(getUpdatedEmployeeQuery, [employee_id], (err, rows) => {
//     //   if (err) {
//     //     return res.status(500).json({ error: err.message });
//     //   }
//     //   console.log("CLEARRRRRRRRRRRRR")
//     //   console.log("Database result:", rows);
//     //   // Send back the updated employee data
//     //   res.status(200).json({ message: "Employee updated successfully", updatedEmployee: rows[0] });
//     ;
//   });
// });

// API route to delete employee 
app.delete('/employees/:employee_id', (req, res) => {
  const employee_id = req.params.employee_id; // Convert to number
  console.log("Attempting to delete employee with ID:", employee_id); // Debugging log

  const query = `DELETE FROM employees WHERE employee_id = ?`;
  
  db.query(query, [employee_id], (err, result) => {
    if (err) {
      console.error("Database error:", err); // Debugging error log
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  });
});


// Start Server
const PORT = process.env.PORT || 5000;  // You can also set a PORT in .env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
