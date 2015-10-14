var app = angular.module('education',['validation', 'validation.rule', 'ui-notification']);

app.config(function(NotificationProvider) {
  NotificationProvider.setOptions({
      delay: 1000000,
      right:10,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'center',
      positionY: 'top'
  });
});

app.controller('mainController',['$scope','$http','$log','Notification',function($scope, $http, $log, Notification) {
  // Notification function start
  $scope.primary = function() {
    Notification('Primary notification');
  };
  $scope.error = function() {
    Notification.error('Error notification');
  };
  $scope.success = function() {
    Notification.success('Success notification');
  };
  $scope.info = function() {
    Notification.info('Information notification');
  };
  $scope.warning = function() {
    Notification.warning('Warning notification');
  };

  $scope.primaryTitle = function() {
    Notification({message: 'Primary notification', title: 'Primary notification'});
  };

  $scope.successHtml = function() {
    Notification.success({message: 'Success notification<br>Some other <b>content</b><br><a href="https://github.com/alexcrack/angular-ui-notification">This is a link</a><br><img src="https://angularjs.org/img/AngularJS-small.png">', title: 'Html content'});
  };
  // Notification function end

  $scope.init = function(){
    $http.get('/department/getDepartments').success(function (result){
      $scope.departments = result;
    }).error(function (data, status){
      console.log(data);
    });
  };
  
  $scope.addDep = function(){
    $http.post('/department/newDepartment',{
      'name': $scope.name,
      'name_en': $scope.name_en
    }).success(function (result){
      $scope.departments = result;
      $scope.name='';
      $scope.name_en='';
    }).error(function (data, status){
      console.log(data);
    });
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
    }).success(function (result){
      $scope.departments = result;
      $scope.name='';
      $scope.name_en='';
    }).error(function (data, status){
      console.log(data);
    });
  };

}]);
