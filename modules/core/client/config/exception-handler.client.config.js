'use strict';

angular.module('core').config(function ($provide) {
  $provide.decorator('$exceptionHandler', [
    '$delegate',
    function ($delegate) {
      return function (exception, cause) {
        exception.message = 'Please contact the Help Desk! \n Message: ' + exception.message;

        $delegate(exception, cause);
        alert(exception.message);
      };
    }
  ]);
});