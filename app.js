const express = require("express");
const webPush = require("web-push");
const notificationRoutes = require("./routes/notificationRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const vapidKeys = {
  publicKey:
    "BJZ5NFQDxJ9AB4kGx7qZd2eNwTTpCJovGk0xmdWcrXehe3dpypN4gaIAoao_UJ8mbGT9OnnkhprhR-MBX-4rk7c",
  privateKey: "YJTsvcRN5AuRVCir656986fLOXb1nhPlbDHYaJwCebc",
};

webPush.setVapidDetails(
  "https://www.yourdomain.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.use(notificationRoutes);
app.use(subscriptionRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
