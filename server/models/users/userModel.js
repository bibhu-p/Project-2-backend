const mongoose = require('mongoose');

// User Model 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required:true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    password: {
        type: String,
        // required :true
    },
    address: String,
    age: Number,
    adhaar: {
        type: Number,
        unique: true,
        // required:true,
    },
    phone: {
        type: Number,
        // required: true,
        unique: true,
    },
    userType: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "{VALUE} is not supported",
        },
        default: "user",
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vaccineSlots"
    },
});

const User = mongoose.model('users', userSchema);

module.exports = User