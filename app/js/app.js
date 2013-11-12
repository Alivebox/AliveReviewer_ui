/*
require.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    paths: {
        app: '../app'        
    }
});

// Start the main app logic.
require([
    'angular-cookies.min', 
    'angular-resource.min', 
    'angular.min',
    'app/controller/LoginCtrl'
],
function(cookies, resource, angular, LoginCtrl) {
*/
    var myApp = angular.module('PatchViewer', [
        'patchService', 
        'commentsService', 
        'reviewersService',
        'userService',
        'loginService',
        'ngCookies'
    ]).
      config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:PatchCtrl, templateUrl: '/app/js/templates/dashboard.html'}).
            when('/dashboard', {controller:PatchCtrl, templateUrl: '/app/js/templates/dashboard.html'}).
            when('/dashboard/:patchId', {controller:PatchCtrl, templateUrl: '/app/js/templates/dashboard.html'}).
            when('/login', {controller:LoginCtrl, templateUrl:'/app/js/templates/login.html'}).
            when('/login/:patchId', {controller:LoginCtrl, templateUrl:'/app/js/templates/login.html'}).
            when('/register', {controller:UserCtrl, templateUrl:'/app/js/templates/register.html'}).
            when('/notfound', {templateUrl:'/app/js/templates/404.html'}).
            otherwise({redirectTo: '/notfound'});        
      });

      myApp.factory('CurrentData', function() {
         return {               
             patch: {},
             comments: [],
             user: {},
             review: {},
             session: {},
             reviewers: []
         } 
      });
      
      var Constants = {
          patch: {
              NEW_REVIEW: 0,
              START_REVIEW : 1,
              FINISH_REVIEW : 2           
          },

          reviewer: {
              REVIEW_STATUS_PENDING: 0,
              REVIEW_STATUS_APPROVED: 1,
              REVIEW_STATUS_REJECTED: 2
          }  
      }
//});