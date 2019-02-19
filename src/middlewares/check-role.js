import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		// is user admin?
		if (req.userData.role !== 'admin') {
			return res.status(401).json({
				status: 401,
				error: 'Authorization failed. You must be an admin.'
			});
		}
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			status: 401,
			error: 'Authorization failed. ' + error.name + ': ' + error.message
		});
	}
}