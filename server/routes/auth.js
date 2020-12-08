const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

//Register
router.post('/register', async (req, res) => {
    //Validate schema before add a user
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    //Checking if the email is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).json({ message: 'Email already exists' });

    //Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
    });
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Login
router.post('/login', async (req, res) => {
    //Validate schema
    const { error } = loginValidation(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    //Checking if the email is not already in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Email is wrong' });

    //Check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).json({ message: 'Invalid password' });

    //Create and assign a token
    const token = jwt.sign(
        { email: user.email, role: user.role, name: user.name },
        process.env.TOKEN_SECRET
    );
    res.json({ accessToken: token });
});

router.post('/', auth('admin'), async (req, res) => {
    try {
        res.status(200).json({});
    } catch (error) {
        res.status(402);
    }
});

module.exports = router;
