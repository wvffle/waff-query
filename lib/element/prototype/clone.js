/**
  Clone element
 *
 * @param {Element} deep=false - Determines if you want to clone children
 *
 * @example
 * var header = waff.element('header');
 * var clone = header.clone();
 *
 */
Element.prototype.clone = function(deep) {
  return this.cloneNode(deep || false);
};
