angular.module('patchService', ['ngResource']).
    factory('Patch', function($resource) {
      var Patch = $resource('/patches/:patchId/:userId',
          { }, {
            update: { method: 'PUT' }
          }
      );
          
      return Patch;
    });
