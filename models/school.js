const mongoose = require('mongoose');
const schema = mongoose.Schema;

// model viện 
const schoolSchema = new schema({
    name: {type: String, require: true},
    // các chuyên ngành (IT2, IT-E15,...)
    majors: [{type: schema.Types.ObjectId, ref: 'Major'}],
    // nhóm của viện
    group: {type: schema.Types.ObjectId, ref: 'Group'},
    // sinh viên = user
    students: [{type: schema.Types.ObjectId, ref: 'User'}]
},{
    versionKey: false
})

module.exports = mongoose.model('School', schoolSchema)
