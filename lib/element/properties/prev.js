var objects = require('../../util/object');

/**
 * Previous sibling of element
 *
 * @type {Element}
 * @alias Element#prev
 *
 * @returns {Element} Previous element
 *
 */
var prev = {
  get: function() {
    return this.previousElementSibling;
  },
  set: function(element) {
    if (element instanceof Element) {
      element.before(this);
      return this;
    } else {
      throw 'argument 1 has to be an Element';
    }
  }
};

objects.prop(Element.prototype, 'prev', prev);
