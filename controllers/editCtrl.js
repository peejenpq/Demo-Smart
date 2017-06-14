angular.module('starter')
  .controller('editCtrl',function ($scope,$state,$ionicPopup) {
    console.log('Edit start...');
    $scope.btnBack = function () {
      $state.go('home');
    };

    $scope.btnOK = function() {
      console.log('Confirm Press.....');

      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm!'
      });

      confirmPopup.then(function (res) {
        if (res) {
          console.log('Ok');
          $state.go('home')
        } else {
          console.log('Cancel');
        }
      });
    }

  });
