const router = require("express").Router();
const client = require("./db");

router.get("/categories", async (req, res, next) => {
  try {
    const SQL = /*sql*/ `
  SELECT * FROM categories;
  `;
    const response = await client.query(SQL);

    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

router.get("/notes", async (req, res, next) => {
  try {
    const SQL = /*sql*/ `
  SELECT * FROM notes;
  `;
    const response = await client.query(SQL);

    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});

router.post("/notes", async (req, res, next) => {
  try {
    const { txt, category_id } = req.body;
    const SQL = /*sql*/ `
    INSERT INTO notes (txt, category_id) VALUES ($1, $2) RETURNING *;
    `;
    const response = await client.query(SQL, [txt, category_id]);
    res.status(201).send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put("/notes/:id", async (req, res, next) => {
  try {
    const { txt, ranking, category_id } = req.body;
    const SQL = /*sql*/ `
    UPDATE notes  SET txt=$1, ranking=$2, category_id=$3, updated_at= now()
    WHERE id=$4 RETURNING *;
    `;
    const response = await client.query(SQL, [txt, ranking, category_id, req.params.id]);
    res.send(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete("/notes/:id", async (req, res, next) => {
  try {
    const SQL = /*sql*/ `
      DELETE from notes
      WHERE id = $1
    `;
    const response = await client.query(SQL, [req.params.id]);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
