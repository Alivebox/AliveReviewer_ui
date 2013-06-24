function UploadCtrl($scope, CurrentData) {
    
    $scope.data = CurrentData;
    
    sendForm = function () {

      var oOutput = document.getElementById("output"),
      oData = new FormData(document.forms.namedItem("fileinfo"));

      var oReq = new XMLHttpRequest();
      oReq.open("POST", "patches", true);
      
      oReq.onload = function(oEvent) {
        if (oReq.status == 200) {
            var patch = angular.fromJson(oReq.response);
            $scope.data.patch = patch;
            location = '/' + patch.id;
        } else {
          oOutput.innerHTML = "Error " + oReq.status + " occurred uploading your file.<br \/>";
        }
      };

      oReq.send(oData);
    }    
}