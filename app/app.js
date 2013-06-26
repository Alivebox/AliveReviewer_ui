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
        when('/dashboard', {controller:PatchCtrl, templateUrl: '/app/templates/dashboard.html'}).
        when('/login', {controller:LoginCtrl, templateUrl:'/app/templates/login.html'}).
        when('/register', {controller:UserCtrl, templateUrl:'/app/templates/register.html'}).
        otherwise({redirectTo:'/dashboard'});        
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