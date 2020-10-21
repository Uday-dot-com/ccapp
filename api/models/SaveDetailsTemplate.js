const mongoose = require('mongoose');
const post_schema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model('save_fillDetails', post_schema);