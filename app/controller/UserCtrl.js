function UserCtrl($scope, $location, CurrentData, User) {
    
    $scope.data = CurrentData;
    
    $scope.register = function() {   
        
        var userData = $scope.data.newUser;
        userData.id = null;
        
        User.save(userData, function(data) {
           if(data.result == false) {
                alert(data.message);
                return;
           }
           
            $scope.data.session.loggedIn = true;
            $scope.data.user = data;
            $location.path('/dashboard');                      
        });
        
    }
}