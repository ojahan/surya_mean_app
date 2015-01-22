module.exports = function(grunt) {
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
    	concat: {
    		options: {
    			separator: ';'
    		},
    		dist: {
    			src: ['public/assets/controllers/*.js'],
    			dest: 'public/assets/javascripts/script.js'
    		}
    	},
    	uglify:{
    		options: {
    			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %>*/\n'
    		},
    		dist:{
    			files: {
    				'script.min.js': ['<%= concat.dist.dest %>']
    			}
    		}
    	},
        express: {
            options: {
                cmd: process.argv[0],
                opts: [],
                args: [],
                background: true,
                fallback: function(){},
                port: 3000,
                node_env: undefined,
                delay: 0,
                output: ".+",
                debug: false,
                breakOnFirstLine: false,
                logs: undefined
                },
            dev: {
                options: {
                    script: 'bin/www'
                }
            },
            prod: {
                options: {
                    script: 'bin/www'
                }
            },
            test: {
                options: {
                    script: 'bin/www'
                }
            },
        },
        watch: {
            options: {
                livereload: true
            },
            express: {
                files: ['**/*.js'],
                tasks: ['express:dev'],
                options: {
                    spawn:false
                }
            }
        }
    });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', [ 'concat','uglify','express:dev', 'watch' ]);

};