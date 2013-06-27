myApp.directive("comment", function($timeout) {
    return {
        restrict: "E",
        templateUrl: "/js/app/directives/templates/Comment.html",
        link: function(scope, element, attrs) {
            
            scope.editMode = scope.comment.id == null;
            
            scope.enterEditMode = function(comment) {
                scope.editMode = true;
            };
                    
            scope.exitEditMode = function(comment) {
                scope.editMode = false;
            }
        }
    }
});