const Mongoose = require(`mongoose`);

const userSchema = new Mongoose.Schema({
    banned: {
        type: Boolean,
        required: true        
    },
    cooldowns: {
        xp: {
            type: Number,
            required: true
        }
    },
    discordID: {
        type: String,
        required: true
    },
    xp: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    stats: {
        messageCount: {
            type: Number,
            required: true
        }
    }
});

module.exports = Mongoose.model(`User`, userSchema);