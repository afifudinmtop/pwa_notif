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

const update_username = (req, res) => {
  const { username, subscriptionEndpoint } = req.body;

  // Query untuk mencari dan update username berdasarkan endpoint
  const query = "UPDATE subs SET username = ? WHERE endpoint = ?";

  pool.execute(query, [username, subscriptionEndpoint], (err, results) => {
    if (err) {
      console.error("Error saat update username:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json({ message: "Username updated successfully." });
  });
};

module.exports = { saveSubscription, update_username };
