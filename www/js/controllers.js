angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//--------------------------------------------------------------------------
//CARRINHO DE COMPRAS

  $scope.adicionarItemNoCarrinho = function(item){
    if (item instanceof Item){
        $scope.itensDoCarrinho.splice(0,0,item);
      }
  }

  $scope.removerItemDoCarrinho = function(item){
    $scope.itensDoCarrinho.splice($scope.itensDoCarrinho.indexOf(item), 1);
  }

  $scope.comprarItensDoCarrinho = function(){
    //sei la.. via pra pgina de compras... eu acho
  }
  
  $scope.getItemsDoCarrinho = function(){
    return $scope.itensDoCarrinho;
  };

  var Item = function (nome, precoUn, qnt) {
    this.nome = nome;
    this.precoUn = precoUn;
    this.qnt = qnt;
  };

  $scope.itensDoCarrinho = [new Item("bla", 2, 30), new Item("bla2", 5, 5)];

  $scope.totalPreco = function(){
    var tmp = 0.0;
    var items = $scope.getItemsDoCarrinho();
    for (var i = 0; i < items.length; i++) {
      if (items[i] instanceof Item){
        tmp += items[i].precoUn * items[i].qnt;
      }
    }

    return parseFloat("" + tmp.toFixed(2));
  };
})

//--------------------------------------------------------------------------

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


