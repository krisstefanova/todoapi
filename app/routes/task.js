let mongoose = require('mongoose');
let Task = require('../models/task');

/*
 * GET /tasks route to retrieve all the tasks
 */
function getTasks(req, res) {
  let query = Task.find({});
  
  query.exec((err, tasks) => {
    if (err) res.send(err);
    // if no errors, send them back to the user
    res.json(tasks);
  });
}

/*
 * POST /task to create a new task
 */
function postTask(req, res) {
  var newTask = new Task(req.body);
  // save it in the db
  newTask.save((err, task) => {
    if (err) {
      res.send(err);
    }
    else { 
      res.json({message: "Task successfully added!", task });
    }
  });
}

/*
 * GET /todo/:id route to retrieve a task by id
 */
function getTask(req, res) {
  Task.findById(req.params.id, (err, task) => {
    if (err) res.send(err);
    
    // in case of no errors, send it back
    res.json(task);
  });
}

/**
 * PUT /todo/:id route to upate a task by id
 */
function updateTask(req, res) {
  Task.findById({_id: req.params.id}, (err, task) => {
    debugger;
    if (err) {
      res.send(err);
    }
    else { 
      Object.assign(task, req.body).save((err, task) => {
        if(err) res.send(err);
        res.json({message: "Task successfully updated!", task });
      });
    }
  });
}

/**
 * DELETE /todo/:id route to delete a book by id
 */
function removeTask(req, res) {
  Task.remove({_id : req.params.id}, (err, result) => {
    res.json({ message: "Task successfully deleted!", result });
  });
}

//export all route interfaces
module.exports = { 
  getTasks,
  getTask, 
  postTask,
  updateTask,
  removeTask 
};
