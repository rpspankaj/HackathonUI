var mod=angular.module('BucketApp', ['ngCookies']);
mod.controller("BucketController", ['$scope','$http', '$cookieStore','$window',function($scope,$http,$cookieStore, $window) {
	
			var hackUser =  $cookieStore.get("hackUserInfo");
			if(!hackUser){
				$window.location.href = '/BucketListWeb/page-login.html';
			}
			$scope.hackUserInfo =  hackUser;
	 
			$scope.logout=function(){
				$cookieStore.remove("hackUserInfo");
				$window.location.href = '/BucketListWeb/HomePage.html';
			};
			
         
			$scope.myGroups=[];
			_getGroups();			
			
			
			
			
			$scope.changeGroup=function(){
				_refreshPageData();
				
			};
			
                //Initialize page with default data which is blank in this example
                $scope.bucketList = [];
                $scope.totalPrice = 0;
				 $scope.openPrice = 0;
				  $scope.donePrice = 0;
                
         
                
         
                
                //HTTP DELETE- delete employee by Id
                $scope.removeBucket = function(bucket) {
                    var method = "PUT";
                    var url = "https://hack-rest.herokuapp.com/bucketLists";
                    bucket.status="deleted";  
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson(bucket),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );
					
                };
 
                $scope.editBucketDone = function(bucket) {
                    var method = "PUT";
                    var url = "https://hack-rest.herokuapp.com/bucketLists";
                    bucket.status="close";  
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson(bucket),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );
					_totalPrice();
                };
				
				$scope.editBucket = function(bucket) {
                    var method = "PUT";
                    var url = "https://hack-rest.herokuapp.com/bucketLists";
                     
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson(bucket),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error );
					_totalPrice();
				 };
                /* Private Methods */
				 
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
                //HTTP GET- get all bucketLists collection
                function _refreshPageData() {
                    $http({
                        method : 'GET',
                        url : 'https://hack-rest.herokuapp.com/bucketLists?groupId='+$scope.selectedGroup
                    }).then(function successCallback(response) {
                        $scope.bucketList = response.data;
						_totalPrice();
                    }, function errorCallback(response) {
                        console.log("error from service");
                    });
                }
         
                function _success(response) {
						
                    _refreshPageData();
                    
                }
         
                function _error(response) {
                    console.log("Service Error");
                }
				
				function _totalPrice(){
					var total=0;
					var open=0;
					var done=0;
					angular.forEach($scope.bucketList, function(value, key){
						total+=value.item.price*value.itemQty;
						if(value.status=="open"){
							open+=value.item.price*value.itemQty;
						}
						if(value.status=="close"){
							done+=value.item.price*value.itemQty;
						}
					});
					$scope.totalPrice=total;
					$scope.donePrice=done;
					$scope.openPrice=open;
					
				}
         
              
            }]);
