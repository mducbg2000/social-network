let mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require('bcryptjs')


const userSchema = new schema({
    // mail
    email: {type: String, unique: true, required: true, trim: true},
    // họ tên
    name: {type: String, required: true, trim: true},
    // password
    pwd: {type: String, required: true, trim: true},
    // ngày sinh
    birthDay: {type: Date},
    // avatar
    avatar: {type: String, default: 'http://placeimg.com/400/400/people'},
    // ảnh nền
    background: {type: String, default: 'http://placeimg.com/1000/400/tech'},
    // mssv
    mssv: {type: String, require: true},
    // giới tính
    gender: {type: String, enum: ['male', 'female']},
    // chuyên ngành
    major: {type: schema.Types.ObjectId, ref: "Major"},
    // viện
    school: {
        type: schema.Types.ObjectId,
        ref: "School",
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    groups: [{
        type: schema.Types.ObjectId,
        ref: 'Group'
    }],
    resetPwdId: {type: String},
    online: {type: Boolean},
    socketId: {type: String}
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre('save', function (next) {
    if (!this.isModified('pwd')) {
        return next();
    }
    this.pwd = bcrypt.hashSync(this.pwd, 4);
    next()
})

userSchema.methods.comparePwd = function (plainText) {
    return bcrypt.compareSync(plainText, this.pwd);
}

module.exports = mongoose.model("User", userSchema);

