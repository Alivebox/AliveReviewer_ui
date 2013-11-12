module.exports = function (grunt) {

    //CONFIGURATION - START

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {

            app_sass: {
                files: ['../app/sass/*.scss',
                    '../app/sass/**/*.scss',
                        '../app/sass/**/**/*.scss'
                ],
                tasks: 'default'
            }
        },

        sass: {                                     // Task
            dist: {                                 // Target
                options: {                          // Target options
                    style: 'expanded'
                },
                files: {                            // Dictionary of files
                    '../app/css/main.css': '../app/sass/main.scss'        // 'destination': 'source'
                }
            }
        }

    });

    //CONFIGURATION - END

    //PLUGINS - START

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //PLUGINS - END

    //TASKS - START

    grunt.registerTask('default', ['sass']);

    //TASKS - START

};
