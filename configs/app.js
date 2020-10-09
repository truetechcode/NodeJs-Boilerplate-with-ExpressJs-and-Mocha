const express = require('express');
const mongoose = require('mongoose');
require('../middlewares/strategies');

module.exports = function () {
  let server = express(),
    create,
    start;

  create = (config) => {
    let routes = require('../routes');
    // set all the server things
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    server.use(express.json({ limit: '50mb' }));
    server.use(express.urlencoded({ extended: true, limit: '50mb' }))

    server.use(function logErrors(err, req, res, next) {
      console.error(err)
      next(err)
    })

    server.use(function errorHandler(err, req, res, next) {
      return res.status(500).json({
        'code': 'SERVER_ERROR',
        'description': 'something went wrong, Please try again'
      });
    })

    mongoose.set('returnOriginal', false);

    //connect the database
    mongoose.connect(
      config.database,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    ).then(() => console.log('Database Connection Successful!!'))
      .catch(err => console.error(err));

    // Set up routes
    routes.init(server);
  };


  start = () => {
    let hostname = server.get('hostname'),
      port = server.get('port');
    server.listen(port, function () {
      console.log('Express server listening on - http://' + hostname + ':' + port);
    });

  };
  return {
    create: create,
    start: start,
    server: server
  };
};