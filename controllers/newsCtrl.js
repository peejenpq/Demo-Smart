angular.module('starter')

  .controller('newsCtrl', function ($scope, $state, $http, $ionicLoading, $timeout) {

    $scope.btnBack = function () {
      $state.go('main');
    };

    // Setup the loader
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br> Loading'
    });

    // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
    $timeout(function () {
      $http.get('http://27.131.160.116:8080/wsAnanda/news.php')
        .then(function (response) {
          console.log(response.data.results);
          $scope.myData = response.data.results;
        }, function (error) {
          console.log(error);
        });
      $ionicLoading.hide();
    }, 1000);

    $scope.btnDetail = function (data) {
      console.log(data);
      console.log('btn Detail Pressed');
      $state.go('news_detail', {
        news_code: data.news_code,
        news_name: data.news_name,
        status: data.status,
        created_by: data.created_by,
        created_date: data.created_date,
        modified_by: data.modified_by,
        modified_date: data.modified_date
      });
    }
  });
