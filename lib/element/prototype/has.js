/**
 * Checks element has `elem` inside
 *
 * @param {Element} elem - element to check
 *
 */
Element.prototype.has = function(element) {
  return element.inside(this);
};
