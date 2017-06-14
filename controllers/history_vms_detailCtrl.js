angular.module('starter')
  .controller('history_vms_detailCtrl',function ($scope,$state,$stateParams) {
    console.log('History_vms_detail Start...');
    console.log($stateParams);

    $scope.txtRoom = $stateParams.Room;
    $scope.txtStatus = $stateParams.Status;
    $scope.txtTime = $stateParams.Time;

    $scope.btnBack = function () {
      console.log('Back Pressed');
      $state.go('history_vms');

    }
  });
