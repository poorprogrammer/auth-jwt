var express = require('express');
var router = express.Router();

/* GET users listing. (PROTECTED ENDPOINT)*/
router.get('/', function(req, res, next) {
  res.send('All users should be shown');
});

module.exports = router;
