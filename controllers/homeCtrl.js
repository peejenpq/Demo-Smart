angular.module('starter')
  .controller('homeCtrl', function ($scope, $timeout, $http, $ionicLoading, $state) {
    console.log('Home start...');
    $scope.btnBack = function () {
      $state.go('main');
    };

    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br> Loading'
    });

    $http.get('http://27.131.160.116:8080/wsAnanda/home.php')
      .then(function (response) {
        console.log(response.data.results);
        $scope.myData = response.data.results;
      }, function (error) {
        console.log(error);
      });
    $ionicLoading.hide();
    $scope.btnEdit = function (data) {
      console.log(data);
      $state.go('edit', {
        address: data.address,
        birthdate: data.birthdate,
        comppany_address: data.company_address,
        company_email: data.company_email,
        company_fax: data.company_fax,
        company_name: data.company_name,
        company_position: data.company_position,
        company_tel: data.company_tel,
        email: data.email,
        fullname: data.fullname,
        gender: data.gender,
        phone: data.phone,
        registerdate: data.registerdate,
        user_login: data.user_login
      });
    };
  });
