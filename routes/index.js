var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/routes', function(req, res, next) {
  res.redirect('/coursemanager', { title: 'Course Home' });
});

module.exports = router;
