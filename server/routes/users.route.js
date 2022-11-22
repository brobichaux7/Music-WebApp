const UserController = require('../controllers/users.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/register', UserController.createNewUser);
    app.post('/api/login', UserController.login);
    app.get("/api/users/checkUser", UserController.getLoggedInUser);
    app.get('/api/logout', UserController.logout);
    app.get('/api/users/:id', UserController.findOneUser);
    app.put('/api/users/update/:id', UserController.updateUser);
    app.get('/api/users', UserController.findAllUsers);
}