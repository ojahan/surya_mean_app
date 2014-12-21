'use strict';
/**
* myApp Module
*
* Description
*/
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider','$locationProvider','$httpProvider',
	function($routeProvider,$locationProvider,$httpProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/',{
				controller :'mainController',
				templateUrl:'/partials/dashboard.html'
			})
			.when('/training-schedule', {
				controller :'trainingScheduleController',
				templateUrl:'/partials/trainingSchedule.html'
			})
			.when('/training-history',{
				controller :'trainingHistoryController',
				templateUrl:'/partials/trainingHistory.html'
			})
			.when('/your-team',{
				controller :'yourTeamController',
				templateUrl:'/partials/yourTeam.html'
			})
			.when('/your-profile', {
				controller: 'yourProfileController',
				templateUrl:'/partials/yourProfile.html'
			})
			.when('/messages',{
				controller :'messagesController'
				templateUrl:'/partials/messages.html'
			})
			.otherwise({
				redirectTo:'/'
			});	
}]);

app.controller('mainController', ['$scope', function($scope){	
}]);

app.controller('trainingScheduleController', ['$scope', function($scope){
	
}]);

app.controller('trainingHistoryController', ['$scope', function($scope){
	
}]);

app.controller('yourTeamController', ['$scope', function($scope){
	
}]);

app.controller('yourProfileController', ['$scope', function($scope){
	
}]);

app.controller('messagesController', ['$scope', function($scope){
	
}]);

app.controller('topMenu', ['$scope', function($scope){
	$scope.invitationCount = 4;
	$scope.invitationNotif = ['Training1','Training2','Training4','Training5','Training6'];
	$scope.messageCount = 10;
	$scope.messages = [{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'},
						{avatar:'/images/ui-zac.jpg', from:'Zac Snider',time:'Just now', content:'Hi mate, how is everything?'}];
}]);

app.controller('sideBar', ['$scope', function($scope){
	$scope.avatar = '/images/ui-zac.jpg';
	$scope.username = 'Surya Surakhman';
}]);