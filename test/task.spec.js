process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Task = require('../app/models/task');

// dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Tasks', () => {
    beforeEach((done) => { //Before each test we empty the database
        Task.remove({}, (err) => {
           done();
        });
    });

  /*
  * Test the /GET method
  */
  describe('/GET tasks', () => {
      it('should GET all the tasks', (done) => {
        chai.request(server)
            .get('/tasks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  
  /*
  * Test the /GET/:id method
  */
  describe('/GET/:id task', () => {
      it('it should GET a task by id', (done) => {
        let task = new Task({ title: "Clean up the garden", description: "Some plants need to be cleaned from  dry leaves"});
        task.save((err, task) => {
            chai.request(server)
            .get('/task/' + task.id)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                res.body.should.have.property('_id').eql(task.id);
              done();
            });
          });
      });
  });

  /*
  * Test the /POST method
  */
  describe('/POST task', () => {
      it('it should POST a task ', (done) => {
           let task = {
               title: "Test title",
               description: "Test description"
           };
           
           chai.request(server)
               .post('/task')
               .send(task)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('message').eql('Task successfully added!');
                   res.body.task.should.have.property('title');
                   res.body.task.should.have.property('description');
                 done();
               });
      });
  });
});
