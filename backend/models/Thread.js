const threadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 10000
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Thread = mongoose.model('Thread', threadSchema);