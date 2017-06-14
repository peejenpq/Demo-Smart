angular.module('starter')

  .controller('loginCtrl', function ($scope, $http, $state, $ionicPopup) {
    console.log('Login Start....');
    $scope.resultAction = "";
    $scope.form = {};

    $scope.btnLogin = function (data) {
      console.log($scope.form.txt_user);
      console.log($scope.form.txt_pass);
      console.log('Login Pressed');

      if ($scope.form.txt_user == '1') {
        $state.go('main');
      }

      $http(
        {
          url: 'http://27.131.160.116:8080/wsAnanda/login.php',
          method: 'POST',
          data: {
            'var_user': $scope.form.txt_user,
            'var_pass': $scope.form.txt_pass
          }
        }//http
      ).then(function (response) {
        console.log(response);
        console.log(response.data.results);
        if (response.data.results != 'not match') {
          $state.go('main');
        }
        else if (response.data.results == 'not match') {
          $scope.showAlert('Username or Password Incorrect!');
        }
        else if (response.data.results == 'Error') {
          console.log('Error Please contact Admin');
          $scope.showAlert('Please input user and password');
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
    };//btnLogin

    $scope.btnForgot = function () {
      $state.go('forgot_pass');
    };
    $scope.btnRegister = function () {
      $state.go('register');
    };
  });
