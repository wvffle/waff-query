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
      sel += id;
    }

    var classes = this.className.split(' ');
    for (var i = 0; i < classes.length; ++i) {
      if (classes[i] != '') {
        sel += '.' + classes[i];
      }
    }

    var attributes = this.attributes;
    for (var i = 0; i < attributes.length; ++i) {
      sel += '[' + attributes[i].nodeName + (
        attributes[i].nodeValue == '' ?
          '' : '=\'' + attributes[i].nodeValue + '\''
      ) + ']';
    }

    return sel;
  },
  set: function(sel) {
    if (typeof sel !== 'string') {
      throw 'argument 1 has to be String';
    }

    var parsedSelector = selectors.parse(sel);

    this.tagName = parsedSelector.tag || 'div';
    this.classes = parsedSelector.classes;

    if (sel.id) {
      this.id = parsedSelector.id;
    }

    this.attr(parsedSelector.attr);
  }
};

objects.prop(Element.prototype, 'selector', selector);
