angular.module('pedrobrasileiro.directives', []);
angular.module('pedrobrasileiro.filters', []);
angular.module('pedrobrasileiro.utils', []);

angular.module('pedrobrasileiro', [
  'pedrobrasileiro.directives',
  'pedrobrasileiro.filters',
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

// Filters
angular.module('pedrobrasileiro.filters').filter('pad', function(){
  return function(input, len, pad) {
    input = input.toString();
    if(input.length >= len) return input;
    else{
      pad = (pad || 0).toString();
      return new Array(1 + len - input.length).join(pad) + input;
    }
  };
});

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

angular.module('pedrobrasileiro.utils').factory('Util', [function() {
  function _validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
            return false;
    // Valida 1o digito
    var add = 0;

    for (i=0; i < 9; i ++) add += parseInt(cpf.charAt(i)) * (10 - i);
    var rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i ++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }

  function _validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj === '') return false;
    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0,tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  function _validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return {
    validate : {
      CPF: _validateCPF,
      CNPJ: _validateCNPJ,
      email: _validateEmail
    }
  };
}]);
