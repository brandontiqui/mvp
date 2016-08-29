var myApp = angular.module('myApp',[]);

myApp.controller('AppController', ['$scope', '$http', function($scope, $http) {
	$scope.name = '';
	$scope.children = [];

  $http({
    method: 'GET',
    url: '/api/children'
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response.data);
      $scope.children = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log('Error getting children: ', response);
    });
}]);
