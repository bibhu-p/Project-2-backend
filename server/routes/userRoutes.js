const express = require('express');
const route = express.Router()

const UsersController = require('../controller/user/controller');

route.post('/register',UsersController.register);
route.post('/login',UsersController.login);
route.get('/find',UsersController.find);
route.get('/:id',UsersController.findById);
route.put('/update/:id',UsersController.update);

module.exports = route
