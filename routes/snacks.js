var express = require('express');
var router = express.Router();
var db = require('../db/knex');


router.get('/', function(req, res, next) {
  db('snacks').then(function (snacks) {
    res.json(snacks);
  });
});

module.exports = router;
