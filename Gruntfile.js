module.exports = function(grunt) {

  require('time-grunt')(grunt); //show task time
  require("load-grunt-tasks")(grunt);

//For external grunt config
//
//  require('load-grunt-config')(grunt, {
//    jitGrunt: true // used fast (Just In Time) task loader
//  });

  grunt.initConfig({

    csscomb: {
      style: {
        expand: true,
        src: ["less/**/*.less"]
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["img/**/*.{png,jpg,gif,svg}"]
        }]
      }
    },

    less: {
      style: {
        files: {
          "css/style.css": ["less/style.less"]
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version", "ie 10"]
      },
      style: {
        src: "css/style.css"
      }
    },

    cmq: {
      style: {
        files: {
          "css/style.css": ["css/style.css"]
        }
      }
    },

//    connect: {
//      server: {
//        options: {
//          port: 8000,
//          protocol: "http",
//          hostname: "localhost",
//          base: '.',
//          directory: null,
//          open: true,
//          keepalive: true
//        }
//      }
//    },

    connect: {
      options: {
        port: 9000,
        livereload: true,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: '.',
        }
      },
    },


    //https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ["less/**/*.less"],
        tasks: ['build'],
      },

      html: {
        files: ['index.html'] // no tasks, just live reload
      },
    },

    // https://github.com/sindresorhus/grunt-concurrent
    concurrent: {
      target: {
        tasks: ['connect', 'watch'],
      }
    },

    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0,
          report: "gzip"
        },
        files: {
          "css/style.min.css": ["css/style.css"]
        }
      }
    }
  });

  grunt.registerTask("build",[
    "less",
    "autoprefixer",
    "cmq",
    "cssmin"
  ]);

  grunt.registerTask("optimization",[
    "csscomb",
    "less",
    "autoprefixer",
    "cmq",
  ]);

  grunt.registerTask('develop', [
    'concurrent:target'
  ]);

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
        'connect',
        'watch'
        ]);
  });


};
