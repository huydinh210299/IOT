const subscriberRouter = require('./subscribers');
const authRouter = require('./auth');

//Index of route middleware
const route = (app) => {
	//Route middleware subscribers
	app.use('/subscribers', subscriberRouter);

	//Route middleware auth
	app.use('/api/auth', authRouter);
};

module.exports = route;
