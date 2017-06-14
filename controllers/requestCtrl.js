angular.module('starter')
  .controller('requestCtrl', function ($scope,$http, $state, $ionicPopup, $ionicActionSheet, $cordovaDevice, $cordovaFile, $cordovaFileTransfer, $cordovaCamera, $cordovaToast, $ionicPlatform, $cordovaImagePicker) {
    console.log('Request start...');
    $scope.btnBack = function () {
      $state.go('main');
    };
    $scope.btnHis = function () {
      $state.go('history_request')
    };

    $scope.resultAction = "";
    $scope.form = {};
    $scope.image = null;


    $scope.takePicture = function () {

      $ionicActionSheet.show({
        titleText: 'Add Picture',
        buttons: [
          {text: '<i class="icon ion-images"></i> Gallery'},
          {text: '<i class="icon ion-camera"></i> Camera'}
        ],
        cancelText: 'Cancel',
        cancel: function () {
          console.log('CANCELLED');
        },
        buttonClicked: function (index) {
          console.log('BUTTON CLICKED', index);
          if (index == '0') {
            console.log('Gallery');
            var options = {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              allowEdit: false,
              encodingType: Camera.EncodingType.JPEG,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
            }, function (err) {
              // error
            });
          }
          else if (index == '1') {
            console.log('Camera')
            var options = {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: false,
              encodingType: Camera.EncodingType.JPEG,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg;base64," + imageData;
            }, function (err) {
              // error
            });
          }
          return true;
        }
      });
    };
    $scope.btnSendForm = function () {
      console.log('btnUpload');

      var img = document.getElementById('myImage');
      var imageURI = img.src;

      var server = "http://27.131.160.116:8080/wsAnanda/uploads/upload.php";
      var trustHosts = true;
      var options = {
        fileKey: "myCameraImg",
        fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
        mimeType: "image/jpeg",
        chunkedMode: false
      };

      $cordovaFileTransfer.upload(server, imageURI, options)
        .then(function (result) {

          $cordovaDialogs.alert('Upload Status', 'Complete', 'OK')
            .then(function () {
              //img.src = '../img/camera_art.jpg'; img for uploaded
            });
          // Success!
        }, function (err) {
          // Error
        }, function (progress) {
          // constant progress updates
        });
      ///------Upload

      $http({
        url:'http://27.131.160.116:8080/wsAnanda/request.php',
        method:'POST',
        data:{
          'var_room':$scope.form.txt_room,
          'var_title':$scope.form.txt_title,
          'var_description':$scope.form.txt_description,
          'var_time':$scope.form.txt_time,
          'var_phone':$scope.form.txt_phone
        }
      }).then(function (response) {
        console.log(response);
        console.log(response.data.results);
        if(response.data.results == 'successfully'){
          $state.go('main');
        }
        else if(response.data.results == 'cannot upload img'){
          console.log('cannot upload img')
        }
        else if(response.data.results == 'cannot access database'){

        }
      },function (error) {
        $scope.resultAction = "System Error Please Contact Admin";
      })
    };//btnSendForm
  });
