const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        match: /@/
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
        default: 0,
        min: 0,
        max: 100000
    }
});

const User = mongoose.model('User', userSchema);