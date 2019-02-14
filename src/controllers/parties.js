import partyModel from '../models/parties';
import validator from '../middlewares/validation';
import moment from 'moment';

// create Party
exports.createParty = async function (req, res) {
	// Joi Validation
	const { error } = validator.validateCreateParty(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Custom Validation
	// Check if party is already registered
	const party = await partyModel.find(p => p.name === req.body.name.trim());
	if (party) {
		return res.status(400).json({
			status: 400,
			error: `The party of name: <${req.body.name}> is already registered.`
		});
	}
	// Register party
	const newParty = {
		id: partyModel.length + 1,
		name: req.body.name.trim(),
		hqaddress: req.body.hqaddress.trim(),
		logourl: req.body.logourl.trim(),
		registeredon: moment().format('LLLL')
	};
	partyModel.push(newParty);
	return res.status(201).json({
		status: 201,
		data: [
		  {
		  	id: newParty.id,
		  	name: newParty.name
		  }
		]
	});
};

// view all Parties
exports.viewAllParties = async function (req, res) {
	return res.status(200).json({
		status: 200,
		data: partyModel
	});
};

// view single Party
exports.viewSingleParty = async function (req, res) {
	// Check if param is integer
	const { id } = req.params;
	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: `${id} must be an integer`
		});
	} else {
		const party = await partyModel.find(p => p.id === parseInt(id, 10));
		if (party) {
			return res.status(200).json({
				status: 200,
				data: party
			});
		} else {
			return res.status(404).json({
				status: 404,
				error: `Party of id: ${id} not found`
			});
		}
	}
};

// edit Party
exports.editParty = async function (req, res) {
	// Joi Validation
	const { error } = validator.validateEditParty(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Custom Validation
	// Check if id is integer
	const { id } = req.params;
	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: `${id} must be an integer`
		});
	}
	// Check if party is already registered
	const party = await partyModel.find(p => p.id === parseInt(id, 10));
	if (!party) {
		return res.status(404).json({
			status: 404,
			error: `The party of id: ${id} does not exist.`
		});
	}
	// Update party
	const newPartyName = {
		name: req.body.name
	};
	party.name = newPartyName.name;
	return res.status(200).json({
		status: 200,
		data: [
		  {
		  	id: party.id,
		  	name: newPartyName.name
		  }
		]
	});
};

// delete Party
exports.deleteParty = async function (req, res) {
	// Check if id is integer
	const { id } = req.params;
	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: `${id} must be an integer`
		});
	}
	// Check if party exists
	const party = await partyModel.find(p => p.id === parseInt(id, 10));
	if (!party) {
		return res.status(404).json({
			status: 404,
			error: `The party of id: ${id} does not exist.`
		});
	}
	// Delete party
	partyModel.map((parties, index) => {
		if (parties.id == id) {
			partyModel.splice(index, 1);
			return res.status(200).json({
				status: 200,
				data: [
					{
						message: 'Party deleted successfully!'
					}
				]
			});
		}
	});
};
