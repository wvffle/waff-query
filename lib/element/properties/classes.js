var objects = require('../../util/object');
var arrays = require('../../util/array');
var strings = require('../../util/string');

/**
 * Array of element's classes
 *
 * @type {Array}
 * @alias Element#classes
 *
 * @returns {Array} element's classes
 *
 * @example
 * var element = waff.element('#header.red.text-white');
 * element.classes // => [ 'red', 'text-white' ]
 *
 */
var classes = {
  get: function() {
    var res = {};
    var self = this;
    var classList = this.className.split(' ');

    res.array = function(cL) {
      var str = [];
      var map = {};
      var classList = cL || self.className.split(' ');
      for (var i = 0; i < classList.length; ++i) {
        if (classList[i] != '' && !map[classList[i]]) {
          str.push(classList[i]);
          map[classList[i]] = true;
        }
      }
      return str;
    };

    res.add = function(name) {
      var classList = self.className.split(' ');
      classList.push(name);
      self.className = res.array(classList).join(' ');
      return self;
    };

    res.remove = function(name) {
      var str = [];
      var map = {};
      var classList = self.className.split(' ');
      for (var i = 0; i < classList.length; ++i) {
        if (classList[i] != '' && !map[classList[i]] && classList[i] != name) {
          str.push(classList[i]);
          map[classList[i]] = true;
        }
      }
      self.className = str.join(' ');
      return self;
    };

    res.toggle = function(name) {
      if (name != '' && res.has(name)) {
        res.remove(name);
      } else {
        res.add(name);
      }
    };

    res.has = function(name) {
      return strings.has(self.className, name);
    };

    return res;
  },
  set: function(classList) {
    if (classList.length === 0) return;
    var res = [];
    var map = {};
    for (var j = 0; j < classList.length; ++j) {
      if (classList[j] !== '' && !map[classList[j]]) {
        res.push(classList[j]);
        map[classList[j]] = true;
      }
    }
    if (res.length === 0) return;
    this.className = res.join(' ');
  }
};

objects.prop(Element.prototype, 'classes', classes);

// as coffee supports things like element.class.add()
objects.prop(Element.prototype, 'class', classes);
