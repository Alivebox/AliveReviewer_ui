function PatchCtrl($scope, $location, $routeParams, CurrentData, Patch, Comment, Reviewer, Login) {
 
  $scope.data = CurrentData;
    
  if(!isSessionOpened($scope, Login)) {
      var path = $routeParams.patchId != undefined ? '/login/' + $routeParams.patchId : '/login';
      $location.path(path);      
      return;
  }
  
  var patchId = $routeParams.patchId;
  var userId = $scope.data.user.id;
  
  if(patchId && patchId != undefined) {
    $scope.data.patch = Patch.get({patchId: patchId, userId: userId}, function(response) {
        
        if(response.result == false) {
            sessionExpired($scope, Login);
            var path = $routeParams.patchId != undefined ? '/login/' + $routeParams.patchId : '/login';
            $location.path(path);
            return;
        }
        
        var patch = response.data;
        $scope.data.patch = patch;
        $scope.getComments(patch.id, $scope.data.user.id);
        $scope.getReviewers(patch.id, $scope.data.user.id);
        $scope.data.user.isOwner = true;
    });
  }
  
  $scope.getReviewers = function(patchId, userId) {      
        Reviewer.query({patch: patchId, userId: userId}, function(response) {          
          
          if(response.result == false) {
              alert(response.message);
              return;
          }
                              
          $scope.data.reviewers = response.data == undefined ? [] : response.data;
      });
  }
  
  $scope.getComments = function(patchId, userID) {
      Comment.query({patchId: patchId, userId: userId}, function(response) {

      if(response.result == false) {
          alert(response.message);
          return;
      }
      
      var patchComments = response.data;
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
