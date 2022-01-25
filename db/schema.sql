DROP DATABASE IF EXISTS company_db;
DROP TABLE IF EXISTS company_db;

USE company_db;

CREATE TABLE departments (
    departments_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departments_id INT,
    FOREIGN KEY (departments_id) REFERENCES departments(departments_id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(roles_id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

