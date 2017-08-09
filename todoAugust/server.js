// set up
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
require('dotenv').config()

// config
mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds043324.mlab.com:43324/todo_sandbox')

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended' : 'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({type : 'application/vnd.api+json'}))
app.use(methodOverride())

// defining todo model
var Todo = mongoose.model('Todo', {
  text : String
})

// server info
app.listen(8000)
console.log("listening on port 8000");

// routes

// get all
app.get('/api/todos', function(req, res){
  Todo.find(function(err, todos){
    if (err) {
      res.send(err)
    }
    res.json(todos)
  })
})

// create new todo and retrieve updated listen
app.post('/api/todos', function(req, res){
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo){
    if (err) {
      res.send(err)
    }
    Todo.find(function(err, todos){
      if (err) {
        res.send(err)
      }
      res.json(todos)
    })
  })
})

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res){
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo){
    if (err) {
      res.send(err)
    }
    Todo.find(function(err, todos){
      if(err){
        res.send(err)
      }
      res.json(todos)
    })
  })
})
