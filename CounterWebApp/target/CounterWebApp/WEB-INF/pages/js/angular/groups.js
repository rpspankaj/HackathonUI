var app = angular.module('GroupApp', ['ngCookies'])

app.config( [ '$locationProvider', function( $locationProvider ) {
	   // In order to get the query string from the
	   // $location object, it must be in HTML5 mode.
	   $locationProvider.html5Mode( true );
	}]);

app.controller('GroupController', ['$scope','$http','$cookieStore','$window', function ($scope, $http,$cookieStore,$window) {
		var hackUser =  $cookieStore.get("hackUserInfo");
		if(!hackUser){
			$window.location.href = '/BucketListWeb/page-login.html';
		}
	    $scope.hackUserInfo =  hackUser;
		
		$scope.logout=function(){
			$cookieStore.remove("hackUserInfo");
			$window.location.href = '/BucketListWeb/HomePage.html';
		};
		
		$scope.UserGroup={
                    groupName : "",
                    createdBy : ""
                };
		$scope.Groups=[];		
		$scope.success=false;
		_refreshPageData();
			
		
	//HTTP POST/PUT methods for add/edit Group
                $scope.addGroup = function() {
                	
                $scope.UserGroup.createdBy=$scope.hackUserInfo.userId;
                   
                    $http({
                        method : "POST",
                        url : "https://hack-rest.herokuapp.com/groups",
                        data : angular.toJson($scope.UserGroup),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );
                };
	
	function _refreshPageData() {
        $http({
            method : 'GET',
            url : 'https://hack-rest.herokuapp.com/groups?userId='+$scope.hackUserInfo.userId
        }).then(function successCallback(response) {
             $scope.Groups= response.data;
			 console.log("success"+response.data);
            
        }, function errorCallback(response) {
            console.log("Erro calling Item Service");
        });
    }

	 function _success(response) {debugger;
	              console.log("success");
				  $scope.success=true;
				  _refreshPageData() ;
                    
      }
      function _error(response) {
                    console.log("error");
      }
}]);
