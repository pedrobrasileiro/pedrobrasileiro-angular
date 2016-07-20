angular.module('pedrobrasileiro.directives', []);
angular.module('pedrobrasileiro.utils', []);

angular.module('pedrobrasileiro', [
  'pedrobrasileiro.directives',
  'pedrobrasileiro.utils'
]);


// Directives
angular.module('pedrobrasileiro.directives').directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      }, 150);
    }
  };
});

// Utils
angular.module('pedrobrasileiro.utils').factory('$localStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return $window.localStorage[key]?JSON.parse($window.localStorage[key]):null;
    }
  };
});
