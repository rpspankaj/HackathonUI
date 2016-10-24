var app = angular.module('LoginApp', [ 'ngCookies' ]);

app	.controller(
				'LoginCntrl',
				[
						'$scope',
						'$http',
						'$cookieStore',
						'$window',
						function($scope, $http, $cookieStore, $window) {

							$scope.loggedIN = false;
							$scope.wrongPWD=false;
							$scope.hackUser = null;
							$scope.loginUser = function() {
								var UserName = $scope.userInfo.userName;
								var Password = $scope.userInfo.password;

								_checkLogin(UserName, Password);

								

							};

							function _checkLogin(UserName, Password) {

								$http(
										{
											method : 'POST',											
											url : "https://hack-rest.herokuapp.com/users/login",
					                        data : angular.toJson($scope.userInfo),
					                        headers : {
					                            'Content-Type' : 'application/json'
					                        }
										})
										.then(
												function successCallback(
														response) {
													console.log("success"
															+ response.data);
													if (response.data.valid == true) {
														$cookieStore.put("hackUserInfo",response.data);
														$window.location.href = '/BucketListWeb/HomePage.html';

													} else {

														$scope.wrongPWD = true;
													}

												},
												function errorCallback(response) {
													console
															.log("Erro calling  Service");
												});
							}

						} ]);