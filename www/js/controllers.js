angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.items = [
    {nome : "test1"},
    {nome : "test2"},
    {nome : "test3"}
  ];

  $scope.totalPreco = "PRECO TOTAL = 100";
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
