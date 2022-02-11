const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//create Schema
const PostSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post',PostSchema);

module.exports = Post

