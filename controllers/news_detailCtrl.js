angular.module('starter')
  .controller('news_detailCtrl',function ($scope,$state,$stateParams) {
    console.log('News_detail Start...');

    $scope.btnBack = function () {
      console.log('Back Pressed');
      $state.go('news');
    };

    $scope.txtNews_code = $stateParams.news_code;
    $scope.txtNews_name = $stateParams.news_name;
    $scope.txtStatus = $stateParams.status;
    $scope.txtCreated_by = $stateParams.created_by;
    $scope.txtCreated_date = $stateParams.created_date;
    $scope.txtModified_by = $stateParams.modified_by;
    $scope.txtModified_date = $stateParams.modified_date;
  });
