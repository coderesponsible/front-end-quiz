module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: 'sass/',
            src: ['**/*.scss'],
            dest: 'css/',
            ext: '.css',
          },
        ],
      }
    },
    spell: {
      all: {
        src: ['questions.json'],
        options: {
          ignore: []
        }
      }
    },
    jshint: {
      all: ['js/**/*.js'],
      options: {
        reporter: require('jshint-stylish'),
        curly: true,
        eqeqeq: true,
        eqnull: false,
        browser: true,
        indent: 2,
        quotmark: 'single',
        unused: false,
        ignores: ['node_modules/**/*.js', 'js/build/**/*.js'],
        globals: {
          jQuery: true
        },
      },
    },
    jsonlint: {
      sample: {
        src: [ '**/*.json' ]
      }
    },
    browserify: {
      dist: {
        options: {
        },
        files: {
          'js/build/quiz.js': ['js/quiz.js']
        },
      }
    },
    uglify: {
      dist: {
        files:{
          'js/build/quiz-min.js': ['js/build/quiz.js']
        },
      }
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 0,
          progressive: true
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },
    sassyclean: {
      options: {
        modules: ['sass/modules/**/*.scss', 'sass/themes/**/*.scss', 'sass/layout/**/*.scss', 'sass/base/**/*.scss'],
        buildfiles: ['sass/**/*.scss'],
        remove: false,
        days: null
      },
    },
    watch: {
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['sass:dist'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['jshint','newer:browserify', 'newer:uglify'],
        options: {
          livereload: true
        }
      },
      // json: {
      //   files: ['**/*.json'],
      //   tasks: ['newer:jsonlint'],
      //   options: {
      //     spawn: false
      //   }
      // },
      images: {
        files: ['img/**/*.{png,jpg,gif}'],
        tasks: ['newer:imagemin'],
        options: {
          spawn: false
        }
      },
      livereload: {
        files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sassyclean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.loadNpmTasks('grunt-spell');
  grunt.registerTask('default',['watch']);
};