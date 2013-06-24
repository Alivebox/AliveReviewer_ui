function CommentsCtrl($scope, $scope, CurrentData, Comment) {
        
    $scope.data = CurrentData;       
    $scope.currentComment = {}
    $scope.showHideComments = 'hide-comments';
    
    $scope.save = function(comment) {
        
        comment.nodeId = null;
        comment.userId = $scope.data.user.id;

        if(comment.id != null) {
            Comment.update(comment, function(comment) {});
        } else {
            
            Comment.save(comment, function(dComment) {
                
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
            comment.destroy(function(response) {
                if(response.result) {                
                    _removeComment(comment);
                } else {
                    alert('something went wrong');
                }
            });
        }
    }
      
    $scope.toggleComments = function() {
        $scope.showHideComments = $scope.showHideComments == 'hide-comments' ? 'show-comments' : 'hide-comments';
    }  

    $scope.areCommentsVisible = function() {
        return $scope.showHideComments == 'show-comments';
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
           author : 'cranespud@alivebox.com',
           nodeId: 'temp'
       });

       $scope.data.comments[line].splice(0, 0, comment);

       // track current comment
       $scope.currentComment = comment;
       $scope.editComment(comment);       
    }

    $scope.editComment = function(comment, element) {

        if(!$scope.areCommentsVisible()) {
            $scope.toggleComments();
        }

        comment.editMode = true;
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
                    comments[i].editMode = false;
                }

                $scope.currentComment = null;
                break;
            }
        }
    }
}