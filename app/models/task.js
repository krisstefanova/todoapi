let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// task schema definition
let TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }
  }
);


// exporting the created TaskSchema for further use
module.exports = mongoose.model('task', TaskSchema);
