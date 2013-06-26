function ReviewCtrl($scope, CurrentData, Patch, Reviewer ) {

  $scope.data = CurrentData;

  // initialize  
  $scope.data.review.started = $scope.data.patch.status == 'started';
  
  $scope.startReview = function() {
      var review = {
          userId: $scope.data.user.id,
          patchId: $scope.data.patch.id,
          status: Constants.patch.START_REVIEW
      };
      
      Patch.update(review, function(response) {
          if(response.result) {
              $scope.data.patch.status = Constants.patch.START_REVIEW;
              $scope.data.review.started = true;
          }          
      });
  }


  $scope.finishReview = function() {
      
      var review = {
          userId: $scope.data.user.id,
          patchId: $scope.data.patch.id,
          status: Constants.patch.FINISH_REVIEW
      };
      
      Patch.update(review, function(response) {
          if(response.result) {
                $scope.data.review.started = false;
                $scope.data.patch.status = Constants.patch.FINISH_REVIEW;
          }
      });
  }

  $scope.approveReview = function() {
      
      var reviewStatus = {
          userId: $scope.data.user.id,
          reviewerid: $scope.data.user.id,
          status: Constants.reviewer.REVIEW_STATUS_APPROVED
      };
      
      Reviewer.update(reviewStatus, function(response) {
          if(!response.result) {                
              alert(response.message);
              return;
          }
          
          
      });
  }

  $scope.rejectReview = function() {
      
      var reviewStatus = {
          userId: $scope.data.user.id,
          reviewerid: $scope.data.user.id,
          status: Constants.reviewer.REVIEW_STATUS_REJECTED
      };
      
      Reviewer.update(reviewStatus, function(response) {
          if(!response.result) {                
              alert(response.message);
              return;
          }
          
      });
  }

}  
  