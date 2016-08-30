/**
shows all children
**/


var myApp = angular.module('myApp',[]);

myApp.factory('myFactory', ['$http', function($http) {
	var getChild = function(name) { // this may not be name later<-----------
	  return $http({
	    method: 'GET',
	    url: '/api/children/' + name 
	  });
	};

	return {
		getChild: getChild
	}
}]);

myApp.controller('AppController', ['$scope', '$http', 'myFactory', function($scope, $http, myFactory) {
	$scope.name = '';
	$scope.children = [];
	$scope.count = $scope.children.length;
	$scope.form = {};

	$scope.addChild = function() {
		var req = {
		 method: 'POST',
		 url: '/add/' + $scope.form.name + '/' + $scope.form.reason + '/' + $scope.form.reward,
		 data: { test: 'test' }
		}
		$http(req);
		$scope.form = {}; // clear form
	};

	$scope.getChild = function(name) { 
		myFactory.getChild(name)
			.then(function success(response) {
				$scope.children = []; // clear
				$scope.children.push(response.data);
				$scope.count = $scope.children.length;
			});
	};

	$scope.resetCount = function() {
		console.log('reset');
		$scope.getChild('chlo');
	};
	$scope.getChild('cho'); // <---------hard coded name

  // method to increment current count
  $scope.raiseCurrent = function(id) {
	  $http({
	    method: 'POST',
	    url: '/cur/inc/' + id 
	  }).then(function successCallback(response) {
	  		// get request for child
	  		$scope.getChild('cho'); // <---------hard coded name
	    }, function errorCallback(response) {
	      console.log('Error getting children: ', response);
	    });
  };

  $scope.lowerCurrent = function(id) {
  	$http({
  	  method: 'POST',
  	  url: '/cur/dec/' + id 
  	}).then(function successCallback(response) {
  			// get request for child
  			$scope.getChild('cho'); // <---------hard coded name
  	  }, function errorCallback(response) {
  	    console.log('Error getting children: ', response);
  	  });
  };

  $scope.raiseGoal = function(id) {
  	$http({
  	  method: 'POST',
  	  url: '/goal/inc/' + id 
  	}).then(function successCallback(response) {
  			// get request for child
  			$scope.getChild('cho'); // <---------hard coded name
  	  }, function errorCallback(response) {
  	    console.log('Error getting children: ', response);
  	  });
  };

  $scope.lowerGoal = function(id) {
  	$http({
  	  method: 'POST',
  	  url: '/goal/dec/' + id 
  	}).then(function successCallback(response) {
  			// get request for child
  			$scope.getChild('cho'); // <---------hard coded name
  	  }, function errorCallback(response) {
  	    console.log('Error getting children: ', response);
  	  });
  };
  // method to decrement count
}]);

/**

**/
