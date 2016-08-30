/**
shows all children
**/

var myApp = angular.module('myApp',[]);

myApp.controller('AppController', ['$scope', '$http', function($scope, $http) {
	$scope.name = '';
	$scope.children = [];

  $http({
    method: 'GET',
    url: '/api/children/cho' // hard coded <-----------
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
			$scope.children = []; // clear array
      console.log('angular get:', response.data);
      $scope.children.push(response.data);
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('Error getting children: ', response);
    });

  // method to increment current count
  $scope.increment = function(id) {
  	// send post request to server with _id
  	// then server will increment the count
  };


  // method to decrement count
}]);

/**

**/
