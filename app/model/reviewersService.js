angular.module('reviewersService', ['ngResource']).
    factory('Reviewer', function($resource) {
      var Reviewer = $resource('/reviewers/:patch/:reviewerId',
          { }, {
              update: {method: 'PUT'}
          }
      );

      Reviewer.prototype.destroy = function(cb) {
        return Reviewer.remove({ reviewerId: this.id }, cb);
      }

      return Reviewer;
    });
