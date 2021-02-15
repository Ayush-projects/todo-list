const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
   listItem: {
       type: String,
       required: true
   }
   
})
const todoModel = mongoose.model('todos', todoSchema);
module.exports = todoModel;