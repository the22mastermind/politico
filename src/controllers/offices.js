import validator from '../middlewares/validation';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/connector';
import checkRole from '../middlewares/check-role';

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
	const officeData = {
		type: req.body.type.trim(),
		name: req.body.name.trim()
	}
	const office = await pool.query('SELECT * FROM offices WHERE type=$1 and name=$2', [officeData.type, officeData.name]);
	if (office.rows.length !== 0) {
		return res.status(400).json({
			status: 400,
			error: `The office of type: <${officeData.type}> and name: <${officeData.name}> is already registered.`
		});
	}
	// Register office
	try {
		pool.query('INSERT INTO offices(type,name) VALUES($1,$2)',
		[
			officeData.type,
			officeData.name
		]);
		return res.status(201).json({
			status: 201,
			data: [
			  {
			  	type: officeData.type,
			  	name: officeData.name
			  }
			]
		});
	} catch (error) {
		return res.status(404).json({
			status: 404,
			error: error
		});
	}
};

// view all offices
exports.viewAllOffices = async function (req, res) {
	try {
		// Fetch all offices by latest
		const offices = await pool.query('SELECT * FROM offices ORDER BY id DESC');
		return res.status(200).json({
			message: `${offices.rows.length}, offices found.`,
			status: 200,
			data: offices.rows
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			error: 'Internal server error'
		});
	}
};

// view specific office
exports.viewSpecificOffice = async function (req, res) {
	try {
		const { id } = req.params;
		// Fetch all offices by latest
		const office = await pool.query('SELECT * FROM offices WHERE id=$1', [id]);
		if (office.rows.length !== 0) {
			return res.status(200).json({
				status: 200,
				data: office.rows
			});
		} else {
			return res.status(404).json({
				status: 404,
				error: `Office of id: ${id} not found`
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: 500,
			error: error
		});
	}
};
