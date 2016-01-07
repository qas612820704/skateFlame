angular.module('myApp.filters', [])
.filter('breakLine', ['$sce', function() {
  return function(text) {
    // var breakTag = (is_xhtml) ? '<br />' : '<br>';
    var breakTag = '<br />';
    var text = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    return text;
  };
},
]);
