import userModel from '../models/users';
import validator from '../middlewares/validation';
import moment from 'moment';

// User signup
exports.userSignup = async function (req, res) {
	// Joi Validation
	const { error } = validator.validateSignUp(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Custom Validation

	// Check if email is already registered
	const user = await userModel.find(u => u.email === req.body.email);
	if (user) {
		return res.status(400).json({
			status: 400,
			error: `The email ${req.body.email} is already registered.`
		});
	}
	// Register user
	const newUser = {
		id: userModel.length + 1,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		othername: req.body.othername,
		email: req.body.email,
		password: req.body.password,
		phonenumber: req.body.phonenumber,
		passporturl: req.body.passporturl,
		isadmin: false,
		registeredon: moment().format('LLLL')
	};
	userModel.push(newUser);
	return res.status(201).json({
		status: 201,
		data: [
		  {
		  	firstname: newUser.firstname,
		  	lastname: newUser.lastname,
		  	othername: newUser.othername,
		  	email: newUser.email,
		  	phonenumber: newUser.phonenumber,
		  	isadmin: newUser.isadmin,
		  	registeredon: newUser.registeredon
		  }
		],
		message: 'Success!'
	});
};
