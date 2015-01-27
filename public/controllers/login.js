/**
*  Module: Login
*
* Description: Login User
*/
var app = angular.module('authModule', ['ngRoute','ngTouch']);

app.controller('loginController', ['$scope', '$rootScope', '$location', 'USER_ROLES', 'AuthService', function($scope, $rootScope, $location, session, auth){
	
	$scope.credential = {username: undefined, password: undefined};
	
	$scope.loginProcess = function(credential){
		var data = auth.login(credential);		
		console.log(data);
	};	



}]);

app.constant('AUTH_EVENT', {
	loginSuccess :'auth-login-success',
	loginFailed :'auth-login-failed',
	logoutSuccess :'auth-logout-success',
	sessionTimeout :'auth-session-timeout',
	notAuthenticated :'auth-not-authenticated',
	notAuthorized :'auth-not-authorized'
});

app.constant('USER_ROLES', {
	all: '*',
	admin :'admin',
	coach :'coach',
	player :'player'
});

app.factory('AuthService', ['$http','Session', function($http,Session){
	var authService = {};

	authService.login = function(credential){
		return $http.post('/login',credential)
				.success(function(data, status){
					Session.create(data._id, data.user_id, data.role);
					// console.log(data);
					return data;
				})
				.error(function(data,status){
					return 'Login Incorrect';
				});
	};

	authService.isAuthenticated = function(){
		return !!Session.userid;
	};

	authService.isAuthorized = function(authorizedRoles){
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		};		
		return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
	};

	return authService;
}]);


app.service('Session',  function(){
	this.create = function(sessionId, userId, userRole){
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function(){
		this.userId = null;
		this.userRole = null;	
	};
});;

