// (function () {
//     'use strict';
//     angular.module('myApp', ['ngRoute'])
    
//     .controller('formCtrl', function($scope,$http,$location) {
//         'use strict';
            
//         $scope.message = "";
        
//         $scope.submit = function (){
//             if($scope.user.password == $scope.user.confirm){
                
//                 $scope.user= {
//                     fname: $scope.user.firstName,
//                     lname:$scope.user.lastName,
//                     uname:$scope.user.userName,
//                     email:$scope.user.email,
//                     password: $scope.user.password,
//                     confirm: $scope.user.confirm,
//                     hint:$scope.user.hint
//                 };
         
//                 $http({
//                 method: 'POST',
//                 url: '/api/users/register',
//                 data: JSON.stringify($scope.user),
//                 headers: {'Content-Type': 'application/json'}
//                 });
                
                
            
//                     $scope.message = "";
                
//             }else{
//                 $scope.message = "password dont match";
//             }
            
//         };
        
//         $scope.login = function() {
            
//             $scope.credentials = {
//                 email: $scope.login.email,
//                 password: $scope.login.password
//             };
            
//             console.log($scope.credentials);
//             $location.path('/wishers_page/');
            
//             // $http({
//             //     method: 'POST',
//             //     url: '/api/users/login',
//             //     data: JSON.stringify($scope.credentials),
//             //     headers: {'Content-Type': 'application/json'}
//             //     })
//             //     .then(function (data, status, headers, config) {
//             //         console.log('login success');
//             //         $location.path('/wishers_page/');
                    
//             //     });
                
            
               
                
//             };
        
//     })
    
//     .config(config);
    
    
//     config.$inject = ['$routeProvider', '$locationProvider'];
    
    // function config($routeProvider, $locationProvider) {
    //   $routeProvider
    //   .when('/', {
    //       restrict: 'E',
    //       templateUrl: 'app/templates/home.html',
    //       controller: 'formCtrl'
        
    //   })
    //   .when('/wishers_page/', {
          
    //     templateUrl: 'app/templates/wishers_page.html',
    //     controller: 'wishDisplay'
    //   })
    //   .otherwise ({
    //         redirectTo: '/'
    //     });
    //     $locationProvider.html5Mode({
    //       enabled: true,
    //       requireBase: false
    //     });
    // }
        
        

//})();



// app.factory('login', ['$http', function($http) {
//     return $http({method: 'POST', url:"/api/users/login"}).then(function(response) {
//         return response;
//     });
// }]);

// app.factory('register', ['$http', function($http) {
//     return $http({method: 'POST', url:"/api/users/register"}).then(function(response) {
//         return response;
//     });
// }]);
    
// app.controller('formCtrl', ['$scope', 'register','login', function($scope, $location, login, register){
//     $scope.submit = function() {
//         login.then(function(result) {
//         if(result == 'success'){
//             //return page
//             $location.path('/wishers_page');

//         } else {
//             $location.path('/');
//         }
            
//         });
        
//     };
    
//     $scope.register = function() {
//         console.log("I am here");
//         register.then(function(result) {
//         if(result == 'success'){
//             //return page
//             $location.path('/wishers_page');

//         } else {
//             $location.path('/');
//         }
            
//         });
//     }
    
// }]);
    