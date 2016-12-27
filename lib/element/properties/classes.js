var objects = require('../../util/object');
var arrays = require('../../util/array');

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
    var i = 0;
    for (var j = 0; j < classList.length; ++j) {
      if (classList[j] !== '') {
        res[i] = classList[j];
        ++i;
      }
    }
    res.length = i;
    res.add = function(name) {
      res[res.length++] = name;
      self.className = arrays.join(res, ' ');
      return self;
    };

    res.remove = function(name) {
      arrays.remove(res, name);
      self.className = arrays.join(res, ' ');
      return self;
    };

    res.toggle = function(name) {
      if (arrays.has(res, name)) {
        res.remove(name);
      } else {
        res.add(name);
      }
    };
  },
  set: function(classList) {
    var res = [];
    for (var j = 0; j < classList.length; ++j) {
      if (classList[j] !== '') {
        res.push(classList[j]);
      }
    }
    this.className = res.join(' ');
  }
};

objects.prop(Element.prototype, 'classes', classes);

// as coffee supports things like element.class.add()
objects.prop(Element.prototype, 'class', classes);
