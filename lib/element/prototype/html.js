/**
 * Get/Set innerHTML of element
 *
 * @param {String} [str] - HTML to set
 *
 * @example
 * var header = waff.element('header');
 * header.html('<div></div>')
 * // <header><div></div</header>
 *
 */
Element.prototype.html = function(str) {
  if (str == null) {
    return this.innerHTML;
  }

  if (str instanceof Text) {
    str = str.get();
  }

  if (typeof str === 'string') {
    this.innerHTML = str;
    return this;
  } else if (str instanceof Element) {
    this.clear();
    this.appendChild(str);
    return this;
  } else {
    throw 'argument 1 has to be String, Element, Text or null';
  }
};
