var array = require('../../util/array.js');

/**
 * Insert `elem` at the end of childlist
 *
 * @param {Element} elem - element to insert
 *
 *
 * @example
 * var header = waff.element('header');
 * header.append(waff.text('some text'));
 *
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
