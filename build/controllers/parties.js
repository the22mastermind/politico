'use strict';

var _parties = require('../models/parties');

var _parties2 = _interopRequireDefault(_parties);

var _validation = require('../middlewares/validation');

var _validation2 = _interopRequireDefault(_validation);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create Party
exports.createParty = async function (req, res) {
	// Joi Validation
	var _validator$validateCr = _validation2.default.validateCreateParty(req.body),
	    error = _validator$validateCr.error;

	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Custom Validation
	// Check if party is already registered
	var party = await _parties2.default.find(function (p) {
		return p.name === req.body.name.trim();
	});
	if (party) {
		return res.status(400).json({
			status: 400,
			error: 'The party of name: <' + req.body.name + '> is already registered.'
		});
	}
	// Register party
	var newParty = {
		id: _parties2.default.length + 1,
		name: req.body.name.trim(),
		hqaddress: req.body.hqaddress.trim(),
		logourl: req.body.logourl.trim(),
		registeredon: (0, _moment2.default)().format('LLLL')
	};
	_parties2.default.push(newParty);
	return res.status(201).json({
		status: 201,
		data: [{
			id: newParty.id,
			name: newParty.name
		}]
	});
};

// view all Parties
exports.viewAllParties = async function (req, res) {
	return res.status(200).json({
		status: 200,
		data: _parties2.default
	});
};

// view single Party
exports.viewSingleParty = async function (req, res) {
	// Check if param is integer
	var id = req.params.id;

	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: id + ' must be an integer'
		});
	} else {
		var party = await _parties2.default.find(function (p) {
			return p.id === parseInt(id, 10);
		});
		if (party) {
			return res.status(200).json({
				status: 200,
				data: party
			});
		} else {
			return res.status(404).json({
				status: 404,
				error: 'Party of id: ' + id + ' not found'
			});
		}
	}
};

// edit Party
exports.editParty = async function (req, res) {
	// Joi Validation
	var _validator$validateEd = _validation2.default.validateEditParty(req.body),
	    error = _validator$validateEd.error;

	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Custom Validation
	// Check if id is integer
	var id = req.params.id;

	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: id + ' must be an integer'
		});
	}
	// Check if party is already registered
	var party = await _parties2.default.find(function (p) {
		return p.id === parseInt(id, 10);
	});
	if (!party) {
		return res.status(404).json({
			status: 404,
			error: 'The party of id: ' + id + ' does not exist.'
		});
	}
	// Update party
	var newPartyName = {
		name: req.body.name
	};
	party.name = newPartyName.name;
	return res.status(200).json({
		status: 200,
		data: [{
			id: party.id,
			name: newPartyName.name
		}]
	});
};

// delete Party
exports.deleteParty = async function (req, res) {
	// Check if id is integer
	var id = req.params.id;

	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: id + ' must be an integer'
		});
	}
	// Check if party exists
	var party = await _parties2.default.find(function (p) {
		return p.id === parseInt(id, 10);
	});
	if (!party) {
		return res.status(404).json({
			status: 404,
			error: 'The party of id: ' + id + ' does not exist.'
		});
	}
	// Delete party
	_parties2.default.map(function (parties, index) {
		if (parties.id == id) {
			_parties2.default.splice(index, 1);
			return res.status(200).json({
				status: 200,
				data: [{
					message: 'Party deleted successfully!'
				}]
			});
		}
	});
};
//# sourceMappingURL=parties.js.map