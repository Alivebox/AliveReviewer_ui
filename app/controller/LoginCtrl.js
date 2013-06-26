function LoginCtrl($scope, $location, $routeParams, $cookieStore, CurrentData,  Login) {
    
    $scope.data = CurrentData;
    
    if(isSessionOpened($scope, Login)) { 
      var path = $routeParams.patchId != undefined ? '/dashboard/' + $routeParams.patchId : '/dashboard';
      $location.path(path);        
    }
    
    $scope.login = function() {
        
        var loginData = $scope.data.user;
        loginData.rememberMe = loginData.rememberMe == true;

        
        Login.save(loginData, function(response) {
            if(response.result == false) {
                alert(response.message);
                return;
            }
            
            $scope.data.user = response.data;
            $cookieStore.put('user', angular.toJson(response.data));
            $location.path('/dashboard/' + $routeParams.patchId);        
        });
    }
    
    $scope.logout = function() {
        Login.sessionExpired();
        $scope.data.user = {};
        $location.path('/login');
    }
}

function isSessionOpened(scope, Login) {
    
    if(!scope.data.user.id) {
        
        var userData = Login.getOpenedSession();

        if(userData && userData.id) {
            scope.data.user = userData;
        }                
    } 
    

    return scope.data.user.id != null;
}

function sessionExpired(scope, Login) {
    Login.sessionExpired();
}