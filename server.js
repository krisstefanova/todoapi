let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config/default');
let task = require('./app/routes/task');

let port = process.env.PORT || 8080;

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

//db options
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

//db connection
mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.get("/", (req, res) => res.json({message: "Welcome to our ToDo app!"}));

app.route("/tasks")
    .get(task.getTasks);
app.route("/task/:id")
    .get(task.getTask);
app.route("/task")
    .post(task.postTask);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
