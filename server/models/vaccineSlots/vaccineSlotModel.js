const mongoose = require('mongoose');

const vaccineSlotSchema = new mongoose.Schema({
    date : {
        type: String,
    },
    user:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        status:{
            type : Boolean,
            default: true
        }
    }]
});

const VaccineSlot = mongoose.model('vaccineSlots', vaccineSlotSchema);

module.exports = VaccineSlot