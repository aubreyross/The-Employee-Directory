// Import + require dependencies 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require("express");
require('mysql');
require('console.table');

const app = express();

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'company_db'
    });

//create connection 
db.connect((err) => {
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
    .then(function (response) {
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
          db.end();
          break;
      }
    });
}

//View Departments
function viewDepartments() {
  const statement = `SELECT * FROM departments`
  db.query(statement, (err, res) => {
    console.table(res);
    startScript();
  });
}

//view employee roles
function viewRoles() {
  const statement = `SELECT * FROM roles`
  db.query(statement, (err, res) => {
    console.table(res);
    startScript();
  });
}

//view employees
function viewEmployees() {
  const statement = `SELECT * FROM employees`
  db.query(statement, (err, res) => {
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
    .then(function (response) {
      const statement = `INSERT INTO departments (name)
                            VALUES(?)`;
      db.query(statement, response.addDepartment, (err, res) => {
        if (err) throw err;
        console.table(res);
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
      name: "roles_id",
      message: "Employee role ID"
    },
    {
      type: "input",
      name: "manager_id",
      message: "Manager ID of Employee"
    },
  ])
    .then(function (response) {
      const statement = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
                            VALUES(?,?,?,?)`;
      const bio = [
        response.first_name,
        response.last_name,
        response.roles_id,
        response.manager_id
      ];
      db.query(statement, bio, (err, res) => {
        if (err) throw err;
        console.table(res);
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
      name: "department",
      message: "Employee's department ID"
    },
  ])
    .then(function (response) {
      const statement = `INSERT INTO roles (title, salary, departments_id)
                VALUES(?,?,?)`;
      const bio = [
        response.role,
        response.salary,
        response.department
      ];
      db.query(statement, bio, (err, res) => {
        if (err) throw err;
        console.table(res);
        startScript();
      });
    });
}

