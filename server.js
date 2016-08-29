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

var child = new Child({ 
	name: 'Chloe',
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

var port = 3000;
app.listen(port);
console.log('Server started on port:', port);