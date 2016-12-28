/**
 * Checks element has `elem`
 *
 * @param {Element} element - element to check
 *
 * @example
 */

Element.prototype.has = function(element) {
  return element.inside(this);
};
