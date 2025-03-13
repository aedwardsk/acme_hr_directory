const router = require("express").Router();
const client = require("./db");

router.get("/departments", async (req, res, next) => {
  try {
    const SQL = /*sql*/ `
  SELECT * FROM departments;
  `;
    const response = await client.query(SQL);

    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/employees", async (req, res, next) => {
  try {
    const SQL = /*sql*/ `
  SELECT * FROM employees;
  `;
    const response = await client.query(SQL);

    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

router.post("/employees", async (req, res, next) => {
  try {
    const { name, phone, department_id } = req.body;
    const SQL = /*sql*/ `
    INSERT INTO employees (name, phone, department_id) VALUES ($1,$2,$3) RETURNING *;
    `;
    const response = await client.query(SQL, [name, phone, department_id]);
    res.status(201).send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/employees/:id", async (req, res, next) => {
  try {
    const { name, phone, department_id } = req.body;
    const SQL = /*sql*/ `
    UPDATE employees  SET name=$1, phone=$2, department_id=$3, updated_at= now()
    WHERE id=$4 RETURNING *;
    `;
    const response = await client.query(SQL, [name, phone, department_id, req.params.id]);
    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete("/employees/:id", async (req, res, next) => {
  try {
    const SQL = /*sql*/ `
      DELETE from employees
      WHERE id = $1
    `;
    const response = await client.query(SQL, [req.params.id]);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
