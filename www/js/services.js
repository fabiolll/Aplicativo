angular.module('starter.services', ['ngResource'])

.service('ProductService', function($q) {
  return {
    GetCategories: function(){
      // Implementar a fucking requisicao aqui
      console.log("Chegou em GetCategories - ProductService");

      return ['product1', 'product2', 'product3', 'product4'];
    } // Fim do Get Categories. Colocar uma virgula aqui se quiser mais.

  };
})

// .service('MarketService', function($q, $scope) {
//   return {
//     GetMarkets: function(){
//       // Implementar a fucking requisicao aqui
//       console.log("Chegou em GetMarkets - MarketService");
//
//       $scope.markets = [{"cod_unidade":"11","nome_fantasia":"teste","endereco":"wqewqe","contato":"123","hora_abertura":"00:01:23","hora_fechamento":"00:02:13"},{"cod_unidade":"12","nome_fantasia":"teste","endereco":"Unidade 2",
//       "contato":"2324324","hora_abertura":"00:34:34","hora_fechamento":"00:34:34"},{"cod_unidade":"13","nome_fantasia":"teste","endereco":"unidade 3","contato":"0","hora_abertura":"00:00:00","hora_fechamento":"00:00:00"},{"cod_unidade":"19","nome_fantasia":"teste",
//       "endereco":"Unidade 1","contato":"1111111111","hora_abertura":"08:00:00","hora_fechamento":"20:20:00"},{"cod_unidade":"20","nome_fantasia":"Extra","endereco":"QS 3 R. 420, Lt. 4 ","contato":"6199999999","hora_abertura":"08:00:00","hora_fechamento":"20:00:00"}];
//     } // Fim do Get Categories. Colocar uma virgula aqui se quiser mais.
//
//   };
// })

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
                deferred.resolve('Welcome ' + user.email + '!');
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
