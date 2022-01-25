// Import + require dependencies 
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require("express");
const connection = require("./db/connection");


//create connection 
connection.connect((err) => {
  if (err) throw (err);
  console.log('Connected!');
  startScript()
});


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