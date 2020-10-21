const mongoose = require('mongoose');
const SaveTemplateSchema = mongoose.Schema({
    masterTemplate: {
        type: String,
        required: true,
    },
    _id: {type: Number}
   
});

const saveTemplate = module.exports = mongoose.model('saveTemplate', SaveTemplateSchema)