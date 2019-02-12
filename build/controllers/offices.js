'use strict';

var _offices = require('../models/offices');

var _offices2 = _interopRequireDefault(_offices);

var _validation = require('../middlewares/validation');

var _validation2 = _interopRequireDefault(_validation);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create Party
exports.createOffice = async function (req, res) {
	// Joi Validation
	var _validator$validateCr = _validation2.default.validateCreateOffice(req.body),
	    error = _validator$validateCr.error;

	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Register office
	var newOffice = {
		id: _offices2.default.length + 1,
		type: req.body.type,
		name: req.body.name
	};
	_offices2.default.push(newOffice);
	return res.status(201).json({
		status: 201,
		data: [{
			id: newOffice.id,
			type: newOffice.type,
			name: newOffice.name
		}]
	});
};

// view all offices
exports.viewAllOffices = async function (req, res) {
	return res.status(200).json({
		status: 200,
		data: _offices2.default
	});
};

// view specific office
exports.viewSpecificOffice = async function (req, res) {
	// Check if param is integer
	var id = req.params.id;

	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: id + ' must be an integer'
		});
	} else {
		var office = await _offices2.default.find(function (o) {
			return o.id === parseInt(id, 10);
		});
		if (office) {
			return res.status(200).json({
				status: 200,
				data: office
			});
		} else {
			return res.status(404).json({
				status: 404,
				error: 'Office of id: ' + id + ' not found'
			});
		}
	}
};
//# sourceMappingURL=offices.js.map