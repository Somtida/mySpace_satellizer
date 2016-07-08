'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth) {
  console.log('mainCtrl!');

  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    $auth.logout()
      $state.go('home');
  };

  $scope.authenticate = (provider) => {
    $auth.authenticate(provider)
      .then(res => {
        $state.go('profile');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };

});



app.controller('profileCtrl', function(Profile, $scope, $state, Message, User, $auth) {
  console.log('profileCtrl!');

  $scope.user = Profile;
  console.log('Profile:', Profile);

  $scope.editProfileArea = false;
  $scope.profileArea = true;
  $scope.messages = [];

  Message.get()
    .then(res => {
      console.log("res.data: ",res.data);
      $scope.messages = res.data;
    })
    .catch(err => {
      console.log("err: ",err);
    })


  $scope.saveEditProfile = () => {
    console.log("$scope.myInfo: ", $scope.myInfo);
    User.edit($scope.myInfo._id, $scope.myInfo)
      .then(res => {
        console.log("res: ",res);
        $scope.editProfileArea = false;
        $scope.profileArea = true;
      })
      .catch(err => {
        console.log("err: ",err);
      })
  }

  $scope.editProfile = () => {
    $scope.editProfileArea = true;
    $scope.profileArea = false;
    $scope.myInfo = angular.copy($scope.user);
  }

  $scope.cancelEditArea = () => {
    $scope.editProfileArea = false;
    $scope.profileArea = true;
  }

  $scope.postMessage = () => {
    let userId = $scope.user._id;
    let userName = $scope.user.displayName;
    let userImage = $scope.user.profileImage;
    // console.log("userId: ",userId);
    $scope.msg.userId = userId;
    $scope.msg.userName = userName;
    $scope.msg.userImage = userImage;
    console.log("$scope.msg: ", $scope.msg);
    Message.postMessage($scope.msg)
      .then(res => {
        console.log("res.data: ",res.data);
        console.log("posted");
        $scope.msg = null;
        $state.go($state.current, {}, {reload: true});
      })
      .catch(err => {
        console.log("err: ",err);
      })
  }

})



app.controller('loginCtrl', function($scope, $state, $auth) {
  console.log('loginCtrl!');

  $scope.login = () => {
    $auth.login($scope.user)
      .then(res => {
        console.log("res: ",res);
        $state.go('profile');
      })
      .catch(err => {
        console.log('err:', err);
        swal('Register failed. \nError in console.');
      });
  };

});

app.controller('registerCtrl', function($scope, $state, $auth) {
  console.log('registerCtrl!');

  $scope.register = () => {
    if($scope.user.password !== $scope.user.password2) {
      $scope.user.password = null;
      $scope.user.password2 = null;
      swal({   title: "Passwords were not match!",   text: "Try again",   timer: 2000,   showConfirmButton: false });

    } else {
      $auth.signup($scope.user)
        .then(res => {
          console.log("res: ", res);
          $state.go('login');
        })
        .catch(err => {
          console.log('err:', err);
          alert('Register failed. Error in console.');
        });
    }
  }

});
