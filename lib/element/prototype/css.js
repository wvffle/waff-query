var strings = require('../../util/string');
var arrays = require('../../util/array');

var trbl = function(property, suffix) {
  suffix = suffix || '';
  suffix = suffix[0].toUpperCase() + suffix.slice(1);
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
      return this.css()[strings.camel(properties)] ||
        this.css()[strings.dash(properties)];
    }
    this.style[strings.camel(properties)] = value;
  } else if (objects.object(properties)) {
    for (var i in properties) {
      if (properties.hasOwnProperty(i)) {
        var property = strings.camel(i);
        var style = properties[i];
        if (isNaN(+style) === false && arrays.has(pixels, property)) {
          style += 'px';
        }
        this.style[property] = style;
      }
    }
  } else if (properties == null) {
    var properties = getComputedStyle(this);
    var res = {};
    for (var i in properties) {
      if (isNaN(+i)) {
        res[prop] = style;
      }
    }

    if (res.color === undefined) {
      var text = res.cssText;
      res = {};
      var rules = text.split(';');
      for (var i = 0; i < rules.length; ++i) {
        var rule = rules[i].split(':');
        if (rule[1] != null) {
          res[strings.spaces(rule[0])] = strings.spaces(rule[1]);
        }
      }
    }
    return res;
  } else {
    throw 'first argument has to be String, Object or null';
  }
  return this;
};
