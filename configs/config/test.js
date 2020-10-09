require('dotenv').config()

let testConfig = {
  hostname: process.env.TEST_HOSTNAME,
  port: process.env.TEST_PORT,
  database: process.env.MONGO_URI_TEST
};

module.exports = testConfig;