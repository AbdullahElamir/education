var app = angular.module('education',[]);

app.controller('mainController',['$scope','$http','$log',function($scope, $http, $log) {
  $http.get('http://localhost:3000/department/getDepartments').success(function (result){
      $scope.departments = result;
    }).error(function (data, status){
      console.log(data);
    });
}]);
