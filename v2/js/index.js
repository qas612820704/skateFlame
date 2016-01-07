var skateApp = angular.module("skateFlameApp",
  [
    'ngRoute',
    'ngSanitize',
    'ngDisqus',
    'ui.materialize',

    'facebook',

    'myApp.controllers',
    'myApp.directives',
    'myApp.services',
    'myApp.filters',
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
  .when('/workers', {
    controller: 'workersCtrl',
    templateUrl: 'partial/workers.html'
  })
  .when('/question', {
    controller: 'questionCtrl',
    templateUrl: 'partial/question.html'
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

  $rootScope.$on('$viewContentLoaded', function(){
    setTimeout(function() {
      $('#main-loader').fadeOut();
    }, 1000);
  });

}])
