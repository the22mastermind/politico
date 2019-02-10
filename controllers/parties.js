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

	// // Check if party is already registered
	// const party = await partyModel.find(p => p.name === req.body.name);
	// if (party) {
	// 	return res.status(400).json({
	// 		status: 400,
	// 		error: `The party ${req.body.name} is already registered.`
	// 	});
	// }
	// Register party
	const newParty = {
		id: partyModel.length + 1,
		name: req.body.name,
		hqaddress: req.body.hqaddress,
		logourl: req.body.logourl,
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
	const { id, name } = req.params;
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
	const partyName = await partyModel.find(p => p.name === name);
	if (!partyName) {
		return res.status(404).json({
			status: 404,
			error: `The party of name: ${name} does not exist.`
		});
	}
	// Check if id and name is for same party
	if (party.id !== partyName.id) {
		return res.status(404).json({
			status: 404,
			error: `Party of id: ${id} and name: ${name} not found.`
		});
	}
	// Update party
	const newPartyName = {
		name: req.body.name
	};
	partyName.name = newPartyName.name;
	return res.status(200).json({
		status: 200,
		data: [
		  {
		  	id: partyName.id,
		  	name: newPartyName.name
		  }
		]
	});
};

// edit Party
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
