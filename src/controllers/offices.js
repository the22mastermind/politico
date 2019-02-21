import validator from '../middlewares/validation';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/connector';

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
		return res.status(409).json({
			status: 409,
			error: `The office of type: <${officeData.type}> and name: <${officeData.name}> is already registered.`
		});
	}
	// Register office
	try {
		const qq = await pool.query('INSERT INTO offices(type,name) VALUES($1,$2) returning *',
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

// Register candidate
exports.registercandidate = async function (req, res) {
	// Joi Validation
	const { error } = validator.validateCandidate(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Office id
	const { id } = req.params;
	const candidateData = {
		party: req.body.party,
		user: req.body.user
	}
	// Check if party exists
	const party = await pool.query('SELECT * FROM parties WHERE id=$1', [candidateData.party]);
	if (party.rows.length === 0) {
		return res.status(400).json({
			status: 400,
			error: `The party of id: <${candidateData.party}> does not exist.`
		});
	}
	// Check if office exists
	const office = await pool.query('SELECT * FROM offices WHERE id=$1', [id]);
	if (office.rows.length === 0) {
		return res.status(400).json({
			status: 400,
			error: `The office of id: <${id}> does not exist.`
		});
	}
	// Check if user exists
	const user = await pool.query('SELECT * FROM users WHERE id=$1', [candidateData.user]);
	if (user.rows.length === 0) {
		return res.status(400).json({
			status: 400,
			error: `The user of id: <${candidateData.user}> does not exist.`
		});
	}
	// Check if candidate (office, party and user) is already registered
	const candidate = await pool.query('SELECT * FROM candidates WHERE office=$1 and party=$2 and candidate=$3',
		[
			id,
			candidateData.party,
			candidateData.user
		]);
	if (candidate.rows.length !== 0) {
		return res.status(409).json({
			status: 409,
			error: `The candidate of id: <${candidateData.user}> for office: <${id}> is already registered.`
		});
	}
	// Register candidate
	try {
		pool.query('INSERT INTO candidates(office, party, candidate) VALUES($1,$2,$3)',
		[
			id,
			candidateData.party,
			candidateData.user
		]);
		return res.status(201).json({
			status: 201,
			data: [
			  {
			  	office: id,
			  	user: candidateData.user
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
exports.electionResult = async function (req, res) {
	try {
		const { id } = req.params;
		// Check if office exists
		const office = await pool.query('SELECT * FROM offices WHERE id=$1', [id]);
		if (office.rows.length === 0) {
			return res.status(404).json({
				status: 404,
				error: `The office of id: <${id}> does not exist.`
			});
		}
		// Fetch election result for all offices order by highest votes?
		const result = await pool.query('SELECT office, candidate, COUNT(candidate) AS result FROM votes WHERE office=$1 GROUP BY office, candidate', [id]);
		if (result.rows.length !== 0) {
			return res.status(200).json({
				status: 200,
				data: result.rows
			});
		}
		return res.status(404).json({
			status: 404,
			message: 'Election results not found.'
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			error: 'Internal server error'
		});
	}
};




