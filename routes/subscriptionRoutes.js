const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

router.post("/subscribe", subscriptionController.saveSubscription);
router.post("/update-username", subscriptionController.update_username);

module.exports = router;
