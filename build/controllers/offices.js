'use strict';

var _offices = require('../models/offices');

var _offices2 = _interopRequireDefault(_offices);

var _custom = require('../middlewares/custom');

var _custom2 = _interopRequireDefault(_custom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create Party

// import validator from '../middlewares/validation';
exports.createOffice = async function (req, res) {
	// Joi Validation
	// const { error } = validator.validateCreateOffice(req.body);
	// if (error) {
	// 	return res.status(400).json({
	// 		status: 400,
	// 		error: error.details[0].message
	// 	});
	// }
	// Custom validation
	// const officeChecker = checkEmptySpaces.createOfficeChecker(req.body);
	// if (officeChecker) {
	// 	return res.status(400).json({
	// 		status: 400,
	// 		error: officeChecker.error
	// 	});
	// }
	// Check if office (type and name) is already registered
	var office = await _offices2.default.find(function (o) {
		return o.type === req.body.type.trim() && o.name === req.body.name.trim();
	});
	if (office) {
		return res.status(400).json({
			status: 400,
			error: 'The office of type: <' + req.body.type.trim() + '> and name: <' + req.body.name.trim() + '> is already registered.'
		});
	}
	// Register office
	var newOffice = {
		id: _offices2.default.length + 1,
		type: req.body.type.trim(),
		name: req.body.name.trim()
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