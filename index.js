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
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ranking INTEGER DEFAULT 3 NOT NULL,
    txt VARCHAR(255),
    department_id INTEGER REFERENCES departments(id) NOT NULL
  );
  INSERT INTO departments (name) VALUES ('express');
  INSERT INTO departments (name) VALUES ('SQL');
  INSERT INTO departments (name) VALUES ('Personal Growth');
  INSERT INTO employees; (txt, ranking, department_id) VALUES ('learn express', 5, (SELECT id FROM departments WHERE name = 'express'));
  INSERT INTO employees; (txt, ranking, department_id) VALUES ('learn node', 2, (SELECT id FROM departments WHERE name = 'express'));
  INSERT INTO employees; (txt, ranking, department_id) VALUES ('learn postgres', 4, (SELECT id FROM departments WHERE name = 'SQL'));
  INSERT INTO employees; (txt, ranking, department_id) VALUES ('learn react', 1, (SELECT id FROM departments WHERE name = 'Personal Growth'));
  INSERT INTO employees; (txt, ranking, department_id) VALUES ('learn javascript', 3, (SELECT id FROM departments WHERE name = 'SQL'));
  INSERT INTO employees; (txt, ranking, department_id) VALUES ('learn css', 3, (SELECT id FROM departments WHERE name = 'Personal Growth'));
  `;
  await client.query(SQL);

  //start server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000 ${process.env.PORT}`);
  });
}

init();
