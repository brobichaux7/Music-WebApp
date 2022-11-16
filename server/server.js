const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const DB = 'music'

const myFirstSecret = process.env.FIRST_SECRET_KEY;
require('dotenv').config();

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

const payload = {
    id: user._id
};

const userToken = jwt.sign(payload, process.env.SECRET_KEY);

app.use(cookieParser());

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config')(DB)

res.cookie("mycookie", "mydata", { httpOnly: true }).json({
    message: "This response has a cookie"
  });

app.listen(8000, () => console.log("Listening at Port 8000"))