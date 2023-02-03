DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

-- department table
CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id)
);

-- Selecting
SELECT * FROM department;

SELECT * FROM role;
 
SELECT * FROM employee;

-- Seeds
-- Department Seeds
INSERT INTO department (name) VALUE ("Literary");
INSERT INTO department (name) VALUE ("Production");
INSERT INTO department (name) VALUE ("Marketing");
INSERT INTO department (name) VALUE ("Finance");
-- Role seeds
INSERT INTO role (title, salary, department_id) VALUE ("Artistic Director", 125000, 1); 
INSERT INTO role (title, salary, department_id) VALUE ("Head of Production", 80000, 2); 
INSERT INTO role (title, salary, department_id) VALUE ("Communications Director", 85000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Managing Director", 120000, 4);
INSERT INTO role (title, salary, department_id) VALUE ("Artistic Associate", 68000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Lighting Director", 60000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Props Artisan", 55000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Communications Associate", 49000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Accounts Payable", 64000, 4);
-- Employee Seeds
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("John", "Doe", null, 1);  
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Jane", "Bond", null, 2);  
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Eric", "Zhuang", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Ashley", "Parrott", null, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("John", "Snow", 1, 5);  
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Arya", "Stark", 2, 6); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Fitz", "Chivalry", 2, 7); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Sydney", "Lee", 3, 8); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Willow", "Cat", 4, 9); 