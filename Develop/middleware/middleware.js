const express = require('express');
const app = express();

module.exports = function ping (options) {
    return function (req, res, next) {

        
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    
      // Implement the middleware function based on the options object
      next()
    }
  }
