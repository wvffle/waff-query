/**
  Clone element
 *
 * @example
 * var header = waff.element('header');
 * var clone = header.clone();
 *
 */
Element.prototype.clone = function() {
  return this.cloneNode(false);
};

/**
  Deep clone element
 *
 * @example
 * var header = waff.element('header');
 * var deep_clone = header.deepClone();
 *
 */
Element.prototype.deepClone = function() {
  return this.cloneNode(true);
};
