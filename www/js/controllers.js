angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//--------------------------------------------------------------------------
//CARRINHO DE COMPRAS
// O carrinho vai ser alterado
// Agora o que vai tratar se tem igual é outra função específica
// Pra poder mostrar quantidade

  $scope.adicionarItemNoCarrinho = function(product){
    $scope.itensDoCarrinho.splice(0,0,product);
  }

  $scope.zerarCarrinho = function(){
    $scope.itensDoCarrinho = [];
  }

  $scope.removerItemDoCarrinho = function(product){
    $scope.itensDoCarrinho.splice($scope.itensDoCarrinho.indexOf(product), 1);
  }

  $scope.comprarItensDoCarrinho = function(){
    //sei la.. via pra pgina de compras... eu acho
    window.location.replace("#/app/comprar");
  }

  $scope.getItemsDoCarrinho = function(){
    return $scope.itensDoCarrinho;
  };

  $scope.itensDoCarrinho = [];

  $scope.totalPreco = function(){
    var tmp = 0.0;
    // var items = $scope.getItemsDoCarrinho();
    // for (var i = 0; i < items.length; i++) {
    //   tmp += items[i].preco_produto;
    // }

    return parseFloat("" + tmp.toFixed(2));
  };

//--------------------------------------------------------------------------

  $scope.setSelectedMarket = function(market){
    $scope.selectedMarket = market;
    window.location.replace("#/app/categoriaprod");
  }

  $scope.deselectMarket = function(){
    $scope.selectedMarket = null;
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

  // $scope.products = [{"nome":"bla", "preco":"10"}, {"nome":"bla2", "preco":"15"},
  // {"nome":"bla3", "preco":"20"}, {"nome":"bla4", "preco":"5"}];

  $scope.show($ionicLoading);

  var url = "http://10.61.37.93/produtos/" + $scope.selectedCategory.cod_categoria + "/" + $scope.selectedMarket.cod_unidade;

  $http.get(url)
    .success(function(data){
      $scope.products = data;
    })
    .error(function(data){
      alert("Verifique sua conexão com a internet!");
    })
    .finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });

  $scope.addToCart = function(product){
    $scope.adicionarItemNoCarrinho(product);
    var alertPopup = $ionicPopup.alert({
      title: 'Produto ' + product.nome + " adicionado no carrinho",
      template: '<center>' + product.nome + '</center>'
    });
  }
})

.controller('CategoriesCtrl', function($scope, $ionicLoading, $ionicPopup, $http) {
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
      var alertPopup = $ionicPopup.alert({
        title: 'Erro',
        template: '<center>Verifique sua conexão com a internet.</center>'
      });
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
      var alertPopup = $ionicPopup.alert({
        title: 'Erro',
        template: '<center>Verifique sua conexão com a internet.</center>'
      });
    })
    .finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });

    $scope.$on('$ionicView.enter', function() {
      if($scope.selectedMarket){
        var alertPopup = $ionicPopup.alert({
          title: 'Atenção',
          template: '<center>Os produtos selecionados nesse mercado foram perdidos.</center>'
        });

        $scope.zerarCarrinho();
        $scope.deselectMarket();
      }
    })
})

.controller('CartCtrl', function($scope, $ionicPopup){
  var products = $scope.getItemsDoCarrinho();

  for (i = 0; i < products.length; i++){
    products[i].qnt = 0;
  }
})

.controller('UserCtrl', function($scope, $ionicPopup, $http, $ionicLoading){
  $scope.user = {};

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Carregando...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  var transform = function(data){
      return $.param(data);
  }

  $scope.login = function() {
    $scope.show($ionicLoading);

    var params = {"email":$scope.user.email,"senha":$scope.user.password};

    var config = {
        headers : {
            'Content-Type': 'application/json;charset=utf-8;'
        }
    };

    $http.post('http://10.61.37.93/user/login', params, config)
    .success(function (data, status, headers, config) {
      if(data.success){
        var alertPopup = $ionicPopup.alert({
          title: 'Sucesso',
          template: '<center>Logado com sucesso.</center>'
        });

        window.location.replace("#/app/supermercados");
      }else{
        var alertPopup = $ionicPopup.alert({
          title: 'Erro',
          template: '<center>Verifique Suas credenciais.</center>'
        });
      }
    })
    .error(function (data, status, header, config) {
      var alertPopup = $ionicPopup.alert({
        title: 'Erro',
        template: '<center>Verifique sua conexão com a internet.</center>'
      });
    })
    .finally(function($ionicLoading) {
      // On both cases hide the loading
      $scope.hide($ionicLoading);
    });
  }

  $scope.register = function() {
    UserService.RegisterUser($scope.user).success(function(data) {
        console.log("Deu bom Cadastro");
    }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
            title: 'Cadastro falhou!',
            template: '<center>Verifique seus dados!</center>'
        });
    });
  }
});
