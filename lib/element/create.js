var selector = require('../util/selector');
var arrays = require('../util/array');

var create = function(selector, attr, children) {
  var parsedSelector = selector.parse(selector);
  var element = document.createElement(parsedSelector.tag || 'div');

  if (children == null && arrays.arrayLike(attr)) {
    children = attr;
    attr = {};
  }
  if (children != null && arrays.array(attr)) {
    var tmp_attr = {};
    for (var i = 0; i < attr.length; ++i) {
      tmp_attr[attr[i]] = '';
    }
    attr = tmp_attr;
  }
  attr = attr || {};

  if (parsedSelector.id !== false) {
    element.id = parsedSelector.id;
  }

  element.classes = parsedSelector.classes;
  element.append(children);

  element.attr(parsedSelector.attr);
  element.attr(attr);

};

module.exports = create;
