/**
 * Inserts element before (If Element != root) `elem`
 *
 * @param {Element} elem - element to inssert
 *
 * @example
 * var header = waff.element('header');
 * header.before(waff.query('#slider'));
 * // =>
 * // #slider
 * // header
 *
 */
Element.prototype.before = function(element) {
  if (element.parentElement != null) {
    element.parentElement.insertBefore(this, element);
  } else {
    throw 'cannot insert before root element';
  }

  return this;
};
