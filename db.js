const pg = require("pg");

const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost:5432/acme_notes_categories_db");

module.exports = client;
