angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

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
  //--------------------------------------------------------------------------

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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

.controller('UserCtrl', function($scope, UserService, $ionicPopup, $state){
  $scope.user = {};

  $scope.login = function() {
    UserService.LoginUser($scope.user).success(function(data) {
      console.log("Deu Bom Login");
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
