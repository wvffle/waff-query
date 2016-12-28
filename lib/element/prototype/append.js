var array = require('../../util/array.js');
/**
 * Inserts element/string/html to element
 *
 * @param {String|Object} arguments - arguments to insert
 *
 *
 * @example
 * var header = waff.element('header');
 * header.append('some text');
 * // =>
 * // <header>some text</header>
 *
 */
Element.prototype.append = function() {
  for (var i = 0; i < arguments.length; ++i) {
    var element = arguments[i];
    if (array.arrayLike(element)) {
      for (var j = 0; j < element.length; ++j) {
        if (element[j] instanceof Element || element[j] instanceof Text) {
          this.appendChild(element[j]);
        }
      }
    } else {
      this.appendChild(element);
    }
  }

  return this;
};
