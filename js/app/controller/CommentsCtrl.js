function CommentsCtrl($scope, $scope, CurrentData, Comment) {
        
    $scope.data = CurrentData;       
    $scope.currentComment = {}
    $scope.showHideComments = false;
    
    $scope.save = function(comment) {
        
        comment.nodeId = null;
        comment.userId = $scope.data.user.id;

        if(comment.id != null) {
            Comment.update(comment, function(comment) {});
        } else {
            
            Comment.save(comment, function(response) {
                
                if(!response.result) {
                    alert(result.message);
                    return;
                }
                
                dComment = response.data;
                if(!$scope.data.comments[dComment.line]) {
                    $scope.data.comments[dComment.line] = [];
                }

                $scope.data.comments[dComment.line].push(new Comment(dComment));
                _removeComment(comment);
            });
        }
    }

    /**
     * Removes a comment from the list
     */
    _removeComment = function(comment) {
        var lineComments = $scope.data.comments[comment.line];

        for(var i = 0; i < lineComments.length; i++) {
             if(comment.id == lineComments[i].id ) {
                lineComments.splice(i, 1);
             }
        }
    }
    
    $scope.destroy = function(comment) {
        comment.userId = $scope.data.user.id;
        
        if(comment.id != null) {            
            var dComment = new Comment(comment);
            dComment.destroy(function(response) {                
                if(response.result) {                
                    _removeComment(comment);
                } else {
                    alert('something went wrong');
                }
            });
        }
    }
      
    $scope.toggleComments = function() {
        $scope.showHideComments = !$scope.showHideComments;
    }  

    $scope.newComment = function(line) {

       if(!$scope.data.comments[line]) {
          $scope.data.comments[line] = []
       }

       // Added the new comment to the begining for easy access for the user
       var comment = new Comment({
           id: null,
           line : line,
           text: '< edit me >',
           authorId : $scope.data.user.id,
           nodeId: 'temp'
       });

       $scope.data.comments[line].splice(0, 0, comment);

       // track current comment
       $scope.currentComment = comment;
       $scope.editComment(comment);
    }

    $scope.editComment = function(comment, element) {
        $scope.showHideComments = true;
        $scope.currentComment = new Comment(comment);
    }

    $scope.cancelComment = function(comment) {

        var comments = $scope.data.comments[comment.line];
        for(var i = 0; i <  comments.length; i++) {
            if(comments[i].id == comment.id) {

                if(comment.id == null) {
                    comments.splice(i, 1);
                } else {
                    comments[i] = $scope.currentComment; // restore the original version of the comment
                }

                $scope.currentComment = null;
                break;
            }
        }
    }
    
    $scope.isEditable = function(comment) {
        return comment.authorId == $scope.data.user.id;
    }
    
    $scope.getAuthor = function(comment) {
       
      var currentUser = $scope.data.user;
      var reviewers   = $scope.data.reviewers;
      
      if(comment.authorId == currentUser.id) {
          return currentUser;
      }
      
      for( var i = 0; i < reviewers.length; i++) {
          if(reviewers[i].id == comment.authorId) {
              return reviewers[i];
          }
      }
      
      return {};
    };
}