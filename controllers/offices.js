import officeModel from '../models/offices';
import validator from '../middlewares/validation';
import moment from 'moment';

// create Party
exports.createOffice = async function (req, res) {
	// Joi Validation
	const { error } = validator.validateCreateOffice(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Register office
	const newOffice = {
		id: officeModel.length + 1,
		type: req.body.type,
		name: req.body.name
	};
	officeModel.push(newOffice);
	return res.status(201).json({
		status: 201,
		data: [
		  {
		  	id: newOffice.id,
		  	type: newOffice.type,
		  	name: newOffice.name
		  }
		]
	});
};