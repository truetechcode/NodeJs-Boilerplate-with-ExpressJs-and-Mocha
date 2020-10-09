require('dotenv').config()

let productionConfig = {
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  database: process.env.MONGO_URI
};

module.exports = productionConfig;