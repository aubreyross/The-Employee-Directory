// Import + require dependencies 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require("express");
const connection = require("./db/connection.js");
require('mysql');
require('console.table');

const app = express();

//create connection 
connection.connect((err) => {
  if (err) throw (err);
  console.log('Connected!');
  startScript()
});

//start user prompts
function startScript() {
  inquirer.prompt({
    type: "list",
    message: "Welcome back! What would you like to do today?",
    name: "action",
    choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Exit"]
  })
    .then((responses) => {
      switch (response.action) {
        case 'View Departments':
          viewDepartments();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'View Employees':
          viewEmployees();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Exit':
          connection.end();
          break;
      }
    });
}

//View Departments
function viewDepartments() {
  const statement = `SELECT * FROM departments`
  connection.query(statement, (err, res) => {
    console.table(res);
    startScript();
  });
}

//view employee roles
function viewRoles() {
  const statement = `SELECT * FROM roles`
  connection.query(statement, (err, res) => {
    console.table(res);
    startScript();
  });
}

//view employees
function viewEmployees() {
  const statement = `SELECT * FROM employees`
  connection.query(statement, (err, res) => {
    console.table(res);
    startScript();
  });
}

//add a department
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "addDepartment",
      message: "Please enter department name"
    },
  ])
    .then((response) => {
      const statement = `INSERT INTO departments (name)
                            VALUES(?)`;
      connection.query(statement, response.addDepartment, (err, res) => {
        if (err) throw err;
        console.table(rows);
        startScript();
      });
    });
}

//add an employee
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter employee's first name"
    },
    {
      type: "input",
      name: "last_name",
      message: "Employee last name"
    },
    {
      type: "input",
      name: "job_title",
      message: "Employee job title"
    },
    {
      type: "input",
      name: "roles_id",
      message: "Employee role"
    },
  ])
    .then((response) => {
      const statement = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
                            VALUES(?,?,?,?,?)`;
      const bio = [
        response.first_name,
        response.last_name,
        response.job_title,
        response.roles_id
      ];
      connection.query(statement, bio, (err, rows) => {
        if (err) throw err;
        startScript();
      });
    });
}

//add employee role
function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "Name of employee role"
    },
    {
      type: "input",
      name: "salary",
      message: "Employee's salary"
    },
    {
      type: "input",
      name: "dept",
      message: "Employee's department name"
    },
  ])
    .then((response) => {
      const statement = `INSERT INTO roles (title, salary, departments_id)
                VALUES(?,?,?)`;
      const bio = [
        response.role,
        response.salary,
        response.dept
      ];
      connection.query(statement, bio, (err, res) => {
        if (err) throw err;
        console.table(rows);
        startScript();
      });
    });
}

