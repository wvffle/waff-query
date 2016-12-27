/**
 * Inserts element before (If elem != root) `elem`
 *
 * @param {Element} element - element to insert
 *
 * @example
 * var header = waff.element('header');
 * header.before(waff.query('#slider'));
 * // =>
 * // #slider
 * // header
 */
Element.prototype.before = function(element) {
  if (element.parentElement != null) {
    element.parentElement.insertBefore(this, element);
  } else {
    throw 'cannot insert before root element';
  }

  return this;
};
