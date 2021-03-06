require('dotenv').config()

let localConfig = {
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  secret: process.env.MONGO_URI_SECRET,
  database: process.env.MONGO_URI
};

module.exports = localConfig;