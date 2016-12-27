/**
 * Checks element is a parrent of `elem`
 *
 * @param {Element} element - element to check
 *
 * @example
 * var header = waff.element('header');
 * header.inside()
 */
Element.prototype.inside = function(element) {
  if (this.parent === element) {
    return true;
  }
  var current = this;
  while (current = current.parentElement) {
    if (current == parent) {
      return true;
    }
  }
};
