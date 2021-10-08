const mongoose = require('mongoose');
const schema = mongoose.Schema;

// nhóm
const groupSchema = new schema({
    // tên nhóm
    name: {type: String, require: true},
    // admin
    admin: {type: schema.Types.ObjectId, ref: 'User'},
    // thành viên
    members: [{type: schema.Types.ObjectId, ref: 'User'}],
    avatar: {type: String, default: 'http://placeimg.com/400/400/tech'},
    // loại nhóm
    groupType: {
        type: String,
        enum: ['major', 'school', 'normal'],
        default: 'normal'
    }
},{
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Group', groupSchema)
