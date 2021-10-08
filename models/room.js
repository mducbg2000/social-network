const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const roomSchema = new schema({
    members: [{
        type: schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {type: String}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Room', roomSchema)
