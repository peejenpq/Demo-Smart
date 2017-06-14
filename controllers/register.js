angular.module('starter')

  .controller('register', function ($scope, $state, $http, $ionicPopup) {
    console.log('register start');
    $scope.form = {};
    $scope.resultAction = "";

    $scope.btnBack = function () {
      $state.go('login');
    };
    $scope.showAlert = function (msg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: msg
      });
    };

    $scope.register = function () {
      $http({
          url: 'http://27.131.160.116:8080/wsAnanda/register.php',
          method: 'POST',
          data: {
            'var_user': $scope.form.txt_user,
            'var_pass': $scope.form.txt_pass
          }
        }).then(function (response) {
          console.log(response);
          console.log(response.data.results);
          if (response.data.results == 'successfully') {
            $state.go('login');
          }
          else if (response.data.results == 'already') {
            $scope.showAlert('User have already');
          }
          else if (response.data.results == 'error') {
            $scope.showAlert('Cannot Access database. Please try again later.')
          }
        },function (error) {
          $scope.resultAction = "System error";
        });//http
    };

    $scope.btnCreate = function () {
      if ($scope.form.txt_user == null) {
        console.log("insert user");
        $scope.showAlert('Please add user');
      }
      else if ($scope.form.txt_user == "") {
        $scope.showAlert('Please add user');
      }
      else if ($scope.form.txt_pass == null) {
        console.log("insert pass");
        $scope.showAlert('Please add pass');
      }
      else if ($scope.form.txt_pass == "") {
        console.log("insert pass");
        $scope.showAlert('Please add pass');
      }
      else if ($scope.form.txt_pass != "") {
        if ($scope.form.txt_confirm == null) {
          console.log('please confirm');
          $scope.showAlert('Please confirm password');
        }
        else if ($scope.form.txt_confirm == "") {
          $scope.showAlert('Please confirm password');
        }
        else if ($scope.form.txt_pass == $scope.form.txt_confirm) {
          console.log("Macth");
          console.log($scope.form.txt_user);
          console.log($scope.form.txt_pass);
          $scope.register();
        }
        else if ($scope.form.txt_pass != $scope.form.txt_confirm) {
          console.log("not match");
          $scope.showAlert('Password not match!')
        }
      }
    }
  });
