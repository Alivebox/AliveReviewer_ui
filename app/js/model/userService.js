angular.module('userService', ['ngResource']).
    factory('User', function($resource) {
      var User = $resource('/user',
          { }, {
            update: { method: 'PUT' }
          }
      );
          
      return User;
    });
