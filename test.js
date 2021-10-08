const Major = require('./models/major');
const School = require('./models/school');
const User = require('./models/user');
const Group = require('./models/group');
const Post = require('./models/post');
const postService = require('./services/post.service');
const schoolService = require('./services/school.service');
const userService = require('./services/user.service');
const chatService = require('./services/chat.service')
const util = require('util');
const faker = require('faker')
const mongoose = require('mongoose');
const ejs = require('ejs')
const Room = require('./models/room')
require('dotenv').config();
require('./config/db');
try {

} catch (e) {
    console.log(e)
}



