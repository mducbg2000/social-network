const mongoose = require('mongoose');
const schema = mongoose.Schema;


//comment
const commentSchema = new schema({
    post: {type: schema.Types.ObjectId, ref: 'Post', require: true},
    // người comment
    owner: {type: schema.Types.ObjectId, ref: 'User', require: true},
    // nội dung comment
    content: {type: String, require: true},
    // ảnh(nếu có)
    img: {type: String},
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Comment', commentSchema)
