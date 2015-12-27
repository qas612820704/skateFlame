angular.module('myApp.services', [])
.factory('spSheet', ['$http', function($http) {
  var key = '1w9vTUKWXdQoz5oaDBlhIVcCst8knaGzsAcKBhYSsZr0';
  var spSheet = function(feed, callbackSucess, callbackError) {
    url = 'https://spreadsheets.google.com/feeds/list/'+ key +'/'+ feed +'/public/values?alt=json';
    $http.get(url).then(function(data) {
      var keyPrefix = 'gsx$';
      var info = '$t';
      var entry = data.data.feed.entry;
      var data = [];
      for (var i = 0; i < entry.length; i++) {
        data[i] = {};
        for (var key in entry[i]) {
          if (key.startsWith(keyPrefix)) {
            data[i][key.replace(keyPrefix, '')] = entry[i][key][info];
          }
        }
      }
      callbackSucess(data);
    }, callbackError);
  };
  return spSheet;
}])
