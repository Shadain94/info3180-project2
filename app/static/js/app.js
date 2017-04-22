/* global $*/

var app = angular.module('wish', []);
    
    app.controller('cardctrl', function($scope, $http) {
        
        var modal = document.getElementById('modal');

        $("#add").click(function(e){
            e.preventDefault();
            modal.style.display = "block";
                
        });
        
        $(".close").click(function() {
            modal.style.display = "none";
            $scope.title = '';
            $scope.details = '';
            $scope.url = '';
            $scope.image = '';
        });
            
        $(window).on('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            $scope.title = '';
            $scope.details = '';
            $scope.url = '';
            $scope.image = '';
            }
        });
        
        $('.form-check-input').click(function() {
            
            if ($('input[name=optionsRadios]:checked', '#form').val() == 'yes') {
                //scrape images
                var loc = { 'url': $scope.url };
                var wishList = JSON.stringify([]);
                $scope.options = JSON.parse(wishList);
                
                $http({
                method: 'POST',
                url: '/api/thumbnails', 
                data: JSON.stringify(loc),
                headers: {'Content-Type': 'application/json'}
                })
                .then(function (response) {
                    for (var i=0; i< response.data.thumbnails.length; i++){
                        var p= response.data.thumbnails[i];
                        
                        $scope.options.push({ source: p});
                        
                    }
                    JSON.stringify($scope.options);
                    console.log($scope.options);
                    
                });
                
            } else {
                // put random image
            }
        });
        
    
        
        $scope.addWish = function() {
            // Code for adding wish
            
        };
        
        $scope.removeWish = function() {
            // Code for adding wish
        };
        
        $scope.shareWish = function() {
            // Code for adding sharing wish
        };
        
        $scope.searchWish = function() {
            // Code for adding searching wish
        };
        
        // $scope.wishes = [];
        
        // $http({
        //         method: 'POST',
        //         url: '/api/users/{userid}/wishlist',  //need to get userid in the url
        //         data: id, //userid,
        //         headers: {'Content-Type': 'application/json'}
        //         })
        //         .then(function (response) {
        //             console.log(response);
                    
        //             $scope.wishes = response;
                    
        //             JSON.stringify($scope.wishes);
                    
        //         });
        
        
    });
