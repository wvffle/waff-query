var objects = require('../../util/object');

/**
 * Parent of element
 *
 * @type {Element}
 * @alias Element#parent
 *
 * @returns {Element} Parent of element
 *
 * @example
 * var element = waff.q('.inside-header');
 * element.parent === header
 *
 */
var parent = {
  get: function() {
    return this.parentElement;
  },
  set: function(element) {
    if (element instanceof Element) {
      element.appendChild(this);
      return this;
    } else {
      throw 'argument 1 has to be an Element';
    }
  }
};

objects.prop(Element.prototype, 'parent', parent);
