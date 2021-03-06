/**
 * Check if `elem` is a parent of element
 *
 * @param {Element} elem - Element to check
 *
 * @example
 * var header = waff.element('header');
 * header.inside(q()); // => true
 */
Element.prototype.inside = function(element) {
  if (this.parentElement === element) {
    return true;
  }

  var current = this;
  while (current = current.parentElement) {
    if (current == element) {
      return true;
    }
  }

  return false;
};
