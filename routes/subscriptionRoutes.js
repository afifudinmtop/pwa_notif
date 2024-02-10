const express = require("express");
const router = express.Router();
const { saveSubscription } = require("../controllers/subscriptionController");

router.post("/subscribe", saveSubscription);

module.exports = router;
