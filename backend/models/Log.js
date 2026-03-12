const logSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },

    message: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: false
    }
});

const Log = mongoose.model('Log', logSchema);