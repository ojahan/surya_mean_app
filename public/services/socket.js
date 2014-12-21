'use strict';
angular.factory('socket', ['$rootScope', function($rootScope){
	var socket = io.connect();
	return {
		on: function(EventName, callback){
			socket.on(EventName, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket,args);
				});
			});
		},
		emit: function(EventName, data, callback){
			socket.emit(EventName, data, function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		}
	}
}])