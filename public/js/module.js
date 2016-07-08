'use strict';

var app = angular.module('myApp', ['ui.router', 'satellizer', 'oitozero.ngSweetAlert']);

app.config(function($authProvider) {

  $authProvider.loginUrl = '/api/users/login';
  $authProvider.signupUrl = '/api/users/signup';

  $authProvider.facebook({
    clientId: '1738789493057908',
    url: '/api/users/facebook'
  });

});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'registerCtrl'
    })

    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      resolve: {
        Profile: function(User) {
          return User.profile();
        }
      }
    })
    // .state('users', {
    //   url: '/users',
    //   templateUrl: '/html/users.html',
    //   controller: 'usersCtrl',
    //   resolve: {
    //     Users: function(User) {
    //       return User.getAll();
    //     }
    //   }
    // })

  $urlRouterProvider.otherwise('/');
});
