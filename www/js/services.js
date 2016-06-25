angular.module('starter.services', ['ngResource'])

.service('UserService', function($q) {
    return {
        RegisterUser: function(user) {
            // Implementar a fucking Requisicao aqui
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (user.name == 'user' && user.password == 'secret') {
                deferred.resolve('Welcome ' + user.name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },

        LoginUser: function(user) {
            // Implementar a fucking requisicao aqui
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (user.email == 'bla@bla.com' && user.password == 'secret') {
                deferred.resolve('Welcome ' + user.name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
          }
    };
});
