const UserController = require('../controllers/users.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/login', UserController.login);
    app.get('/api/logout', UserController.logout);
    app.post('/api/register', UserController.createNewUser);
    app.get('/api/users/:id', UserController.findOneUser);
    app.get("/api/users", authenticate, UserController.findAllUsers);
}