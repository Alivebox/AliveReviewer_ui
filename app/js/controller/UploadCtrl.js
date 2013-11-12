function UploadCtrl($scope, $location, CurrentData) {
    
    $scope.data = CurrentData;
    
    sendForm = function () {

      var oOutput = document.getElementById("output"),
      oData = new FormData(document.forms.namedItem("fileinfo"));

      var oReq = new XMLHttpRequest();
      oReq.open("POST", "patches", true);
      
      oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            var response = angular.fromJson(oReq.response);
            
            if(!response.result) {
                alert(response.message);
                return;
            }
            
            
            $scope.$apply(function() {
                $scope.data.patch = response.data;
                $location.path('/dashboard/' + $scope.data.patch.id);                
            });
        } else {
          oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
        }
      };

      oReq.send(oData);
    }    
}