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
  DROP TABLE IF EXISTS notes;
  DROP TABLE IF EXISTS categories;
  CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL 
  );
  CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    ranking INTEGER DEFAULT 3 NOT NULL,
    txt VARCHAR(255),
    category_id INTEGER REFERENCES categories(id) NOT NULL
  );
  INSERT INTO categories (name) VALUES ('express');
  INSERT INTO categories (name) VALUES ('SQL');
  INSERT INTO categories (name) VALUES ('Personal Growth');
  INSERT INTO notes (txt, ranking, category_id) VALUES ('learn express', 5, (SELECT id FROM categories WHERE name = 'express'));
  INSERT INTO notes (txt, ranking, category_id) VALUES ('learn node', 2, (SELECT id FROM categories WHERE name = 'express'));
  INSERT INTO notes (txt, ranking, category_id) VALUES ('learn postgres', 4, (SELECT id FROM categories WHERE name = 'SQL'));
  INSERT INTO notes (txt, ranking, category_id) VALUES ('learn react', 1, (SELECT id FROM categories WHERE name = 'Personal Growth'));
  INSERT INTO notes (txt, ranking, category_id) VALUES ('learn javascript', 3, (SELECT id FROM categories WHERE name = 'SQL'));
  INSERT INTO notes (txt, ranking, category_id) VALUES ('learn css', 3, (SELECT id FROM categories WHERE name = 'Personal Growth'));
  `;
  await client.query(SQL);

  //start server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000 ${process.env.PORT}`);
  });
}

init();
