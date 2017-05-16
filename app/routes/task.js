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
 * GET /todo/:id route to retrieve a task by id.
 */
function getTask(req, res) {
    Task.findById(req.params.id, (err, task) => {
        if (err) res.send(err);
        
        // in case of no errors, send it back
        res.json(task);
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

//export all route interfaces
module.exports = { 
  getTasks,
  getTask, 
  postTask 
};
