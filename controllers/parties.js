import partyModel from '../models/parties';
import validator from '../middlewares/validation';
import moment from 'moment';

// User signup
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
