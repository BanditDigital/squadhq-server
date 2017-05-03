var express = require('express');
var router = express.Router();

var users = ['John', 'Betty', 'Hal'];

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', function(req, res, next) {
  res.json(users);
});

module.exports = router;
