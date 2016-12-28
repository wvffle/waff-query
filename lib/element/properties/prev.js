var objects = require('../../util/object');
/**
 * Get previous element
 *
 * @type {Element}
 * @alias Element#prev
 *
 * @returns {Element} previous element
 *
 *
 */
var prev = {
  get: function() {
    return this.previousElementSibling;
  },
  set: function(element) {
    if (element instanceof Element || element instanceof Text) {
      element.before(this);
      return this;
    } else {
      throw 'argument 1 has to be Element or Text';
    }
  }
};

objects.prop(Element.prototype, 'prev', prev);
