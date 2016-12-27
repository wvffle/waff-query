var objects = require('../../util/object');
var selectors = require('../../util/selector');

// TODO: add attributes

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
