const subscriberRouter = require('./subscribers');
const authRouter = require('./auth');
const sensorRouter = require('./sensor');
//Index of route middleware
const route = (app) => {
	//Route middleware subscribers
	app.use('/subscribers', subscriberRouter);

	//Route middleware auth
	app.use('/api/auth', authRouter);

	//Route sensor
	app.use('/api/sensor', sensorRouter);
};

module.exports = route;
