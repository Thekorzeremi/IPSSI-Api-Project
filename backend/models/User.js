const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    updated_at: {
        type: Date,
        default: Date.now
    },

    roles: {
        type: Array,
        required: true
    },

    reputation: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);