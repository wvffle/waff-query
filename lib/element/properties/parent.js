var objects = require('../../util/object');
/**
 * Parent of element.
 *
 * @type {Element}
 * @alias Element#parent
 *
 * @returns {Element} parent of element
 *
 * @example
 * var element = waff.q('.inside-header');
 * element.parrent === header
 */
var parent = {
  get: function() {
    return this.parentElement;
  },
  set: function(element) {
    if (element instanceof Element || element instanceof Text) {
      element.appendChild(this);
      return this;
    } else {
      throw 'argument 1 has to be Element or Text';
    }
  }
};

objects.prop(Element.prototype, 'parent', parent);
