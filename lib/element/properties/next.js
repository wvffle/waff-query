var objects = require('../../util/object');

/**
 * Next sibling of element
 *
 * @type {Element}
 * @alias Element#next
 *
 * @returns {Element} Next element
 *
 */
var next = {
  get: function() {
    return this.nextElementSibling;
  },
  set: function(element) {
    if (element instanceof Element) {
      element.after(this);
      return this;
    } else {
      throw 'argument 1 has to be an Element';
    }
  }
};

objects.prop(Element.prototype, 'next', next);
