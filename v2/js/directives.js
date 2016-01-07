angular.module('myApp.directives', [])


.directive('menubar', ['$location', function($location) {
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
        name: '工人介紹',
        href: '/workers'
      },
      {
        name: '討論串',
        href: '/ask'
      },
      {
        name: '作品集',
        href: '/works'
      },
      {
        name: '問與答',
        href: '/question'
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
