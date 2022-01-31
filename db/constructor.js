const inquirer = require('inquirer');
const db = require('./connection');

class DB {
    constructor(db) {
        this.db = db;
    }

    searchDepartments() {
        return this.db.promise().query("SELECT * FROM departments");
    }

    searchRoles() {
        return this.db.promise().query("SELECT * FROM roles");
    }

    searchEmployees() {
        return this.db.promise().query("SELECT * FROM employees");
    }
}


module.exports = new DB(db);