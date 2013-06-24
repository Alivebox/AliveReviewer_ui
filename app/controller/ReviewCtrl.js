function ReviewCtrl($scope, CurrentData, Patch, Reviewer ) {

  $scope.data = CurrentData;

  // initialize  
  $scope.data.review.started = $scope.data.patch.status == 'started';
  
  $scope.startReview = function() {
      var review = {
          patchid: $scope.data.patch.id,
          status: 'started'
      };
      
      Patch.update(review, function(response) {
          if(response.result) {
              $scope.data.patch.status = 'started';
              $scope.data.review.started = true;
          }          
      });
  }


  $scope.finishReview = function() {
      
      var review = {
          patchid: $scope.data.patch.id,
          status: 'closed'
      };
      
      Patch.update(review, function(response) {
          if(response.result) {
                $scope.data.review.started = false;
                $scope.data.patch.status = 'closed';
          }
      });
  }

  $scope.approveReview = function() {
      
      var reviewStatus = {
          reviewerid: $scope.data.user.id,
          status: 'accepted'
      };
      
      Reviewer.update(reviewStatus, function(response) {
          if(response.result) {                
          }
      });
  }

  $scope.rejectReview = function() {
      
      var reviewStatus = {
          reviewerid: $scope.data.user.id,
          status: 'rejected'
      };
      
      Reviewer.update(reviewStatus, function(response) {
          if(response.result) {                
          }
      });
  }

}  
  