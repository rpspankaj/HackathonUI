<!DOCTYPE html>
<html lang="en" ng-app="ItemsApp">
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>BucketList</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/icomoon-social.css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,600,800' rel='stylesheet' type='text/css'>

        <link rel="stylesheet" href="css/leaflet.css" />
		<!--[if lte IE 8]>
		    <link rel="stylesheet" href="css/leaflet.ie.css" />
		<![endif]-->
		<link rel="stylesheet" href="css/main.css">

        <script src="js/modernizr-2.6.2-respond-1.1.0.min.js"></script>
        <!-- JS Libraries -->
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular.min.js" type="text/javascript"></script>
		<script src="https://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.10.0.js" type="text/javascript"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.19/angular-cookies.min.js"></script>

    	<script src="js/angular/Items.js"></script>
    	
    	<!-- Bootstrap -->
		<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
    	
    </head>
    <body >
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
        

        <!-- Navigation & Logo-->
        <div class="mainmenu-wrapper" ng-cloak ng-controller="ItemsController">
	        <div class="container">
	        	<div class="menuextras">
					<div class="extras">
						<ul>
							<li class="shopping-cart-items"><i class="glyphicon glyphicon-shopping-cart icon-white"></i> <a href="bucketList.html"><b>3 items</b></a></li>
							<li>
								<div class="dropdown choose-country">
									<a class="#" data-toggle="dropdown" href="#"><img src="img/flags/us.png" alt="United States"> US</a>
									<ul class="dropdown-menu" role="menu">										
										<li role="menuitem"><a href="#"><img src="img/flags/de.png" alt="Germany"> DE</a></li>
										<li role="menuitem"><a href="#"><img src="img/flags/es.png" alt="Spain"> ES</a></li>
									</ul>
								</div>
							</li>
			        		<li ng-clock ng-if="hackUserInfo.valid==true" ><a ng-cloak ng-click="logout()" >Logout</a></li>
			        		<li ng-clock ng-if="hackUserInfo==null" ><a href="page-login.html">Login</a></li>
			        		
			        	</ul>
					</div>
		        </div>
		        <div class="container">
				<nav class="navbar navbar-default">
					<div class="container-fluid">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed"
								data-toggle="collapse" data-target="#navbar1">
								<span class="sr-only">Toggle navigation</span> <span
									class="icon-bar"></span> <span class="icon-bar"></span> <span
									class="icon-bar"></span>
							</button>
							<a class="navbar-brand" href="HomePage.html"><img
								src="img/bucketlist-logo.jpg" alt="Bucket List"> </a>
						</div>
						<div id="navbar1" class="navbar-collapse collapse">
							<ul class="nav navbar-nav">
								<li><a href="HomePage.html">Home</a></li>
								<li><a href="group.html">Groups</a></li>
								<li><a href="bucketList.html">My Lists</a></li>
							</ul>
						</div>
						<!--/.nav-collapse -->
					</div>
					<!--/.container-fluid -->
				</nav>
			</div>
			</div>
		</div>

        <!-- Page Title -->
		<div class="section section-breadcrumbs">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<h1>Products Listing </h1>
					</div>
				</div>
			</div>
		</div>
		
		<div  ng-cloak ng-controller="ItemsController">
        
        <div class="text-center"> <input type="text" class="search_3" ng-cloak 	ng-model="search.itemName" placeholder="Search Items" />
			<br /></div>	
		
			

	    <div class="eshop-section section">
	    	<div  class="container">
	    		<h2>Your Favorite Products</h2>
				
				<div ng-cloak  ng-repeat="item  in filtered = itemList | filter:search | startFrom:(currentPage-1)*entryLimit | limitTo:entryLimit"> 
					<div class="col-md-3 col-sm-6">
						<div class="shop-item">
							<div class="shop-item-image">
								<a href="page-product-details.html"><img src="img/product1.jpg" alt="Item Name"></a>
							</div>
							<div class="title">
								<h3><a href="page-product-details.html">{{item.itemName}}</a></h3>
							</div>
							<div class="price">
								{{item.price}}
							</div>
							<div class="actions" >
								<a ng-cloak ng-href="page-product-details.html?itemID={{item.itemId}}" class="btn btn-small"><i class="icon-shopping-cart icon-white"></i> Add</a> <span>or <a href="page-product-details.html">Read more</a></span>
							</div>
						</div>
					</div>
					
					
				</div>
				
				<div  ng-if="itemList.length>0 "class="pagination-wrapper ">
				<pagination align="center" page="currentPage" max-size="noOfPages" total-items="totalItems" items-per-page="entryLimit"></pagination>
				</div>
				
				</div>
				
				
				
			</div>
	    </div>

	   

        <!-- Javascripts -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/jquery-1.9.1.min.js"><\/script>')</script>
        <script src="js/bootstrap.min.js"></script>
        <script src="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.js"></script>
        <script src="js/jquery.fitvids.js"></script>
        <script src="js/jquery.sequence-min.js"></script>
        <script src="js/jquery.bxslider.js"></script>
        <script src="js/main-menu.js"></script>
        <script src="js/template.js"></script>

    </body>
</html>
