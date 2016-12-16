Element.prototype.append = function() {
  for (var i = 0; i < arguments.length; ++i) {
    var element = arguments[i];
    if (array.arrayLike(element)) {
      for (var j = 0; j < element.length; ++j) {
        this.appendChild(element[j]);
      }
    } else {
      this.appendChild(element);
    }
  }
};
