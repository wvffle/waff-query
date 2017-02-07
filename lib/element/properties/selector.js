var objects = require('../../util/object');
var selectors = require('../../util/selector');

/**
 * Selector of element
 *
 * @type {Element}
 * @alias Element#selector
 *
 * @returns {Element} Element selector
 *
 * @example
 * q().selector // => 'body.yay[ng-app='my-app']'
 */
var selector = {
  get: function() {
    var tag = this.tagName.toLowerCase();
    var sel = tag === 'div' ? '' : tag;

    if (this.id) {
      return '#' + this.id;
    }

    var classes = this.className.split(' ');
    for (var i = 0; i < classes.length; ++i) {
      if (classes[i] != '') {
        sel += '.' + classes[i];
      }
    }

    var attributes = this.attributes;
    for (var i = 0; i < attributes.length; ++i) {
      if (!~['id', 'class'].indexOf(attributes[i].nodeName)) {
        sel += '[' + attributes[i].nodeName + (
          attributes[i].nodeValue == '' ?
            '' : '=\'' + attributes[i].nodeValue + '\''
        ) + ']';
      }
    }

    return sel;
  },
  set: function(sel) {
    if (typeof sel !== 'string') {
      throw 'argument 1 has to be String';
    }

    var parsedSelector = selectors.parse(sel);

    if (this.tagName != parsedSelector.tag && parsedSelector.tag != '') {
      var err = 'cannot change tagName of Element from \'';
      err += this.tagName.toLowerCase() + '\' to \'';
      err += parsedSelector.tag + '\'';

      throw err;
    }
    this.classes = parsedSelector.classes;

    if (parsedSelector.id) {
      this.id = parsedSelector.id;
    }

    this.attr(parsedSelector.attr);
  }
};

objects.prop(Element.prototype, 'selector', selector);
