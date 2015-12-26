var skateApp = angular.module("skateFlameApp",
  [
    'ngRoute',
    'ngDisqus',
    'ui.materialize',

    'facebook',
  ]);

skateApp.config(['$routeProvider','$locationProvider','$disqusProvider', 'FacebookProvider', function($routeProvider,$locationProvider, $disqusProvider, FbPvidr) {
  $routeProvider
  .when('/', {
    controller: 'mainCtrl',
    templateUrl: 'partial/main.html'
  })
  .when('/wanted', {
    controller: 'wantedCtrl',
    templateUrl: 'partial/wanted.html'
  })
  // .when('/ask', {
  //   controller: 'askCtrl',
  //   templateUrl: 'partial/ask.html'
  // })
  .when('/ask', {
    redirectTo: '/ask/1'
  })
  .when('/ask/:tab', {
    controller: 'askCtrl',
    templateUrl: 'partial/ask.html'
  })
  .when('/works', {
    controller: 'worksCtrl',
    templateUrl: 'partial/works.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $locationProvider.hashPrefix('!');
  $disqusProvider.setShortname('skateFlame');

  FbPvidr.init('631891993630750');

}]);

skateApp.run(['$rootScope', '$window', '$location', 
  function($rootScope, $window, $ln) {

  $('img#justfont-badge').css('display','none');



  $rootScope.goto = function(path) {
    $ln.path(path);
  }

}]);

skateApp.directive('menubar', ['$location', function($location) {
  var datas = {
    logo: {
      img: 'img/logo.png',
      href: '/',
    },
    items: [
      {
        name: '工人招募',
        href: '/wanted',
      },
      {
        name: '問與答',
        href: '/ask'
      },
      {
        name: '作品集',
        href: '/works'
      }
    ],
    isActive: function(item) {
      return $location.path().startsWith(item.href);
    },
  };
  window.datas = datas;
  return {
    templateUrl: 'partial/widgets/menu.html',
    link: function (scope, element, attr) {
      for (var data in datas) {
        scope[data] = datas[data];
      }
      // window.scope = scope;
      // window.element = element;
      // window.attr = attr;
    },
  };
}]);

skateApp.controller('mainCtrl', ['$scope', function($scope) {
  $scope.$on('$viewContentLoaded', function(){
    setTimeout(function() {
      $('#main-loader').fadeOut();
    }, 3000);
  });
}]);

skateApp.controller('wantedCtrl', ['$scope', function($scope) {
  var parser = new SpreadsheetSoup(
      '1w9vTUKWXdQoz5oaDBlhIVcCst8knaGzsAcKBhYSsZr0',
      '1',
      function(feed) {
        $scope.$apply(function() {
          $scope.feed = feed;
        });
        console.log(feed);
      },
      function(err) {
        console.log(err);
      });
}]);

skateApp.controller('askCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
  new SpreadsheetSoup(
    '1w9vTUKWXdQoz5oaDBlhIVcCst8knaGzsAcKBhYSsZr0',
    '2',
    function(feed) {
      /* Search specify feed */
      console.log(feed);
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
      $scope.$apply(function() {
        $scope.feed = feed;
        if (fed) {
          $scope.fed = fed;
        }
      });
    },
    function(err) {
      console.log(err);
    }
  );
  $scope.changePage = function(page) {
    console.log(page);
  }
  $scope.isActive = function(item) {
    var active = ( '/'+ item.id === $routeParams.tab);
    return active;
  }
  $scope.id = $routeParams.tab;
}]);

skateApp.controller('worksCtrl', ['$scope', '$sce', function($scope,$sce) {
  new SpreadsheetSoup(
    '1w9vTUKWXdQoz5oaDBlhIVcCst8knaGzsAcKBhYSsZr0',
    '3',
    function(feed) {
      console.log(feed);
      for (var i = 0; i < feed.length; i++) {
        feed[i].link = $sce.trustAsResourceUrl(feed[i].link);
      };
      $scope.$apply(function() {
        $scope.feed = feed;
      });
      console.log(feed);
    },
    function(err) {
      console.log(err);
    });
}]);
