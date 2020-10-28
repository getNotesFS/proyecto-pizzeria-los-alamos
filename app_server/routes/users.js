const express = require('express');
const router = express.Router();

const userspageController = (req, res) => {
  res.send('respond with a resource');
}
/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
router.get('/', userspageController);
module.exports = router;
