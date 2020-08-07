const Mongoose = require(`mongoose`);

const userSchema = new Mongoose.Schema({
    banned: {
        type: Boolean,
        required: true        
    },
    stickyRoles: {
        type: Array,
        required: true
    }
});