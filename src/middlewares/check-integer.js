module.exports = (req, res, next) => {
	try {
		// Check if param is integer
		const { id } = req.params;
		if (!Number.isInteger(parseInt(id, 10))) {
			return res.status(400).json({
				status: 400,
				error: `${id} must be an integer`
			});
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			status: 400,
			error: 'Error: ' + error.name + ': ' + error.message
		});
	}
}