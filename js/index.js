var skateApp = angular.module("skateFlameApp",
  [
    'ngRoute',
    'ui.materialize',
  ]);

skateApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'mainCtrl',
    templateUrl: 'partial/main.html'
  })
  .when('/wanted', {
    controller: 'wantedCtrl',
    templateUrl: 'partial/wanted.html'
  })
  .when('/ask', {
    controller: 'askCtrl',
    templateUrl: 'partial/ask.html'
  })
  .otherwise({
    redirectTo: '/'
  });
  $('img#justfont-badge').css('display','none');
});

skateApp.run(['$rootScope', '$window',
  function($rootScope, $window) {

  $window.fbAsyncInit = function() {
    // Executed when the SDK is loaded

    FB.init({ 
      appId      : '631891993630750',
      xfbml      :  true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
}]);

skateApp.factory('facebookService', function($q) {
  return {
    getMyLastName: function() {
      var deferred = $q.defer();
      FB.api('/me', {
        fields: 'last_name'
      }, function(response) {
        if (!response || response.error) {
          deferred.reject('Error occured');
        } else {
          deferred.resolve(response);
        }
      });
      return deferred.promise;
    }
  }
});

skateApp.directive('menubar', function($location) {
  var datas = {
    logo: {
      img: 'img/logo.png',
      href: '#/',
    },
    items: [
      {
        name: '工人招募',
        href: 'wanted',
      },
      {
        name: '問與答',
        href: 'ask'
      }
    ],
    isActive: function(item) {
      var active = ( '/'+ item.href === $location.path());
      return active;
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
});

skateApp.directive('fbpage', [ 
  '$window', function($window) {
    return {
      restrict: 'E',
      templateUrl: 'partial/directive/fbPage.html',
      link: function(scope, element, attr) {
        if (!$window.FB) {
          $.getScript('//connect.facebook.net/en_US/sdk.js',function() {
            $window.FB.init({
              appId      : '631891993630750',
              xfbml      : true,
              version    : 'v2.5'
            });
            renderPage();
          });
        }
        else {
          renderPage();
        }

        // var watchAdded = false;
        function renderPage() {
          // if (!watchAdded) {
          //   watchAdded = true;
          //   var unbindWatch = scope.$watch('fbPage', function(newValue, oldValue) {
          //     if (newValue) {
          //       renderPage();
          //     }
          //     unbindWatch();
          //   });
          //   return;
          // }
          // else {
          //   $window.FB.XFBML.parse(element.parent()[0]);
          // }
          $window.FB.XFBML.parse(element.parent()[0]);
        }
      },
    };
  }
]);

skateApp.controller('mainCtrl', function($scope) {

});

skateApp.controller('wantedCtrl', function($scope) {
  var parser = new SpreadsheetSoup('1w9vTUKWXdQoz5oaDBlhIVcCst8knaGzsAcKBhYSsZr0', function(feed) {
    $scope.$apply(function() {
      $scope.feed = feed;
    });
    console.log(feed);
  });
});

skateApp.controller('askCtrl', function($scope) {

});