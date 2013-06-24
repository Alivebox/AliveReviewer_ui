angular.module('commentsService', ['ngResource']).
    factory('Comment', function($resource) {
      var Comment = $resource('/comments/:patchId/:commentId/:userId',
          {}, {
            update: { method: 'PUT' }
          }
      );
      
      Comment.mangleData = function(patchComments) {

          var parsedComments = [];

          for(var i = 0; i < patchComments.length; i++) {
              
              var comment = patchComments[i];
              
              if(!parsedComments[comment.line]) {
                  parsedComments[comment.line] = [];
              }
              
              parsedComments[comment.line].push(comment);              
          }
          
          return parsedComments;
      };
      
      Comment.prototype.destroy = function(cb) {
        return Comment.remove({commentId: this.id, userId: this.userId}, cb);
      };
       
      Comment.isEditable = function() {
          return this.editMode;
      }
      
      return Comment;      
    });
