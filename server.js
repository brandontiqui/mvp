var express = require('express');
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
// var child = new Child({ 
// 	name: 'cho',
//   goalReason: 'Get out of being grounded.',
//   reward: 'Can play outside.',
//   starsCurrent: 8,
//   starsGoal: 10
// }).save();


var app = express();
app.use('/', express.static(__dirname + '/public'));

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

// route to raise current stars
app.post('/cur/inc/:_id', function(req, res) {
	Child.findOne({ _id: req.params._id}, function (err, child) {
	  if (err) console.log(err);
	  if (child && child.starsCurrent < child.starsGoal) {
		  child.starsCurrent++;
		  child.save();
	  }
	  console.log('post request child id, child found: ', child);
	  res.send(child);
	});
});

// route to lower current stars
app.post('/cur/dec/:_id', function(req, res) {
	Child.findOne({ _id: req.params._id}, function (err, child) {
	  if (err) console.log(err);
	  if (child && child.starsCurrent > 0) {
		  child.starsCurrent--;
		  child.save();
	  }
	  console.log('post request child id, child found: ', child);
	  res.send(child);
	});
});

// route to raise goal stars
app.post('/goal/inc/:_id', function(req, res) {
	Child.findOne({ _id: req.params._id}, function (err, child) {
	  if (err) console.log(err);
	  if (child) {
		  child.starsGoal++;
		  child.save();
	  }
	  res.send(child);
	});
});

// route to lower goal stars
app.post('/goal/dec/:_id', function(req, res) {
	Child.findOne({ _id: req.params._id}, function (err, child) {
	  if (err) console.log(err);
	  if (child && child.starsGoal > 0 && child.starsGoal > child.starsCurrent) {
		  child.starsGoal--;
		  child.save();
	  }
	  res.send(child);
	});
});

// need to implement
app.post('/:name/:goalReason/:reward', function(req, res) {
	var child = new Child({ 
		name: req.params.name,
	  goalReason: req.params.goalReason,
	  reward: req.params.reward,
	  starsCurrent: 0,
	  starsGoal: 10
	}).save();
	res.send(req.params.name + ' ' + req.params.goalReason + ' ' + req.params.reward);
});

// todo: routes to delete child

var port = 3000;
app.listen(port);
console.log('Server started on port:', port);


module.exports = Child;