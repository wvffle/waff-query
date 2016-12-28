/**
 * Clear all content of `elem`
 *
 * @example
 * var header = waff.element('header');
 * header.clear();
 * // <header><div></div></header>
 * // =>
 * // <header></header>
 */
Element.prototype.clear = function() {
  var len = this.childNodes.length;
  while (len-- > 0) {
    this.removeChild(this.firstChild);
  }
  return this;
};
