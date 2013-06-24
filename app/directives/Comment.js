myApp.directive("comment", function($timeout) {
    return {
        restrict: "E",
        templateUrl: "/app/directives/templates/Comment.html",
        link: function(scope, element, attrs) {
            
            scope.$watch('show-comments', function(newValue, oldValue) {                
                
                if(document.getElementById('temp')) {
                    $timeout(function(){
                        document.getElementById('temp').scrollIntoView();                        
                    }, 90);
                }
            })
        }
    }
});