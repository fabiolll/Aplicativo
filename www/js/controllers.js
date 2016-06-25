angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//--------------------------------------------------------------------------
//CARRINHO DE COMPRAS

  $scope.adicionarItemNoCarrinho = function(item){
    itensDoCarrinho.push(item);
  }

  $scope.removerItemDoCarrinho = function(index){
    itensDoCarrinho.splice(index, 1);
  }

  $scope.comprarItensDoCarrinho = function(){

  }

  $scope.itemsDoCarrinho = function(){
    return itensDoCarrinho;
  };
  var Item = function (nome, precoUn, qnt) {
    this.nome = nome;
    this.precoUn = precoUn;
    this.qnt = qnt;
  };

  var itensDoCarrinho = [new Item("bla", 2, 30), new Item("bla2", 5, 5)];

  $scope.totalPreco = function(){

      // adicionarItemNoCarrinho(new Item("teste2", 30, 1));
      // $scope.itemsDoCarrinho.push({nome:"teste3", precoUn: 30, qnt: 2})

    var tmp = 0.0;
    for (var i = 0; i < itensDoCarrinho.length; i++) {
      tmp += itensDoCarrinho[i].precoUn * itensDoCarrinho[i].qnt;
    }

    return parseFloat("" + tmp.toFixed(2));
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ProductCtrl', function($scope, ProductService, $ionicPopup, $state) {
  $scope.categories = function(){
    return ProductService.GetCategories();
  }

})

.controller('UserCtrl', function($scope, UserService, $ionicPopup, $state){
  $scope.user = {};

  $scope.login = function() {
    UserService.LoginUser($scope.user).success(function(data) {
      console.log("Deu Bom Login");
      console.log(data);
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login falhou!',
        template: 'Verifique suas credenciais!'
      });
    });
  }

  $scope.register = function() {
    UserService.RegisterUser($scope.user).success(function(data) {
        //$state.go('tab.dash');
        console.log("Deu bom Cadastro");
    }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Cadastro falhou!',
            template: 'Verifique seus dados!'
        });
    });
  }
});
