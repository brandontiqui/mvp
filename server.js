var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mvp');

var Schema = mongoose.Schema;

var childSchema = new Schema({
  name: String,
  goalReason: String,
  reward: String,
  starsCurrent: Number,
  starsGoal: Number
});

var Child = mongoose.model('Child', childSchema);

// initially store one child with reward info
// later refactor to separate table
var child = new Child({ 
	name: 'bo',
  goalReason: 'Get out of being grounded.',
  reward: 'Can play outside.',
  starsCurrent: 8,
  starsGoal: 10
}).save();

/**
define routes
**/
app.get('/', function(req, res) {
  res.send('hello world');
});

// get all children api endpoint
app.get('/api/children', function(req, res) {
	Child.find(function (err, children) {
	  if (err) console.log(err);
	  res.send(children);
	});
});

// get one child api endpoint
// need to get end of url
app.get('/api/children/:name', function(req, res) {
	console.log('get request child: ', req.params.name);
	Child.findOne({ name: req.params.name}, function (err, child) {
	  if (err) console.log(err);
	  console.log('get request child, child found: ', child);
	  res.send(child);
	});
});

// route to increase/decrease stars

// todo: routes to delete child

var port = 3000;
app.listen(port);
console.log('Server started on port:', port);