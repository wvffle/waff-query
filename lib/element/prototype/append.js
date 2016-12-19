var array = require('../../util/array.js');

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
