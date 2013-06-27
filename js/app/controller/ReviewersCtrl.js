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
        reviewer.status = Constants.reviewer.REVIEW_STATUS_PENDING;
        reviewer.patch = $scope.data.patch.id;
        reviewer.userId = $scope.data.user.id;
        
        Reviewer.save($scope.reviewer, function(response) {
            
            if(!response.result) {
                alert(response.message);
                return;
            }
            
            var reviewer = response.data;
            $scope.reviewer = new Reviewer();
            $scope.data.reviewers.push(new Reviewer(reviewer));
        });
    }

    $scope.destroy = function(reviewer) {
        
        
        var revId = reviewer.id;
        var dReviewer = new Reviewer(reviewer);
        
        dReviewer.userId = $scope.data.user.id;
        dReviewer.destroy(function(response) {
            
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