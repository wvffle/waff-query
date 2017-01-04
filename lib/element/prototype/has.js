/**
 * Check element has `elem` inside
 *
 * @param {Element} elem - Element to check
 *
 */
Element.prototype.has = function(element) {
  return element.inside(this);
};
