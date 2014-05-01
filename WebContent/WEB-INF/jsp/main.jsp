<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
	<head>
		<link rel="shortcut icon" href="assets/img/icon.ico"> 
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Wiki-Contacts</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<link href="assets/css/bootstrap.css" rel="stylesheet" />
		<link href="assets/css/bootstrap-responsive.css" rel="stylesheet" />
		<link href="assets/css/application.css" rel="stylesheet" />
	</head>

	<body>
	<div id="fb-root"></div>
		<!-- start of navigation bar -->
		<div>
			<div class="navbar navbar-fixed-top">
				<div class="navbar-inner">
					<div class="container-fluid">
						<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse" href="#">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</a>
			
						<!-- start of display in both deskstop and mobile -->
						<a class="brand logo" href="/">
							<span class="hidden-phone"><span class="logo-wiki">Wiki-</span><span class="logo-contacts">Contacts</span></span>
							<span class="hidden-desktop"><span class="logo-wiki">W</span><span class="logo-contacts">C</span></span>
						</a>
						<form class="navbar-search pull-left">
							<input id="search_input" class="search-query" type="text" placeholder="Type in a name, number or email" />
						</form>
						
						<ul class="nav">
							<li><a class="hidden-phone" id="newcontact_btn" href="#">Add contact</a>
						</ul>
						
						<!-- end of display in both deskstop and mobile -->
				
						<!-- collapse in mobile -->
						<div class="nav-collapse collapse">														
							<ul class="nav pull-right">
								<li><a class="pull-right" href="mailto:admin@wiki-contacts.com?subject=Wiki-Contacts" target="_top">Feedback</a></li>
								<li class="dropdown hidden-phone"><a id="social-btn" class="dropdown" data-toggle="dropdown" href="#">Social <span class="caret"></span></a>
									<ul class="dropdown-menu">
										<li class="socials"><g:plusone annotation="inline" width="150"></g:plusone></li>
										<li class="socials"><div class="fb-like" data-send="false" data-width="150" data-show-faces="true"></div></li>		
										<li class="socials"><a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>
										</li>						
									</ul>
								</li>
							</ul>				
						</div>	
						<!-- end of collapse in mobile -->
					</div>
				</div>
			</div>
		</div>
		<!--  end of navigation bar -->
		
		<!-- start of main body -->
		<div class="container-fluid main-body">	
			<div id="search_start">
				<div class="start-logo hidden-phone"><b><span class="logo-wiki">Wiki-</span><span class="logo-contacts">Contacts</span></b></div>
				<div class="start-text">
					<p>Together let's share contacts and stop the spam calls.</p>
					<p class="start-statistic"><span class="start-users"></span> contacts from <span class="start-countries"></span> countries</p>
					<p>
						<a href="https://play.google.com/store/apps/details?id=com.kahkong.wikicontacts" target="_blank">
  							<img alt="Android app on Google Play" src="assets/img/googleplay-badge.png" />
						</a>
					</p>
					<p class="start-info">Currently running on a shared server, apologize for any slow response time.</p>
				</div>
			</div>
			<ul id="search_results" class="thumbnails"></ul>
			<div id="search_modals"></div>
			<div id="newcontact_modal"></div>
		</div>
		<!--  end of main body -->
		
		<hr />
		
		<!--  start of footer -->		
		<footer class="text-center">
			<p>© Wiki-Contacts 2013</p>			
			<p>Icons from <a href="http://pixel-mixer.com " target="_blank">PixelMixer</a></p>
		</footer>
		<!--  end of footer -->
		<script src="assets/js/jquery.js"></script>
<!-- 	<script src="assets/js/bootstrap-transition.js"></script> -->
<!-- 	<script src="assets/js/bootstrap-alert.js"></script> -->
		<script src="assets/js/bootstrap-modal.js"></script>
		<script src="assets/js/bootstrap-dropdown.js"></script>
<!-- 	<script src="assets/js/bootstrap-scrollspy.js"></script> -->
<!-- 	<script src="assets/js/bootstrap-tab.js"></script> -->
<!-- 	<script src="assets/js/bootstrap-tooltip.js"></script> -->
<!-- 	<script src="assets/js/bootstrap-popover.js"></script> -->
<!-- 	<script src="assets/js/bootstrap-button.js"></script> -->
 		<script src="assets/js/bootstrap-collapse.js"></script>
		<script src="assets/js/bootstrap-carousel.js"></script>
<!-- 	<script src="assets/js/bootstrap-typeahead.js"></script> -->
		<script src="assets/js/jquery.validate.js"></script>
		<script src="assets/js/jquery.form.js"></script>
		<script src="assets/js/application.js"></script>
		<script src="assets/js/application-html.js"></script>
	</body>
</html>