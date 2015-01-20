module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'node-inspector': {
		custom: {
		    options: {
		      'web-port': 5050,
		      'web-host': 'localhost',
		      'debug-port': 3030,
		      'save-live-edit': true,
		      'no-preload': true,
		      'stack-trace-limit': 4,
		      'hidden': ['node_modules']
		    }
		}
	}
  });

  grunt.loadNpmTasks('grunt-node-inspector');

  grunt.registerTask('running','Running the server', function(){
  	grunt.util.spawn({
  		cmd: 'DEBUG=socket',
  		grunt: true,
  		args: 'bin/www'  		
  	});
  });

  // Default task(s).
  grunt.registerTask('default', ['node-inspector','running']);

};