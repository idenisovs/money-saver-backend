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
            dist:
            {
                src:
                [
                    './Source/ui/libs/moment.js',
                    './Source/ui/libs/spin.js',
                    './Source/ui/libs/angular.js',
                    './Source/ui/libs/angular-*.js',
                    './Source/ui/libs/ui-bootstrap*',
                    './Source/ui/app/money-app.js',
                    './Source/ui/app/money-app-config.js',
                    './Source/ui/app/health-resource.js',
                    './Source/ui/app/health-led-directive.js',
                    './Source/ui/app/view/**/*.js'
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
            build:
            {
                src: ['./Source/ui/app/app.js' ],
                dest: './Source/ui/app/app.min.js'
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
            'pre-build': [ './Source/ui/app/app.js', './Source/ui/app/app.min.js' ],
            'post-build': [ './Source/ui/app/app.js' ]
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
            'concat',
            'uglify',
            'processhtml',
            'clean:post-build'
        ];

    var updateVersion = [ 'replace:version' ];

    grunt.registerTask('default', defaultTask);
    grunt.registerTask('version', updateVersion);
}
