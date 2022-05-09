const express = require('express');
const route = express.Router()

const UsersController = require('../controller/admin/controller');

route.post('/register',UsersController.register);
route.post('/login',UsersController.login);
route.get('/find',UsersController.find);

module.exports = route
