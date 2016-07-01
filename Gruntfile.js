/**
 * Created by Ilya Denisov on 12.03.2016.
 * TODO: Please, process Login and Main applications separately!
 */

module.exports = run;

function run(grunt)
{
    var projectVersion = grunt.file.read('./Source/version');

    projectVersion = projectVersion.replace(/[\r\n]/, '');

    var config =
    {
        pkg: grunt.file.readJSON('package.json'),

        concat:
        {
            options: { separator: ';' },
			
			login:
			{
				src: 
				[
					'./Source/ui/libs/moment.js',
                    './Source/ui/libs/spin.js',
                    './Source/ui/libs/angular.js',
                    './Source/ui/libs/angular-resource.js',
					'./Source/ui/libs/angular-route.js',
					'./Source/ui/libs/angular-spinner.js',
					'./Source/ui/libs/angular-cookies.js',
                    './Source/ui/libs/ui-bootstrap*',
					'./Source/ui/app/login/**/*.js'
				],
				dest: './Source/ui/app/login.app.js'
			},
            
			main:
            {
                src:
                [
					'./Source/ui/libs/Chart.js',
					'./Source/ui/libs/moment.js',
					'./Source/ui/libs/spin.js',

					'./Source/ui/libs/angular.js',
					'./Source/ui/libs/ui-bootstrap-tpls-1.2.2.js',

                    './Source/ui/libs/angular-*.js',
					
					'./Source/ui/app/money/money-app.js',
                    './Source/ui/app/money/**/*.js'
                ],
                dest: './Source/ui/app/app.js'
            }
        },

        uglify:
        {
            options:
            {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            main:
			{
				src: ['./Source/ui/app/app.js' ],
				dest: './Source/ui/app/app.min.js'
			},
			
			login:
			{
				src: ['./Source/ui/app/login.app.js' ],
				dest: './Source/ui/app/login.app.min.js'
			}
        },

        processhtml:
        {
            dist:
            {
                files:
                {
                    './Source/ui/index.html': [ './Source/ui/index.html' ],
                    './Source/ui/login.html': [ './Source/ui/login.html' ]
                }
            }
        },

        clean:
        {
            'pre-build': [ './Source/ui/app/*.js' ],
            'post-build': [ './Source/ui/app/*app.js' ]
        },

        replace:
        {
            version: 
            {
                src: [ './Source/ui/*.html' ],
                overwrite: true,
                replacements: [ { from: '{{version}}', to: projectVersion  } ]
            }
        }
    };

    grunt.initConfig(config);

    grunt.file.defaultEncoding = 'utf8';
    grunt.file.preserveBOM = false;

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-text-replace');

    var defaultTask =
        [
            'clean:pre-build',
			
            'replace:version',
			
			'concat:login',
			'uglify:login',
			
			'concat:main',
			'uglify:main',
			
            'processhtml',
			
            'clean:post-build'
        ];

    var updateVersion = [ 'replace:version' ];

    grunt.registerTask('default', defaultTask);
    grunt.registerTask('version', updateVersion);
}
