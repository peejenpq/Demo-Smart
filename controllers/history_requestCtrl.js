angular.module('starter')
  .controller('history_requestCtrl', function ($scope,$state,$stateParams,$http,$ionicLoading,$timeout) {
    console.log('history_request Start..');
    console.log($stateParams);

    $scope.btnBack= function () {
      $state.go('request')
    };

    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br> Loading'
    });

    $timeout(function () {
      $http.get('http://27.131.160.116:8080/wsAnanda/history_request.php')
        .then(function(response){
          console.log(response.data.results);
          $scope.myData = response.data.results;
        }, function(error){
          console.log(error);
        });
      $ionicLoading.hide();
    },1000);


    $scope.btnDetail = function (data) {
      console.log(data);
      console.log('btn Detail Pressed');
      $state.go('history_request_detail',{Room:data.Room,Title:data.Title,Description:data.Description,Status:data.Status,Time:data.Time,Phone:data.Phone});
    }
  });
