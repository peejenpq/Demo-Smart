angular.module('starter')
  .controller('visitorCtrl', function ($scope, $state, $cordovaToast, $http) {
    console.log('Visitor Start');

    $scope.btnBack = function () {
      $state.go('main');
    };

    $scope.btnAllow = function (message, duration, location) {
      console.log('btnAllow');
      $http(
        {
          url: 'http://27.131.160.116:8080/wsAnanda/updatevisitor.php',
          method: 'POST',
          data: {
            'var_status': 'Allow'
          }
        }//http
      ).then(function (response) {
        console.log(response);
        console.log(response.data.results);
        if (response.data.results != 'Allow') {
          console.log('!Allow');
          $state.go('main');
          $scope.resultAction = "Error";
        }
        else {
          $cordovaToast.show(message, duration, location).then(function (success) {
            console.log("The door is opening");
          }, function (error) {
            console.log("The toast was not shown due to " + error);
          });
        }
      }, function (error) {
        $scope.resultAction = "System Error";
      });
      // An alert dialog
      $scope.showAlert = function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Warning Message',
          template: msg
        });
      };
    };
    $scope.btnDenied = function (message, duration, location) {
      console.log('btnDenied');
      $http(
        {
          url: 'http://27.131.160.116:8080/wsAnanda/updatevisitor.php',
          method: 'POST',
          data: {
            'var_status': 'Denied'
          }
        }//http
      ).then(function (response) {
        console.log(response);
        console.log(response.data.results);
        if (response.data.results != 'Denied') {
          $state.go('main');
          $scope.resultAction = "Error";
        }
        else {
          $cordovaToast.show(message, duration, location).then(function (success) {
            console.log("Deinied");
          }, function (error) {
            console.log("The toast was not shown due to " + error);
          });
        }
      }, function (error) {
        $scope.resultAction = "System Error";
      });
    };
  });
