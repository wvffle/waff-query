module.exports = function(grunt) {

  var package = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: package,
    concat: {
      options: {
        separator: '',
        process: {
          data: {
            // TODO: get indent somehow
            include: function(file, indent){
              var res = grunt.file.read('src/'+file+'.coffee');
              if(res.endsWith('\n')){
                res = res.replace(/\s+$/, '');
              }
              if(indent != null){
                res = res.split('\n');
                res = res.join('\n'+indent);
              }
              return res;
            }
          }
        }
      },
      dist: {
        src: [ 'src/module.coffee' ],
        dest: 'dist/waff-query.coffee'
      }
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        files: {
          'dist/waff-query.js': 'dist/waff-query.coffee'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) | Released under the MIT license */\n'
      },
      waff: {
        files: {
          'dist/waff-query.min.js': 'dist/waff-query.js'
        }
      }
    },
    usebanner: {
      waff: {
        options: {
          banner: '/*\n * <%= pkg.name %> v<%= pkg.version %>\n * <%= pkg.homepage %>\n *\n * Copyright wvffle.net\n * Released under the MIT license\n *\n * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n */\n',
          linebreak: true
        },
        files: {
          src: [ 'dist/waff-query.js' ]
        }
      }
    },
    open: {
      tests: {
        path: process.cwd()+'/test/index.html'
      }
    },
    modify_json: {
      options: {
        indent: '  ',
        fields: {
          name: package.name,
          version: package.version,
          description: package.description,
          repository: package.repository,
          keywords: package.keywords,
          authors: package.authors,
          license: package.license,
          homepage: package.homepage
        }
      },
      files: {
        src: [ 'bower.json' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-modify-json');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('tests', function () {
    index = grunt.file.read('test/index.html')
    files = grunt.file.expand('test/**/*.js')
    res = '<!-- {{ -->\n'
    for (var i = 0; i < files.length; i++) {
      file = files[i]
      res += '<script src="../'+file+'"></script>\n'
    }
    res += '<!-- }} -->'
    grunt.file.write('test/index.html', index.replace(/<!-- {{ -->([^]+)<!-- }} -->/, res))
  })


  grunt.registerTask('default', ['concat', 'coffee', 'usebanner', 'uglify', 'tests', 'open:tests', 'modify_json']);

};
