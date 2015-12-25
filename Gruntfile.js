module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: false
      },
      index: {
        files: {
          'dist/js/app.min.js': ['js/**/*.js']
        }
      },
      bundle: {
        files: {
          'assets/js/bundle.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/Materialize/dist/js/materialize.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-materialize/src/angular-materialize.js',
            'bower_components/angular-disqus/angular-disqus.min.js',
            'bower_components/spreadsheetSoup/spreadsheetSoup.js',
            //'bower_components/angular-facebook/lib/angular-facebook.js',
          ],
        }
      }
    },
    sass: {                              
      app: {                            
        options: {                       
          style: 'expanded'
        },
        files: {                         
          'dist/css/style.css': ['scss/main.scss'],       
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          'dist/css/style.min.css': ['dist/css/style.css']
        }
      },
      bundle: {
        files: {
          'assets/css/bundle.min.css': [
            'bower_components/Materialize/dist/css/materialize.min.css',
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['uglify:index'],
        options: {
          spawn: false,
        },
      },
      scss: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:app'],
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
}
