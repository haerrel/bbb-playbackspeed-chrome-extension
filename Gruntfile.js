module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/jquery/dist/',
                    src: ['jquery.min.js'],
                    dest: 'src/extension',
                    filter: 'isFile'
                }],
            },
        },
        rename: {
            popcorn: {
                files: [{
                    src: ['tmp/popcorn/popcorn-js-1.5.2/popcorn.js'],
                    dest: 'src/extension/popcorn-complete.min.js'
                }]
            }
        },
        downloadfile: {
            options: {
                dest: './tmp',
                overwriteEverytime: false
            },
            files: {
                'popcorn.zip': 'https://github.com/mozilla/popcorn-js/archive/v1.5.2.zip'
            }
        },
        unzip: {
            'tmp/popcorn/': 'tmp/popcorn.zip'
        },
        compress: {
            bundle: {
                options: {
                    archive: 'build/bundle.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'src/extension/',
                    src: ['**'],
                    dest: '',
                    filter: 'isFile'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-downloadfile');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('init', ['copy:jquery', 'downloadfile', 'unzip', 'rename:popcorn']);
    grunt.registerTask('build', ['compress:bundle']);

};