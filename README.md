Utils libs for AngularJS

- Install
bower install pedrobrasileiro-angular --save

OR

npm install pedrobrasileiro-angular --save

- insert in our app.js
angular.module('app_name', ['pedrobrasileiro']);


-Directives
___________
- FocusMe
autofocus in input when open view
Ex: <input type="text" focus-me />

- ngConfirmClick
emit confirm alert when click
Ex: <button ng-confirm-click="Are you sure?"></button>

- ngEnter
event when enter key
Ex: <input type="text" ng-enter="anAction()" />

Services
_________
- LocalStorage
use LocalStorage in our app

- Import in our project with $localStorage
