const mongoose = require('mongoose');

const vaccineSlotSchema = new mongoose.Schema({
    date : {
        type: String,
        required:true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
		ref: "users"
    }]
});

const VaccineSlot = mongoose.model('vaccineSlots', vaccineSlotSchema);

module.exports = VaccineSlot