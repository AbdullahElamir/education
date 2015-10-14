var education = angular.module('education',[]);

education.controller('mainController',['$scope','$http','$log',function($scope, $http, $log) {
  $scope.init = function (){
    $http.get('/department/getDepartments')
    .success(function (result){
      $scope.departments = result;
    })
    .error(function (data, status){
      console.log(data);
    });
  };

  $scope.addDep = function(){
    $http.post('/department/newDepartment',{
      'name': $scope.name,
      'name_en': $scope.name_en
    });
    $scope.departments.push({ 'name':$scope.name, 'name_en': $scope.name_en });
    $scope.name='';
    $scope.name_en='';
    $scope.init();
  };

  $scope.editDep = function(department){
    $scope.id = department.id;
    $scope.name = department.name;
    $scope.name_en = department.name_en;
    // $log.info($scope.id, $scope.name, $scope.name_en);
  };

  $scope.updateDep = function(){
    $http.post('/department/updateDepartment',{
      'id': $scope.id,
      'name': $scope.name,
      'name_en': $scope.name_en
    });
    $scope.init();
  };

}]);
