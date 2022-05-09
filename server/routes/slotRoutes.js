const express = require('express');
const route = express.Router()

const VaccineController = require('../controller/vaccineSlot/controller')

route.post('/create',VaccineController.addSlots);
route.get('/find',VaccineController.find);

module.exports = route