const pool = require("../db");

const saveSubscription = (req, res) => {
  const { endpoint, keys } = req.body;
  const { p256dh, auth } = keys;

  const query = "INSERT INTO subs (endpoint, p256dh, auth) VALUES (?, ?, ?)";

  pool.execute(query, [endpoint, p256dh, auth], (err, results) => {
    if (err) {
      console.error("Error saat menyimpan subscription:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(201).json({ id: results.insertId });
  });
};

module.exports = { saveSubscription };
