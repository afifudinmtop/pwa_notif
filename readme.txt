npm install
npx web-push generate-vapid-keys
node app.js



Database
user:admin
pass:admin
database:pwa_notif



Public Key:
BJZ5NFQDxJ9AB4kGx7qZd2eNwTTpCJovGk0xmdWcrXehe3dpypN4gaIAoao_UJ8mbGT9OnnkhprhR-MBX-4rk7c

Private Key:
YJTsvcRN5AuRVCir656986fLOXb1nhPlbDHYaJwCebc



http://localhost:3000/notify
postman -> body -> raw -> JSON
{
  "title": "Judul Kustom",
  "body": "Ini adalah pesan kustom"
}



http://localhost:3000/notify/user
postman -> body -> raw -> JSON
{
  "title": "notif bos",
  "body": "pagi bos apip",
  "username": "apip"
}
