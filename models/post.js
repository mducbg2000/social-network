const mongoose = require('mongoose');
const schema = mongoose.Schema;

// bài post
const postSchema = new schema({
    // người post
    owner: {type: schema.Types.ObjectId, ref: 'User', require: true},
    // nội dung
    content: {type: String, require: true},
    // ảnh
    img: {type: String},
    // trong nhóm?
    group: {type: schema.Types.ObjectId, ref: 'Group'},
    // reaction
    like: [{type: schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model('Post', postSchema)
