function LoginCtrl($scope, $location, $cookieStore, CurrentData,  Login) {
    
    $scope.data = CurrentData;
    
    if(isSessionOpened($scope, Login)) {
        $location.path('/dashboard');
    }
    
    $scope.login = function() {
        
        var loginData = $scope.data.user;
        loginData.rememberMe = loginData.rememberMe == true;

        
        Login.save(loginData, function(response) {
            if(response.result == false) {
                alert(response.message);
                return;
            }
            
            $scope.data.session.loggedIn = true;
            $scope.data.user = response.data;
            $cookieStore.put('user', angular.toJson(response.data));
            $location.path('/dashboard');           
        });
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