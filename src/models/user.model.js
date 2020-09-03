const Mongoose = require(`mongoose`);

const userSchema = new Mongoose.Schema({
    banned: {
        type: Boolean,
        required: true        
    },
    xp: {
        type: Number,
        required: true
    },
});