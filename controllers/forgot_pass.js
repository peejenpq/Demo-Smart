angular.module('starter')

  .controller('forgot_pass',function ($scope,$state) {

    $scope.btnBack = function () {
      $state.go('login');
    }
  });
