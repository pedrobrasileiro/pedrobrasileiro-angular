angular.module('pedrobrasileiro.directives', []);
angular.module('pedrobrasileiro.utils', []);

angular.module('pedrobrasileiro', [
  'pedrobrasileiro.directives',
  'pedrobrasileiro.utils'
]);


// Directives
angular.module('pedrobrasileiro.directives').directive('focusMe', ['$timeout', function(t) {
  return {
    link: function(scope, element, attrs) {
      t(function() {
        element[0].focus();
      }, 150);
    }
  };
}]);

// Utils
angular.module('pedrobrasileiro.utils').factory('$localStorage', ['$window', function(win) {
  return {
    set: function(key, value) {
      win.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return win.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      win.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return win.localStorage[key]?JSON.parse(win.localStorage[key]):null;
    }
  };
}]);
