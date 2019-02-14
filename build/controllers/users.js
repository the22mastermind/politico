'use strict';

var _users = require('../models/users');

var _users2 = _interopRequireDefault(_users);

var _validation = require('../middlewares/validation');

var _validation2 = _interopRequireDefault(_validation);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// User signup
exports.userSignup = async function (req, res) {
	// Joi Validation
	var _validator$validateSi = _validation2.default.validateSignUp(req.body),
	    error = _validator$validateSi.error;

	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Check if email is already registered
	var user = await _users2.default.find(function (u) {
		return u.email === req.body.email;
	});
	if (user) {
		return res.status(400).json({
			status: 400,
			error: 'The email ' + req.body.email + ' is already registered.'
		});
	}
	// Register user
	var newUser = {
		id: _users2.default.length + 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		othername: req.body.othername,
		email: req.body.email,
		password: req.body.password,
		phonenumber: req.body.phonenumber,
		passporturl: req.body.passporturl,
		isadmin: false,
		registeredon: (0, _moment2.default)().format('LLLL')
	};
	_users2.default.push(newUser);
	return res.status(201).json({
		status: 201,
		data: [{
			firstname: newUser.firstname,
			lastname: newUser.lastname,
			othername: newUser.othername,
			email: newUser.email,
			phonenumber: newUser.phonenumber,
			isadmin: newUser.isadmin,
			registeredon: newUser.registeredon
		}],
		message: 'Success!'
	});
};
//# sourceMappingURL=users.js.map