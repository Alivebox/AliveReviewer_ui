angular.module('reviewersService', ['ngResource']).
    factory('Reviewer', function($resource) {
      var Reviewer = $resource('/reviewers/:patch/:reviewerId/:userId',
          { }, {
              update: {method: 'PUT'}
          }
      );

      Reviewer.prototype.destroy = function(cb) {
        return Reviewer.remove({ reviewerId: this.id, userId: this.userId }, cb);
      }

      return Reviewer;
    });
