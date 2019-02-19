import userModel from '../models/users';
import validator from '../middlewares/validation';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/connector';

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
	const userData = {
		email: req.body.email.trim(),
		phonenumber: req.body.phonenumber.trim()
	}
	// Check if email is already registered
	const user = await pool.query('SELECT * FROM users WHERE email=$1 or phonenumber=$2', [userData.email, userData.phonenumber]);
	if (user.rows.length !== 0) {
		return res.status(400).json({
			status: 400,
			error: `The email <${userData.email}> or phone number <${userData.phonenumber}> is already registered.`
		});
	}
	// Encrypt password
	bcrypt.hash(req.body.password.trim(), 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				status: 500,
				error: err
			});
		}
		if (hash) {
			// Register user
			const newUser = {
				firstname: req.body.firstname.trim(),
				lastname: req.body.lastname.trim(),
				othername: req.body.othername.trim() ? req.body.othername : ' ',
				email: req.body.email.trim(),
				password: req.body.password.trim(),
				phonenumber: req.body.phonenumber.trim(),
				passporturl: req.body.passporturl.trim(),
				registeredon: moment().format('LLLL')
			};
			// Persist user data in db
			try {
				pool.query('INSERT INTO users(firstname,lastname,othername,email,phonenumber,password,passporturl,registered) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
				[
					newUser.firstname,
					newUser.lastname,
					newUser.othername,
					newUser.email,
					newUser.phonenumber,
					newUser.password,
					newUser.passporturl,
					newUser.registeredon
				]);
				// Create token
				const token = jwt.sign(
					{
						email: newUser.email
					},
					process.env.JWT_KEY,
					{
						expiresIn: '6h'
					}
				);
				return res.status(201).json({
					status: 201,
					data: [
						{
							firstname: newUser.firstname,
							lastname: newUser.lastname,
							registeredon: newUser.registeredon,
							token: token
						}
					],
					message: 'Success!'
				});
			} catch (error) {
				return res.status(404).json({
					status: 404,
					error: error
				});
			}
		} else {
			return res.status(401).json({
				status: 401,
				error: err
			});
		}
	});
};

// Fetch all users
exports.fetchAllUsers = async function (req, res) {
	try {
		// Fetch all users by latest
		const users = await pool.query('SELECT id, firstname, lastname, email, phonenumber, registered FROM users ORDER BY id DESC');
		return res.status(200).json({
			message: `${users.rows.length}, users found.`,
			status: 200,
			data: users.rows
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			error: 'Internal server error'
		});
	}
};
