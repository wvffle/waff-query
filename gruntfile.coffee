module.exports = (grunt) ->
  json = grunt.file.readJSON('package.json')
  grunt.initConfig
    pkg: json
    concat:
      options:
        separator: ''
        process: data:
          include: (file, indent) ->
            res = grunt.file.read 'src/' + file + '.coffee'
            res = res.replace /\s+$/, '' if res.endsWith '\n'
            res = res.split('\n').join '\n' + indent if indent?
            res
          version: json.version
      dist:
        src: [ 'src/module.coffee' ]
        dest: 'dist/waff-query.coffee'

    coffee:
      compile:
        options: bare: true
        files: 'dist/waff-query.dev.js': 'dist/waff-query.coffee'
      test:
        options: bare: true
        files: [
          expand: true
          cwd: 'test'
          src: '**/*.coffee'
          dest: 'test'
          ext: '.js'
        ]

    uglify:
      options: banner: '/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) | Released under the MIT license */\n'
      waff: files: 'dist/waff-query.js': 'dist/waff-query.dev.js'

    usebanner:
      js:
        options:
          banner: '/*\n * <%= pkg.name %> v<%= pkg.version %>\n * <%= pkg.homepage %>\n *\n * Copyright wvffle.net\n * Released under the MIT license\n *\n * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
          linebreak: true
        files: src: [ 'dist/waff-query.dev.js' ]
      coffee:
        options:
          banner: '###\n# <%= pkg.name %> v<%= pkg.version %>\n# <%= pkg.homepage %>\n#\n# Copyright wvffle.net\n# Released under the MIT license\n#\n# Date: <%= grunt.template.today("yyyy-mm-dd") %>\n###\n'
          linebreak: true
        files: src: [ 'dist/waff-query.coffee' ]

    open: tests: path: process.cwd() + '/test/index.html'

    modify_json:
      options:
        indent: '  '
        fields:
          name: json.name
          version: json.version
          description: json.description
          repository: json.repository
          keywords: json.keywords
          authors: json.authors
          license: json.license
          homepage: json.homepage
      files: src: [ 'bower.json' ]

    jsdoc: dist:
      src: [ 'dist/waff-query.dev.js' ]
      options:
        destination: 'jsdoc'
        readme: 'README.md'

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-banner'
  grunt.loadNpmTasks 'grunt-modify-json'
  grunt.loadNpmTasks 'grunt-open'
  grunt.loadNpmTasks 'grunt-jsdoc'

  grunt.registerTask 'tests', ->
    index = grunt.file.read 'test/index.html'
    modules = grunt.file.expand [ 'test/module.js' ]
    files = grunt.file.expand [ 'test/**/*.js', '!test/module.js' ]
    res = '<!-- {{ -->\n'
    for file in modules
      res += '<script src="../' + file + '"></script>\n'
    for file in files
      res += '<script src="../' + file + '"></script>\n'
    res += '<!-- }} -->'
    grunt.file.write 'test/index.html', index.replace /<!-- {{ -->([^]+)<!-- }} -->/, res

  grunt.registerTask 'default', [
    'build'
    'test'
    'docs'
    'publish'
  ]

  grunt.registerTask 'build', [
    'concat'
    'coffee:compile'
    'usebanner'
    'uglify'
  ]

  grunt.registerTask 'test', [
    'coffee:test'
    'tests'
    'open:tests'
  ]

  grunt.registerTask 'docs', [ 'jsdoc' ]
  grunt.registerTask 'publish', [ 'modify_json' ]
