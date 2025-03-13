const pg = require("pg");

const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost:5432/acme_hr_directory_db");

module.exports = client;
