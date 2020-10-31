const jwt = require('jsonwebtoken');

module.exports = (credentials = []) => {
	return (req, res, next) => {
		//Allow for a string or array
		if (typeof credentials === 'string') credentials = [credentials];

		const token = req.headers.authorization;
		if (!token) return res.status(401).json({ message: 'Access Denied' });

		try {
			const verified = jwt.verify(
				token.split(' ')[1],
				process.env.TOKEN_SECRET
			);

			//If dont have credentials, next
			if (credentials.length > 0) {
				//If credentials include user role, next
				if (credentials.includes(verified.role)) {
					next();
				} else {
					res.status(403).json({ message: 'Forbidden' });
				}
			} else {
				next();
			}
		} catch (err) {
			res.status(400).json({ message: 'Invalid Token' });
		}
	};
};
