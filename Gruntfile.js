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
					'./Source/ui/libs/moment/moment.js',
                    './Source/ui/libs/spin/spin.js',
                    './Source/ui/libs/**/angular.js',
                    './Source/ui/libs/**/angular-resource.js',
                    './Source/ui/libs/**/angular-route.js',
                    './Source/ui/libs/**/angular-spinner.js',
                    './Source/ui/libs/**/angular-cookies.js',
                    './Source/ui/libs/**/angular-translate.js',
                    './Source/ui/libs/**/angular-translate-loader-static-files.js',
                    './Source/ui/libs/**/angular-translate-loader-url.js',
                    './Source/ui/libs/**/ui-bootstrap.js',
                    './Source/ui/libs/**/ui-bootstrap-tpls.js',
                    './Source/ui/app/login/**/login-*.js',
                    './Source/ui/app/login/**/i18n.js'
				],
				dest: './Source/ui/app/login.app.js'
			},
            
			main:
            {
                src:
                [
					'./Source/ui/libs/chart.js/dist/Chart.js',
					'./Source/ui/libs/moment/moment.js',
					'./Source/ui/libs/spin/spin.js',

					'./Source/ui/libs/**/angular/angular.js',
                    './Source/ui/libs/**/ui-bootstrap.js',
                    './Source/ui/libs/**/ui-bootstrap-tpls.js',

                    './Source/ui/libs/**/angular-translate.js',
                    './Source/ui/libs/**/angular-translate-loader-static-files.js',
                    './Source/ui/libs/**/angular-translate-loader-url.js',

                    './Source/ui/libs/**/angular-*.js',

					'./Source/ui/app/money/money-app.js',
                    './Source/ui/app/money/**/*.js',
                    '!./Source/**/*.min.js',
                    '!./Source/**/dist/angular-chart.js'
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
            'post-build': [ './Source/ui/app/*app.js', './Source/finance.db', './Source/config.prod.json' ],
            'cleanup': [ './node_modules', './Source/ui/libs', './Source/*.log' ]
        },

        replace:
        {
            version: 
            {
                src: [ './Source/ui/*.html' ],
                overwrite: true,
                replacements: [ { from: '{{version}}', to: projectVersion  } ]
            }
        },

        copy: 
        {
            config:
            {
                files: [ { src: './Source/config.prod.json', dest: './Source/config.json' } ]
            }
        }
    };

    grunt.initConfig(config);

    grunt.file.defaultEncoding = 'utf8';
    grunt.file.preserveBOM = false;

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
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

        'copy:config',

        'clean:post-build'
    ];

    var updateVersion = [ 'replace:version' ];

    grunt.registerTask('build', defaultTask);
    grunt.registerTask('version', updateVersion);
}
