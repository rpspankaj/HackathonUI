
var app = angular.module('UserApp', [])

app.config( [ '$locationProvider', function( $locationProvider ) {
	   // In order to get the query string from the
	   // $location object, it must be in HTML5 mode.
	   $locationProvider.html5Mode( true );
	}]);

app.controller('UserController', ['$scope','$http','$timeout', function ($scope, $http, $timeout) {
		 $scope.success=false; 
		 $scope.HackUser={
				"firstName":"",
				"email":"",
				"phone":"",
				"password":""
			};
		 $scope.Users=[];
		_refreshPageData();
			
		
	//HTTP POST/PUT methods for add/edit Group
                $scope.addUser = function() {debugger;
					
                   
                    $http({
                        method : "POST",
                        url : "https://hack-rest.herokuapp.com/users",
                        data : angular.toJson($scope.HackUser),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );
                };
	
	function _refreshPageData() {
        $http({
            method : 'GET',
            url : 'https://hack-rest.herokuapp.com/users'
        }).then(function successCallback(response) {
             $scope.Users= response.data;
			 console.log("success"+response.data);
            
        }, function errorCallback(response) {
            console.log("Erro calling Item Service");
        });
    }

	 function _success(response) {debugger;
	              console.log("success");
                  $scope.HackUser ={};				 
				 $scope.success=true;
				  $timeout(function(){
                  $scope.success = false;
                  }, 10000);
			            
      }
      function _error(response) {
                    console.log("error");
      }
}]);
