/**
 * Inserts element after `elem`
 *
 * @param {Element} element - element to check
 *
 * @example
 * var header = waff.element('header');
 * header.after(waff.query('#slider'));
 * // =>
 * // #slider
 * // header
 */

Element.prototype.has = function(element) {
  return element.inside(this);
};
