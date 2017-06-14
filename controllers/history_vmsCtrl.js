angular.module('starter')

  .controller('history_vmsCtrl',function ($scope,$state,$http,$stateParams,$timeout,$ionicLoading) {

    console.log($stateParams);
    console.log('history Start');
    $scope.btnBack = function () {
      $state.go('main');
    };

    //setup loading
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br> Loading'
    });

    // $scope.txtRoom = $stateParams.Room;
    // $scope.txtStatus = $stateParams.Status;
    // $scope.txtTime = $stateParams.Time;
    $scope.resultAction = "";
    $scope.form = {};

    $scope.currentImage = 0;
    // $scope.availableImages = [
    //   {
    //     src: "../img/ledOrange.png"
    //   },
    //   {
    //     src: "../img/ledGreen.png"
    //   },
    //   {
    //     src: "../img/ledRed.png"
    //   }
    // ];
    //
    // $scope.nextButton = function() {
    //   $scope.currentImage++;
    //   if ($scope.currentImage > ($scope.availableImages.length - 1)) {
    //     $scope.currentImage = 0;
    //   }
    // }
    // $scope.prevButton = function() {
    //   $scope.currentImage--;
    //   if ($scope.currentImage < 0) {
    //     $scope.currentImage = ($scope.availableImages.length - 1);
    //   }
    // }
    $http(
      {
        url:'http://27.131.160.116:8080/wsAnanda/history_vms.php',
        method:'POST',
        data:{
          'var_room':$scope.form.txt_room
        }
      }//http

    ).then(function (response) {
      console.log(response);
      console.log(response.data.results);

    },function (error) {
      $scope.resultAction = "System Error";
    });
    // An alert dialog
    $scope.showAlert = function(msg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Warning Message',
        template: msg
      });
    };

    $timeout(function () {
      $http.get('http://27.131.160.116:8080/wsAnanda/history_vms.php')
        .then(function(response,scope){
          console.log(response.data.results);
          $scope.myData = response.data.results;

          if(response.data.Status == 'Allow'){
            $scope.avilableImage = [{src: "../img/ledGreen.png"}];
            $scope.currentImage = ($scope.availableImages.length - 1);
          }
          else if(response.data.Status =='Denied'){
            $scope.avilableImage = [{src: "../img/ledRed.png"}];
            $scope.currentImage = ($scope.availableImages.length - 1);
          }
          else if(response.data.Status == 'Missed'){
            $scope.avilableImage = [{src: "../img/ledOrange.png"}];
            $scope.currentImage = ($scope.availableImages.length - 1);
          }

        }, function(error){
          console.log(error);
        });

      $ionicLoading.hide();
    },1000);


    $scope.btnDetail = function (data) {
      console.log(data);
      console.log('btn Detail Pressed');
      $state.go('history_vms_detail',{Room:data.Room,Status:data.Status,Time:data.Time});
    }
  });
