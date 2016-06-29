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
    window.location.replace("#/app/comprar");
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

  $scope.setSelCat = function(cat){
    $scope.selectedCategory = cat;
    window.location.replace("#/app/products");
  }

  $scope.goToMap = function(endereco) {
    launchnavigator.navigate(endereco);
  }

  $scope.getMeses = function(){
      return ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  }

  $scope.getAnos = function(){
    var tmp = [];
    for (var i = 2016; i < 2035; i++) {
      tmp.push(i);
    }
    return tmp;
  }

  $scope.confirmarCompra = function(){
    //bagaça de botao de confirmar compra foi clicado
  }

})

.controller('ProductCtrl', function($scope, $ionicLoading, $ionicPopup, $state, $http) {
  $scope.products = [];

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Carregando...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  //$scope.show($ionicLoading);

  // var url = "http://10.61.37.93/produtos/" + $scope.selectedCategory.cod_categoria + "/" + $scope.selectedMarket.cod_unidade;

  // var alertPopup = $ionicPopup.alert({
  //   title: 'Atenção',
  //   template: $scope.selectedCategory.descricao
  // });

  // $http.get(url)
  //   .success(function(data){
  //     $scope.products = data;
  //   })
  //   .error(function(data){
  //     alert("Verifique sua conexão com a internet!");
  //   })
  //   .finally(function($ionicLoading) {
  //     // On both cases hide the loading
  //     $scope.hide($ionicLoading);
  //   });
})

.controller('CategoriesCtrl', function($scope, $ionicLoading, $ionicPopup, $state, $http) {
  $scope.categories = [];

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Carregando...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);

  $http.get("http://10.61.37.93/buscarCategorias")
    .success(function(data){
      $scope.categories = data;
    })
    .error(function(data){
      alert("Verifique sua conexão com a internet!");
    })
    .finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });

    $scope.setSelectedCategory = function(blabla){
      $scope.setSelCat(blabla);
    }
})

.controller('MarketCtrl', function($scope, $http, $ionicLoading, $ionicPopup) {
  $scope.markets = [];

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Carregando...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.show($ionicLoading);

  $http.get("http://10.61.37.93/supermercados")
    .success(function(data){
      $scope.markets = data;
    })
    .error(function(data){
      alert("Verifique sua conexão com a internet!");
    })
    .finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });

    $scope.$on('$ionicView.enter', function() {
      if($scope.selectedMarket){
        var alertPopup = $ionicPopup.alert({
          title: 'Atenção',
          template: 'Os produtos selecionados nesse mercado serão perdidos.'
        });
      }
    })
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
