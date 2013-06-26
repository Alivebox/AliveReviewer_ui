angular.module('commentsService', ['ngResource']).
    factory('Comment', function($resource) {
      var Comment = $resource('/comments/:patchId/:commentId/:userId',
          {}, {
            query: { method: 'GET', isArray: false},
            update: { method: 'PUT' }
          }
      );      
      
      Comment.prototype.destroy = function(cb) {
        return Comment.remove({commentId: this.id, userId: this.userId}, cb);
      };
       
      Comment.isEditable = function() {
          return this.editMode;
      }
      
      return Comment;      
    });
