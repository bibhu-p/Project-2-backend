const express = require('express');
const route = express.Router()

const VaccineController = require('../controller/vaccineSlot/controller')

route.post('/create',VaccineController.create);
route.get('/find/:id',VaccineController.find);
route.put('/book/:id',VaccineController.update);
route.get('/search/:userId',VaccineController.findUserSlot);
route.put('/status/:id',VaccineController.updateStatus);


module.exports = route
