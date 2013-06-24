
function PatchCtrl($scope, $location, CurrentData, Patch, Comment, Reviewer, Login) {
 
  $scope.data = CurrentData;

console.log(isSessionOpened($scope, Login));
  if(!isSessionOpened($scope, Login)) {
      $location.path('/login');
  }
  
  var patchId = location.pathname.substr(1);
  var userId = $scope.data.user.id;
  
  
  if(patchId) {
    $scope.data.patch = Patch.get({patchId: patchId, userId: userId}, function(patch) {
        $scope.getComments(patch.id, $scope.data.user.id);
        $scope.getReviewers(patch.id, $scope.data.user.id);
    });
  }
  
  $scope.getReviewers = function(patchId, userId) {
      Reviewer.query({patch: patchId, userId: userId}, function(reviewers) {
          $scope.data.reviewers = reviewers;
      });
  }
  
  $scope.getComments = function(patchId, userID) {
      Comment.query({patchId: patchId, userId: userId}, function(rawPatchComments) {
            
      //patchComments = Comment.mangleData(rawPatchComments);  // this should be done by the service before returning
      
      var patchComments = rawPatchComments;
      for(var i = 0; i < patchComments.length; i++) {
          
        var comment = patchComments[i];
        
        if(!$scope.data.comments[comment.line]) {
            $scope.data.comments[comment.line] = [];
        }

        $scope.data.comments[comment.line].push(comment);                
      }
    });
  }

  $scope.showFileDetails = function(file) {
    $scope.data.currentFile = file;
  }
  
};
