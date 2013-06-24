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
         session: {}
     } 
  });