/* global $*/

var app = angular.module('wish', []);
    
    app.controller('cardctrl', function($scope, $http) {
        
        
        var chosen;
        
        var modal = document.getElementById('modal');
        var wishList = JSON.stringify([]);
        $scope.options = JSON.parse(wishList);
        
    // Displays Modal    
        $("#add").click(function(e){
            e.preventDefault();
            modal.style.display = "block";
                
        });
     
    // Hides the modal when the close button is clicked     
        $(".close").click(function() {
            modal.style.display = "none";
            $scope.title = '';
            $scope.details = '';
            $scope.url = '';
            $scope.image = '';
        });
        
    // Hides the modal when the screen is clicked        
        $(window).on('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            $scope.title = '';
            $scope.details = '';
            $scope.url = '';
            $scope.image = '';
            }
        });
        
    // Listens for the click on the radion buttons on the form    
        $('.form-check-input').click(function() {
            
            if ($('input[name=optionsRadios]:checked', '#form').val() == 'yes') {
                
                //var dest = '/api/thumbnails?url=' + loc;
                //var loc = "http://www.caranddriver.com/best-sports-cars"
                
            //Calls python function to scrape images from the given url.
                $http({
                method: 'POST',
                url: '/api/thumbnails', 
                //params: {'url': $scope.url},
                data: JSON.stringify({url: $scope.url}),
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
                })
                .then(function (response) {
                    for (var i=0; i< response.data.thumbnails.length; i++){
                        
                        $scope.options.push(response.data.thumbnails[i]);
                        
                    }
                    JSON.stringify($scope.options);
                    console.log($scope.options);
                });
            } else {
                // put random image
            }
        });
        
    // Function to remove a wish to the database     
        $scope.removeWish = function(index) {
          // remove wish
          $http({
                method: 'POST',
                url: '/api/users/{userid}/wishlist/{itemid}', 
                data: JSON.stringify({itemid: index}),
                headers: {'Content-Type': 'application/json;charset=UTF-8'}
                })
                .then(function (response) {
                    for (var i=0; i< response.data.thumbnails.length; i++){
                        
                        $scope.options.push(response.data.thumbnails[i]);
                        
                    }
                    JSON.stringify($scope.options);
                    console.log($scope.options);
                });
        };
        
    // Stores the selected image from the form    
        $scope.chosenImg = function(index){
            chosen = $scope.options[index];
            console.log(chosen);
        };
        
    
    // Function to add a wish to the database     
        $scope.addWish = function () {
        //Gets details from form
        var userid = $scope.userid;
        console.log(userid);
            
            var details = {
                title: $scope.title,
                description: $scope.description,
                url: $scope.url,
                image: chosen
            };
            
            $http({
                method: 'POST',
                url: '/api/users/'+sessionStorage.getItem('current_user')+'/wishlist',
                data: JSON.stringify(details),
                headers: {'Content-Type': 'application/json'}
                })
                .then(function (response) {
                    console.log("It was added.");
                    $scope.options.push({
                        title: $scope.title,
                        description: $scope.description,
                        url: $scope.url,
                        image: $scope.rating
                });
            });
            
        // Resets form fields
            
            $scope.title = '';
            $scope.description = '';
            $scope.url = '';
            $scope.img = '';
            alert('Your Wish has been Added');
            
            
            
            // Add confirmation for the user to see
        };
        
        
        $scope.shareWish = function() {
            // Code for adding sharing wish
        };
        
        $scope.searchWish = function() {
            // Code for adding searching wish
        };
        
        
        
        
    });
