module.exports = function(grunt){
  //Configure task(s)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean:{
      dev: ['dev/'],
    },
    concat:{
      devcss:{
        src: ['src/client/css/*.css'],
        dest: 'dev/client/css/main.css'
      }
    },
    cssmin:{
    },
    uglify: {
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          sourceMap: true,
          preserveComments: 'all'
        },
        src: ['src/client/js/**/*.js'],
        dest: 'dev/client/js/script.min.js'
      }
    },
    copy: {
      all: {
        files: [
          {expand: true, cwd:'src/', src: ['**','!client/**/*.js'], dest: 'dev/'},
        ]
      }
    },
    watch: {
      js: {
        files: ['src/client/js/**/*.js'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['src/client/css/*.css'],
        tasks: ['concat:devcss']
      },
      other: {
        files: ['**','!client/**/*.js'],
        tasks: ['copy:all'],
        options: {
          cwd: {files: 'src/'}
        }
      }
    }
  });

  //Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //Register tasks
  grunt.registerTask('default', ['clean:dev','uglify:dev','concat:devcss','copy:all']);
};
