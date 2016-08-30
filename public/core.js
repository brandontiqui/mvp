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
		$scope.getChild($scope.form.name); // use name before clearing
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

	$scope.delete = function(id) {
		console.log('delete');
		var req = {
		  method: 'DELETE',
		  url: '/delete/' + id,
		};

		$http(req);

	};

	// need initial state
	// $scope.getChild('bo'); // <---------hard coded name // may be causing bug to show hide based on count

	

  // method to increment current count
  $scope.raiseCurrent = function(id) {
	  $http({
	    method: 'POST',
	    url: '/cur/inc/' + id 
	  }).then(function successCallback(response) {
	  		// get request for child
	  		console.log(response.data.name);
	  		$scope.getChild(response.data.name);
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
  			$scope.getChild(response.data.name); 
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
  			$scope.getChild(response.data.name); 
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
  			$scope.getChild(response.data.name);
  	  }, function errorCallback(response) {
  	    console.log('Error getting children: ', response);
  	  });
  };
  // method to decrement count
}]);

/**

**/
