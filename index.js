require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const client = require("./db");
const apiRouter = require("./api");

const app = express();
// const port = process.env.PORT || 3000;
//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", apiRouter);
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({ error: error.message });
});
//dp

//init
async function init() {
  await client.connect();
  console.log("Connected to database");

  console.log(`PORT: ${process.env.PORT}`);

  //seed the database
  const SQL = /*sql*/ `
  DROP TABLE IF EXISTS employees;
  DROP TABLE IF EXISTS departments;
  CREATE TABLE departments(
    id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL 
  );
  CREATE TABLE employees;(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    department_id INTEGER REFERENCES departments(id) NOT NULL
  );
  INSERT INTO departments (name) VALUES ('warehouse');
  INSERT INTO departments (name) VALUES ('Sales');
  INSERT INTO departments (name) VALUES ('Csuite');
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Albert Mills', '(946) 529-4164'(SELECT id FROM departments WHERE name = 'warehouse'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Jose Stamm', '1-405-787-8749 x4311' (SELECT id FROM departments WHERE name = 'sales'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Ms. Allison Lehner', '996.680.3262 x467' (SELECT id FROM departments WHERE name = 'Csuite'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Jessie Dibbert', '(204) 816-2524 x53873' (SELECT id FROM departments WHERE name = 'warehouse'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Miss Maria Kiehn', '(206) 990-1990 x8370' (SELECT id FROM departments WHERE name = 'Sales'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Geraldine King DDS', '337.218.2322 x6035' (SELECT id FROM departments WHERE name = 'Csuite'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Jaime Murazik', '(820) 544-8026 x284' (SELECT id FROM departments WHERE name = 'warehouse'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Brian Monahan', '(839) 289-4790 x338' (SELECT id FROM departments WHERE name = 'Sales'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Vivian Reinger', '297.696.9011 x342' (SELECT id FROM departments WHERE name = 'Csuite'));,
  INSERT INTO employees (name, phone, department_id ) 
    VALUES ('Elbert Kiehn', '(339) 543-5497 x24059' (SELECT id FROM departments WHERE name = 'warehouse'));`;

  await client.query(SQL);

  //start server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000 ${process.env.PORT}`);
  });
}

init();
