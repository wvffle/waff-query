/**
 * Returns clone of child of element
 *
 * @param {Element} deep - Previous sibling of inserted element
 *
 * @example
 * var header = waff.element('header');
 * header.after(waff.query('#slider'));
 * // =>
 * // #slider
 * // header
 *
 */
Element.prototype.clone = function(deep) {
  return this.cloneNode(deep);
};
