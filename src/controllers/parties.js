import validator from '../middlewares/validation';
import moment from 'moment';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../database/connector';

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
	// Check if party is already registered
	const partyData = {
		name: req.body.name.trim(),
		hqaddress: req.body.hqaddress.trim(),
		logourl: req.body.logourl.trim(),
		registeredon: moment().format('LLLL')
	}
	const parties = await pool.query('SELECT * FROM parties WHERE name=$1', [partyData.name]);
	if (parties.rows.length !== 0) {
		return res.status(400).json({
			status: 400,
			error: `The party of name: <${partyData.name}> is already registered.`
		});
	}
	// Register party
	try {
		pool.query('INSERT INTO parties(name, hqaddress, logourl, registeredon) VALUES($1,$2,$3,$4)',
		[
			partyData.name,
			partyData.hqaddress,
			partyData.logourl,
			partyData.registeredon
		]);
		return res.status(201).json({
			status: 201,
			data: [
			  {
			  	name: partyData.name,
			  	hqaddress: partyData.hqaddress,
			  	logourl: partyData.logourl,
			  	registeredon: partyData.registeredon,
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

// view all Parties
exports.viewAllParties = async function (req, res) {
	try {
		// Fetch all parties by latest
		const parties = await pool.query('SELECT * FROM parties ORDER BY id DESC');
		return res.status(200).json({
			message: `${parties.rows.length}, parties found.`,
			status: 200,
			data: parties.rows
		});
	} catch (error) {
		return res.status(500).json({
			status: 500,
			error: 'Internal server error'
		});
	}
};

// view single Party
exports.viewSingleParty = async function (req, res) {
	try {
		const { id } = req.params;
		// Fetch all offices by latest
		const party = await pool.query('SELECT * FROM parties WHERE id=$1', [id]);
		if (party.rows.length !== 0) {
			return res.status(200).json({
				status: 200,
				data: party.rows
			});
		} else {
			return res.status(404).json({
				status: 404,
				error: `Party of id: ${id} not found`
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: 500,
			error: error
		});
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
	try {
		const { id } = req.params;
		// Check if party is already registered
		const partyData = {
			name: req.body.name.trim(),
			hqaddress: req.body.hqaddress.trim(),
			logourl: req.body.logourl.trim()
		}
		const party = await pool.query('SELECT * FROM parties WHERE id=$1', [id]);
		if (party.rows.length === 0) {
			return res.status(400).json({
				status: 400,
				error: `The party of id: <${id}> not found.`
			});
		}
		// Update party obj
		pool.query('UPDATE parties SET name=$1, hqaddress=$2, logourl=$3 where id=$4',
		[
			partyData.name,
			partyData.hqaddress,
			partyData.logourl,
			id
		]);
		return res.status(201).json({
			status: 201,
			data: [
			  {
			  	id: id,
			  	name: partyData.name,
			  	hqaddress: partyData.hqaddress,
			  	logourl: partyData.logourl,
			  	registeredon: party.rows[0].registeredon
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

// delete Party
exports.deleteParty = async function (req, res) {
	try {
		const { id } = req.params;
		// Check if party is already registered
		const party = await pool.query('SELECT * FROM parties WHERE id=$1', [id]);
		if (party.rows.length === 0) {
			return res.status(400).json({
				status: 400,
				error: `The party of id: <${id}> does not exist.`
			});
		}
		// Delete party obj
		pool.query('DELETE FROM parties where id=$1',[id]);
		return res.status(201).json({
			status: 201,
			message: `Party of id: <${id}> deleted successfully!.`
		});
	} catch (error) {
		return res.status(404).json({
			status: 404,
			error: error
		});
	}
};
