import validator from '../middlewares/validation';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/connector';

// User cast vote
exports.castVote = async function (req, res) {
	// Joi Validation
	const { error } = validator.validateVote(req.body);
	if (error) {
		return res.status(400).json({
			status: 400,
			error: error.details[0].message
		});
	}
	// Retrieve userId from token | To vote, user must be logged in
	const token = req.headers.authorization.split(' ')[1];
	const decoded = jwt.verify(token, process.env.JWT_KEY);
	req.userData = decoded;
	// Office id
	const voteData = {
		office: req.body.office,
		candidate: req.body.candidate,
		voterId: req.userData.userId,
		createdon: moment().format('LLLL')
	}
	// Check if office exists
	const office = await pool.query('SELECT * FROM offices WHERE id=$1', [voteData.office]);
	if (office.rows.length === 0) {
		return res.status(404).json({
			status: 404,
			error: `The office of id: <${voteData.office}> does not exist.`
		});
	}
	// Check if candidate exists
	const candidate = await pool.query('SELECT * FROM candidates WHERE id=$1', [voteData.candidate]);
	if (candidate.rows.length === 0) {
		return res.status(404).json({
			status: 404,
			error: 'The candidate you selected does not exist.'
		});
	}
	// Check if voter has already voted for this office
	const vote = await pool.query('SELECT * FROM votes WHERE office=$1 and voter=$2',
		[
			voteData.office,
			voteData.voterId
		]);
	if (vote.rows.length !== 0) {
		return res.status(409).json({
			status: 409,
			error: `You have already voted for this office on ${vote.rows[0].createdon}.`
		});
	}
	// Cast vote
	try {
		pool.query('INSERT INTO votes(createdon, voter, office, candidate) VALUES($1,$2,$3,$4)',
		[
			voteData.createdon,
			voteData.voterId,
			voteData.office,
			voteData.candidate
		]);
		return res.status(201).json({
			status: 201,
			data: {
				office: voteData.office,
				candidate: voteData.candidate,
				voter: voteData.voterId
			},
			message: "Vote submitted successfully!"
		});
	} catch (error) {
		return res.status(404).json({
			status: 404,
			error: error
		});
	}
};
