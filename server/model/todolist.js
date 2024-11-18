const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_id:{type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('todolist', taskSchema);

module.exports = Task;