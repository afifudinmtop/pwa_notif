const webPush = require("web-push");
const pool = require("../db");

const sendNotification = (req, res) => {
  const { title, body } = req.body;

  const payload = JSON.stringify({
    title: title || "Judul Kustom",
    body: body || "Pesan Kustom",
    icon: "/icon.png",
  });

  const query = "SELECT * FROM subs";

  pool.query(query, [], (err, results) => {
    if (err) {
      console.error("Error saat mengambil subscriptions:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    results.forEach((sub) => {
      const subscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      webPush
        .sendNotification(subscription, payload)
        .then((result) => console.log("Notifikasi terkirim.", result))
        .catch((e) => console.error("Gagal mengirim notifikasi:", e));
    });

    res.status(200).json({ success: true });
  });
};

const notif_user = (req, res) => {
  const { username, title, body } = req.body; // Terima username dari body request

  const query = "SELECT * FROM subs WHERE username = ?";

  pool.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error saat mengambil subscription:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (results.length > 0) {
      const sub = results[0]; // Asumsikan satu user memiliki satu subscription
      const subscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      const payload = JSON.stringify({ title, body, icon: "/icon.png" });

      webPush
        .sendNotification(subscription, payload)
        .then((result) => console.log("Notifikasi terkirim.", result))
        .catch((e) => console.error("Gagal mengirim notifikasi:", e));

      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: "Subscription tidak ditemukan." });
    }
  });
};

module.exports = { sendNotification, notif_user };
