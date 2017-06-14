angular.module('starter')
  .controller('mainCtrl',function ($scope,$state) {
    console.log('Main start...');

    $scope.btnLogout = function () {
      $state.go('login');
      console.log('Logout Pressed')
    };

    $scope.btnHome = function () {
      $state.go('home');
      console.log('home pressed')
    };
    $scope.btnRequest = function () {
      $state.go('request');
      console.log('request pressed')
    };
    $scope.btnNews = function () {
      $state.go('news');
      console.log('news pressed')
    };
    $scope.btnVisitor = function (data) {
      $state.go('history_vms');
      console.log('history pressed')
    };
  });
