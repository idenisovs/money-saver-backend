/**
 * Created by Ilya Denisov on 12.03.2016..
 */

module.exports = run;

function run(grunt)
{
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
                    './Source/ui/index.html': ['./Source/ui/index.html']
                }
            }
        },

        clean:
        {
            'pre-build': [ './Source/ui/app/app.js', './Source/ui/app/app.min.js' ],
            'post-build': [ './Source/ui/app/app.js' ]
        }
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');

    var defaultTask =
        [
            'clean:pre-build',
            'concat',
            'uglify',
            'processhtml',
            'clean:post-build'
        ];

    grunt.registerTask('default', defaultTask);
}