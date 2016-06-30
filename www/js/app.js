// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.carrinho', {
      url: '/carrinho',
      views: {
        'menuContent': {
          templateUrl: 'templates/carrinho.html',
          controller: 'CartCtrl'
        }
      }
    })

  .state('app.supermercados', {
      url: '/supermercados',
      views: {
        'menuContent': {
          templateUrl: 'templates/supermercados.html',
          controller: 'MarketCtrl'
        }
      }
    })

    .state('app.categoriaprod', {
      url: '/categoriaprod',
      views: {
        'menuContent': {
          templateUrl: 'templates/categoriaprod.html',
          controller: 'CategoriesCtrl'
        }
      }
    })

    .state('app.products', {
      url: '/products',
      views: {
        'menuContent': {
          templateUrl: 'templates/products.html',
          controller: 'ProductCtrl'
        }
      }
    })

    .state('app.comprar', {
      url: '/comprar',
      views: {
        'menuContent': {
          templateUrl: 'templates/comprar.html',
          controller: 'ProductCtrl'
        }
      }
    })

  .state('app.cadastro', {
        url: '/cadastro',
        views: {
          'menuContent': {
            templateUrl: 'templates/cadastro.html',
            controller:'UserCtrl'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller:'UserCtrl'
          }
        }
      })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }


  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/supermercados');
});
