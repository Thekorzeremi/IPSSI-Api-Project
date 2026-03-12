const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: false
    },

    content: {
        type: String,
        required: false
    },

    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 10000
    },

    status: {
        type: String,
        enum: ['created', "removed", "drafted", 'published'],
        required: true
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

const Article = mongoose.model('Article', articleSchema);