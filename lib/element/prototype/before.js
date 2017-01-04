/**
 * Insert `elem` before element
 *
 * @param {Element} elem - element to inssert
 *
 * @example
 * var header = waff.element('header');
 * header.before(waff.query('#slider'));
 *
 * // <header></header>
 * // <div id='slider'></div>
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
