const UserController = require('../controllers/users.controller');
const { authenticate } = require('../config/jwt.config');
const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

module.exports = app => {
    app.post('/api/register', UserController.createNewUser);
    app.post('/api/login', UserController.login);
    app.get("/api/users/checkUser", UserController.getLoggedInUser);
    app.get('/api/logout', UserController.logout);
    app.get('/api/users/:id', UserController.findOneUser);
    app.put('/api/users/update/:id', UserController.updateUser);
    app.get('/api/users', UserController.findAllUsers);
    // app.Router().route('/api/users/image/:id').patch(upload.single('image'), UserController.updateProfile);
}

router.route('/api/users/image/:id').put(upload.single('image'), UserController.updateProfile);

