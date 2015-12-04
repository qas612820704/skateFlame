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
  .otherwise({
    redirectTo: '/'
  });
  $('img#justfont-badge').css('display','none');
});

skateApp.directive('menubar', function($location) {
  var datas = {
    logo: {
      img: 'img/logo.png',
      href: '',
    },
    items: [
      {
        name: 'Home',
        href: '',
      },
      {
        name: 'Wanted',
        href: 'wanted',
      },
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

skateApp.controller('mainCtrl', function($scope) {
    $scope.helloWorld = "Hello World!";
});
