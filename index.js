//Import Express module
const express = require('express');
//Import MySQL module
const MySQL = require('mysql');
const app = express();
const port = 3000;

//MySQL DB Arguments
const dbConnection = MySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodetest',
});

//Connect with MySQL DB
dbConnection.connect(error => {
    if(error){
        throw error;
    }
    console.log("MySQL Connected!");
});   

//Create a database in MySQL
app.get('/create-db', (req, res) => {
    //Query to create a database in MySQL
    let createDBQuery = "CREATE DATABASE NODETEST";
    dbConnection.query(createDBQuery, (error) => {
    if(error){
        throw error;
    }
    res.send("Database Created!");
   });
});

//Create an employee table
app.get('/create-employee-table', (req, res) => {
    //Query to create a database in MySQL
    let createEmployeeTableQuery = "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
    dbConnection.query(createEmployeeTableQuery, (error) => {
    if(error){
        throw error;
    }
    res.send("Employee Table Created!");
   });
});

//Insert a record in employee table
app.get('/add-employee', (req, res) => {
    //Query to insert a record in table
    let insertQueryData = { name: "Ziaulhaq Fazli", designation: "Software Engineer"};
    let insertRecordQuery = "INSERT INTO EMPLOYEE SET ?";
    dbConnection.query(insertRecordQuery, insertQueryData, (error) => {
    if(error){
        throw error;
    }
    res.send("Employee Added Successfully!");
   });
});

//Get All the employees from a table
app.get('/get-employees', (req, res) => {
    //Query to get all employees
    let getEmployeesQuery = "SELECT * FROM EMPLOYEE";
    dbConnection.query(getEmployeesQuery, (error, data) => {
    if(error){
        throw error;
    }
    res.json({
        employees: data
    });
   });
});

//Get a single employee BY ID from a table
app.get('/get-single-employee', (req, res) => {
    //Query to get an employee by id
    let getEmployeesQuery = "SELECT * FROM EMPLOYEE WHERE id = 1";
    dbConnection.query(getEmployeesQuery, (error, data) => {
    if(error){
        throw error;
    }
    res.json({
        employees: data
    });
   });
});

//Get an employee BY ID from a table
app.get('/update-employee/:id', (req, res) => {
    let newName = "Javed";
    //Query to update an employee by id
    let updateQuery = `UPDATE EMPLOYEE SET name = '${newName}' WHERE id = '${req.params.id}'`;
    dbConnection.query(updateQuery, (error) => {
    if(error){
        res.send(updateQuery);
        throw error;
    }
    res.send("Employee Updated!");
   });
});

//Delete an employee BY ID from a table
app.get('/delete-employee/:id', (req, res) => {
    //Query to delete an employee by id
    let deleteQuery = `DELETE FROM EMPLOYEE WHERE id = '${req.params.id}'`;
    dbConnection.query(deleteQuery, (error) => {
    if(error){
        throw error;
    }
    res.send("Employee Deleted!");
   });
});

//Server is running or Port
app.listen(port, 'localhost', (req, res) => {
    console.log("Server is running on Port:" +port);
}); 