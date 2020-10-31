require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const route = require('./routes');
const cors = require('cors');

//Connect to mongodb database
mongoose.connect(process.env.DATABASE_URL || 'localhost:27017/iot', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Use middleware to parse body req to json
app.use(express.json());

//Use middleware to enable cors
app.use(cors());

//Route middleware
route(app);

//Start an express server
app.listen(process.env.PORT || 4000, () => console.log('Server Started'));
