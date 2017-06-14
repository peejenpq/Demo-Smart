// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

  .run(function ($ionicPlatform, $ionicPopup,$http,$state) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
            title: "Internet Disconnected",
            content: "The internet is disconnected on your device."
          })
            .then(function (result) {
              if (!result) {
                ionic.Platform.exitApp();
              }
            })
        }
      }//check connection

      //call system

      $http.get('http://27.131.160.116:8080/wsAnanda/callsystem.php')
        .then(function (response) {
          console.log(response.data.results);
          if (response.data.results == 'Wait') {
            $state.go('visitor');
          }
        }, function (error) {
          console.log(error);
        });
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      });

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'mainCtrl'
      });

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      });

    $stateProvider
      .state('edit', {
        url: '/edit:{address}/{birthdate}/{company_address}/{company_email}/{}/{}/{}/{}/{}/{}/{}/{}/{}/{}/{}/{}',
        templateUrl: 'templates/edit.html',
        controller: 'editCtrl'
      });

    $stateProvider
      .state('request', {
        url: '/request',
        templateUrl: 'templates/request.html',
        controller: 'requestCtrl'
      });

    $stateProvider
      .state('history_request', {
        url: '/history_request',
        templateUrl: 'templates/history_request.html',
        controller: 'history_requestCtrl'
      });

    $stateProvider
      .state('history_request_detail', {
        url: '/history_request_detail:{Room}/{Title}/{Description}/{Status}/{Time}/{Phone}',
        templateUrl: 'templates/history_request_detail.html',
        controller: 'history_request_detailCtrl'
      });

    $stateProvider
      .state('news', {
        url: '/news',
        templateUrl: 'templates/news.html',
        controller: 'newsCtrl'
      });

    $stateProvider
      .state('news_detail', {
        url: '/news_detail:{news_code},{news_name},{status},{created_by},{created_date},{modified_by},{modified_date}',
        templateUrl: 'templates/news_detail.html',
        controller: 'news_detailCtrl'
      });

    $stateProvider
      .state('visitor', {
        url: '/visitor',
        templateUrl: 'templates/visitor.html',
        controller: 'visitorCtrl'
      });

    $stateProvider
      .state('history_vms', {
        url: '/history_vms',
        templateUrl: 'templates/history_vms.html',
        controller: 'history_vmsCtrl'
      });

    $stateProvider
      .state('history_vms_detail', {
        url: '/history_vms_detail:{Room}/{Status}/{Time}',
        templateUrl: 'templates/history_vms_detail.html',
        controller: 'history_vms_detailCtrl'
      });

    $stateProvider
      .state('forgot_pass', {
        url: '/forgot_pass',
        templateUrl: 'templates/forgot_pass.html',
        controller: 'forgot_pass'
      });

    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'register'
      });

    $urlRouterProvider.otherwise('/login')
  });
