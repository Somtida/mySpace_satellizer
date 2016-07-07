'use strict';

var app = angular.module('myApp');


app.service('User', function($http, $state, $q) {
  this.profile = () => {
    return $http.get('/api/users/profile')
      .then(res => {
        return $q.resolve(res.data);
      });
  };

  // this.getProfile = () => {
  //   return $http.get('/api/users/profile');
  // };
  //
  // this.readToken = () => {
  //   let token = $cookies.get(TOKENNAME);
  //
  //   if(typeof token === 'string') {
  //     let payload = JSON.parse(atob(token.split('.')[1]));
  //     $rootScope.currentUser = payload;
  //   }
  // };
  //
  // this.register = userObj => {
  //   return $http.post('/api/users/register', userObj);
  // };
  //
  // this.login = userObj => {
  //   return $http.post('/api/users/login', userObj)
  //     .then(res => {
  //       $rootScope.currentUser = res.data;
  //       return $q.resolve(res);
  //     });
  // };
  //
  // this.logout = () => {
  //   $cookies.remove(TOKENNAME);
  //   $rootScope.currentUser = null;
  //   $state.go('home');
  // };
  //
  // this.edit = (userId, newUserObj) => {
  //   return $http.put(`/api/users/${userId}`, newUserObj);
  // }

});

app.service('Message', function($http){
  this.get = () => {
    return $http.get('/api/messages')
  }
  this.postMessage = (msgObj) => {
    return $http.post('/api/messages', msgObj)
  }
})
