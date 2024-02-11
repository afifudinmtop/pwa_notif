const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/notify", notificationController.sendNotification);
router.post("/notify/user", notificationController.notif_user);

module.exports = router;
