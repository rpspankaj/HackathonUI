var app = angular.module('ItemApp', ['ui.bootstrap','ngCookies']);

app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});
app.config( [ '$locationProvider', function( $locationProvider ) {
	   // In order to get the query string from the
	   // $location object, it must be in HTML5 mode.
	   $locationProvider.html5Mode( true );
	}]);

app.controller('ItemController', ['$scope','$http','$location','$window','$cookieStore' , function ($scope, $http,$location,$window,$cookieStore ) {
	
	var hackUser =  $cookieStore.get("hackUserInfo");
	if(!hackUser){
		$window.location.href = '/BucketListWeb/page-login.html';
	}
	$scope.hackUserInfo =  hackUser;
	
	
	$scope.bucket={
			itemQty : "1",
			userGroupId : ""
        };
	
	$scope.myGroups=[];
				
	
		
	 $scope.addToBucket = function(bucket,itemId) {debugger;
					var bucketJson=new Object();
					bucketJson.itemId=itemId;
					bucketJson.itemQty=bucket.itemQty;
					bucketJson.userId="1";
					bucketJson.userGroupId=bucket.userGroupId;
                    var method = "POST";
                    var url = "https://hack-rest.herokuapp.com/bucketLists";
                    
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson(bucketJson),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );
					
                };
	
	 
   $scope.item = null;
   var itemId=null;
   if ( $location.search().hasOwnProperty( 'itemID' ) ) {
    	itemId = $location.search()['itemID'];
    }
	_refreshPageData(itemId);
	 console.log("Item" , $scope.item); 
	
	
	function _refreshPageData(itemId) {
        $http({
            method : 'GET',
            url : 'https://hack-rest.herokuapp.com/items/'+itemId
        }).then(function successCallback(response) {
            $scope.item = response.data;
            		
            console.log("Item" , $scope.item);
            _getGroups()
        }, function errorCallback(response) {
            console.log("Erro calling Item Service");
        });
    }
	 function _getGroups() {
	        $http({
	            method : 'GET',
	            url : 'https://hack-rest.herokuapp.com/groups?userId='+$scope.hackUserInfo.userId
	        }).then(function successCallback(response) {
	             $scope.myGroups= response.data;
	             $scope.selectedGroup = $scope.myGroups[0].groupId;
				 console.log("success"+response.data);
				//Now load the data from server
	                _refreshPageData();
	            
	        }, function errorCallback(response) {
	            console.log("Erro calling Item Service");
	        });
	    }
	 function _success(response) {debugger;
			console.log("Service Error");			
        //_refreshPageData();
		$window.location.href = "/BucketListWeb/bucketList.html";
                    
     }
         
    function _error(response) {
         console.log("Service Error");
       }
				
}]);
