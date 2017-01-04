var array = require('../../util/array.js');

/**
 * Insert `elem` as first child of element
 *
 * @param {Element} elem - Element to insert
 *
 * @example
 * var header = waff.element('header');
 * header.append(waff.text('some text'));
 * header.prepend(waff.query('#slider'));
 *
 * // <header>some text<div id='slider'></div></header>
 *
 */
Element.prototype.prepend = function(element) {
  for (var i = arguments.length - 1; i >= 0; --i) {
    var element = arguments[i];
    if (array.arrayLike(element)) {
      for (var j = element.length - 1; j >= 0; --j) {
        if (element[j] instanceof Element || element[j] instanceof Text) {
          if (this.firstChild) {
            this.insertBefore(element[j], this.firstChild);
          } else {
            this.appendChild(element[j]);
          }
        }
      }
    } else {
      if (this.firstChild) {
        this.insertBefore(element, this.firstChild);
      } else {
        this.appendChild(element);
      }
    }
  }

  return this;
};
