var objects = require('../../util/object');
/**
 * Next element
 *
 * @type {Element}
 * @alias Element#next
 *
 * @returns {Element} next element
 *
 */
var next = {
  get: function() {
    return this.nextElementSibling;
  },
  set: function(element) {
    if (element instanceof Element || element instanceof Text) {
      element.after(this);
      return this;
    } else {
      throw 'argument 1 has to be Element or Text';
    }
  }
};

objects.prop(Element.prototype, 'next', next);
