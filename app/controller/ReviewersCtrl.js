function ReviewersCtrl($scope, CurrentData, Reviewer) {
    
    $scope.data = CurrentData;
    $scope.data.reviewers = [];
    
    $scope.addReviewer = function() {
                
        var reviewer = $scope.reviewer;
        
        if(!reviewer.email) {
            return; // no data
        }
        
        for(var i = 0; i < $scope.data.reviewers.length; i++) {
            if(reviewer.email == $scope.data.reviewers[i].email) { // already in the list                  
                return;
            }
        }       
        
        reviewer.id = null;
        reviewer.status = 'pending'
        reviewer.patch = $scope.data.patch.id;
        reviewer.userId = $scope.data.user.id;
        
        Reviewer.save($scope.reviewer, function(reviewer) {
            $scope.reviewer = new Reviewer();            
            $scope.data.reviewers.push(new Reviewer(reviewer));
        });
    }

    $scope.destroy = function(reviewer) {
        
        var revId = reviewer.id;
        
        reviewer.userId = $scope.data.user.id;
        reviewer.destroy(function(response) {
            
            if(response.result) {
                for(var i = 0; i < $scope.data.reviewers.length; i++) {            
                    if(reviewer == $scope.data.reviewers[i]) { // already in the list
                        $scope.data.reviewers.splice(i, 1);
                        break;
                    }
                }
            } else {
                alert('something went wrong');
            }            
        });        
    }
}