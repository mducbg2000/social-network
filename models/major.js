const mongoose = require('mongoose');
const schema = mongoose.Schema;


// model chuyên ngành (IT2, IT-E15,...)
const majorSchema = new schema({
    // tên
    name: {type: String, require: true},
    // mã ngành
    code: {type: String, require: true},
    // viện
    school: {type: schema.Types.ObjectId, ref: 'School'},
    // nhóm của ngành
    group: {type: schema.Types.ObjectId, ref: 'Group'},
    // danh sách sinh viên
    students: [{type: schema.Types.ObjectId, ref: 'User'}],
},{
    versionKey: false
})

module.exports = mongoose.model('Major', majorSchema);
