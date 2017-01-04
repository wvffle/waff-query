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
    return this.innerhtml;
  }

  if (str instanceof text) {
    str = str.get();
  }

  if (typeof str === 'string') {
    this.innerhtml = str;
    return this;
  } else if (str instanceof element) {
    this.clear();
    this.appendchild(str);
    return this;
  } else {
    throw 'argument 1 has to be String, Element, Text or null';
  }
};
