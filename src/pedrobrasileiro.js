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

angular.module('pedrobrasileiro.directives').directive('ngConfirmClick', [
  function() {
    return {
      priority: 1,
      link: function(scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.ngClick;
        attr.ngClick = "";
        element.bind('click', function(event) {
          if (window.confirm(msg)) {
            scope.$eval(clickAction);
          }
        });
      }
    };
  }
]);

angular.module('pedrobrasileiro.directives').directive('ngEnter', [function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(){
          scope.$eval(attrs.ngEnter, {'event': event});
        });

        event.preventDefault();
      }
    });
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
