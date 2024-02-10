const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "pwa_notif",
  waitForConnections: true,
});

module.exports = pool;
