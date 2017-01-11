var strings = require('../../util/string');
var arrays = require('../../util/array');
var objects = require('../../util/object');

var trbl = function(property, suffix) {
  suffix = suffix || '';
  suffix = (suffix[0] || '').toUpperCase() + suffix.slice(1);
  return [
    property + 'Top' + suffix,
    property + 'Right' + suffix,
    property + 'Bottom' + suffix,
    property + 'Left' + suffix,
    property + suffix
  ];
};

var pixels = [
  'width', 'height', 'lineHeight',
  'top', 'right', 'bottom', 'left',
  'fontSize', 'textIndent', 'wordSpacing'
];

arrays.add(pixels, trbl('margin'));
arrays.add(pixels, trbl('padding'));
arrays.add(pixels, trbl('border', 'width'));

var pixelize = function(prop, value) {
  if (isNaN(+value) === false && arrays.has(pixels, prop)) {
    value += 'px';
  }
  return value;
};

/**
 * Get/Set css properties of element
 *
 * @param {String|Object} properties - properties to find or key-value object
 * @param {String} [value] - value to set
 *
 * @example
 * var header = waff.element('header');
 * header.css('color', 'black');
 *
 */
Element.prototype.css = function(properties, value) {
  if (typeof properties === 'string') {
    if (value == null) {
      var css = this.css();
      return css[strings.camel(properties)] ||
        css[strings.dash(properties)];
    }
    var property = strings.camel(properties);
    this.style[property] = pixelize(property, value);
  } else if (objects.object(properties)) {
    for (var i in properties) {
      if (properties.hasOwnProperty(i)) {
        var property = strings.camel(i);
        this.style[property] = pixelize(property, properties[i]);
      }
    }
  } else if (properties == null) {
    var properties = getComputedStyle(this);
    var res = {};
    if (properties._values != null) properties = properties._values;

    for (var i in properties) {
      if (isNaN(+i) && properties.hasOwnProperty(i)) {
        res[i] = properties[i];
        res[strings.camel(i)] = properties[i];
      }
    }

    if (res.display === undefined) {
      var text = res.cssText || '';
      res = {};
      var rules = text.split(';');
      for (var i = 0; i < rules.length; ++i) {
        var rule = rules[i].split(':');
        if (rule[1] != null) {
          res[strings.spaces(rule[0])] = strings.spaces(rule[1]);
          res[strings.camel(strings.spaces(rule[0]))] = strings.spaces(rule[1]);
        }
      }
    }

    return res;
  } else {
    throw 'first argument has to be String, Object or null';
  }
  return this;
};
