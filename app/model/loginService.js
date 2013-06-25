angular.module('loginService', ['ngResource']).
    factory('Login', function($resource, $cookieStore) {
      var Login = $resource('/login',
          { }, {
            update: { method: 'PUT' }
          }
      );
          
          
      Login.getOpenedSession = function() {
           var userData = $cookieStore.get('user');

            if(userData == undefined) {
                return null;
            }

            var userObj = angular.fromJson(userData);

            if(!userObj.id) {
                return null;
            }

            return userObj;
      }
      
      Login.sessionExpired= function() {
          $cookieStore.remove('user');
      }
      return Login;
    });