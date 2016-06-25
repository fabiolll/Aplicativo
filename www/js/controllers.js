angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//--------------------------------------------------------------------------
//CARRINHO DE COMPRAS
  var Item = function (nome, precoUn, qnt) {
    this.nome = nome;
    this.precoUn = precoUn;
    this.qnt = qnt;
  };

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

//--------------------------------------------------------------------------

  $scope.setSelectedMarket = function(market){
    $scope.selectedMarket = market;
    window.location.replace("#/app/categoriaprod");
  }

  $scope.displayMap = function(location) {
    launchnavigator.navigate(location);
  }

})

.controller('ProductCtrl', function($scope, ProductService, $ionicPopup, $state) {
  $scope.categories = function(){
    return ProductService.GetCategories();
  }

})

.controller('MarketCtrl', function($scope, MarketService) {
  $scope.markets = function(){
    return MarketService.GetMarkets();
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
