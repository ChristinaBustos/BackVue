CREATE DATABASE firstapp;
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    surname VARCHAR(40),
    lastname VARCHAR(40),
    email TEXT
);

SELECT * FROM employees;