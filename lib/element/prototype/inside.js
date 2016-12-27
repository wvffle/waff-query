Element.prototype.inside = function(element) {
  if (this.parent === element) {
    return true;
  }
  var current = this;
  while (current = current.parentElement) {
    if (current == parent) {
      return true;
    }
  }
};
