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
	// Check if office (type and name) is already registered
	const office = await officeModel.find(o => o.type === req.body.type.trim() && o.name === req.body.name.trim());
	if (office) {
		return res.status(400).json({
			status: 400,
			error: `The office of type: <${req.body.type.trim()}> and name: <${req.body.name.trim()}> is already registered.`
		});
	}
	// Register office
	const newOffice = {
		id: officeModel.length + 1,
		type: req.body.type.trim(),
		name: req.body.name.trim()
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

// view all offices
exports.viewAllOffices = async function (req, res) {
	return res.status(200).json({
		status: 200,
		data: officeModel
	});
};

// view specific office
exports.viewSpecificOffice = async function (req, res) {
	// Check if param is integer
	const { id } = req.params;
	if (!Number.isInteger(parseInt(id, 10))) {
		return res.status(400).json({
			status: 400,
			error: `${id} must be an integer`
		});
	} else {
		const office = await officeModel.find(o => o.id === parseInt(id, 10));
		if (office) {
			return res.status(200).json({
				status: 200,
				data: office
			});
		} else {
			return res.status(404).json({
				status: 404,
				error: `Office of id: ${id} not found`
			});
		}
	}
};
