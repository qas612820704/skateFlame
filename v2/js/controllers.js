angular.module('myApp.controllers', [])

.controller('mainCtrl', ['$scope', function($scope) {

}])

.controller('wantedCtrl', ['$scope', 'spSheet', function($scope,spSheet) {
  spSheet('1',function(feed) {
    $scope.feed = feed;
  }, err);
}])

.controller('askCtrl', ['$scope', '$routeParams', 'spSheet', function($scope, $routeParams, spSheet) {
  spSheet('2',function(feed) {
    /* Search specify feed */
    for (var i = 0; i < feed.length; i++) {
      result = [];
      if( feed[i].id == $routeParams.tab) {
        fed = feed[i];
      }
      /* Set img to array*/
      for (var key in feed[i]) {
        if (key.startsWith('img')) {
          result.push(feed[i][key]);
          delete feed[i][key];
        }
      }
      if (result) {
        feed[i]['img'] = result;
      }
      /* end set img to array*/
    }
    $scope.feed = feed;
    if (fed) {
      $scope.fed = fed;
    }
  }, err);
  $scope.changePage = function(page) {
    console.log(page);
  }
  $scope.isActive = function(item) {
    var active = ( '/'+ item.id === $routeParams.tab);
    return active;
  }
  $scope.id = $routeParams.tab;
}])

.controller('worksCtrl', ['$scope', '$sce', 'spSheet',function($scope,$sce, spSheet) {
  spSheet('3',function(feed) {
    for (var i = 0; i < feed.length; i++) {
      feed[i].link = $sce.trustAsResourceUrl(feed[i].link);
    };
    $scope.feed = feed;
  }, err);
}])

.controller('workersCtrl', ['$scope', 'spSheet', function($sp,spSheet) {
  spSheet('4',function(feed) {
    $sp.feed = feed;
  },err);
}])

.controller('questionCtrl', ['$scope', 'spSheet', function($sp,spSheet) {
  spSheet('5',function(feed) {
    $sp.feed = feed;
  },err);
}])

function err(err) {
  console.err('err',err);
}
