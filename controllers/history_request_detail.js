angular.module('starter')

.controller('history_request_detailCtrl',function ($scope,$state,$stateParams) {
  console.log('history request detail start');

  $scope.btnBack = function () {
    $state.go('history_request')
  };

  $scope.txtRoom  = $stateParams.Room;
  $scope.txtTitle = $stateParams.Title;
  $scope.txtDescription = $stateParams.Description;
  $scope.txtStatus = $stateParams.Status;
  $scope.txtTime = $stateParams.Time;
  $scope.txtPhone = $stateParams.Phone;
});
