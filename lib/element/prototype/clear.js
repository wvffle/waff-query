Element.prototype.clear = function() {
  var len = this.childNodes.length;
  while (len-- > 0) {
    this.removeChild(this.firstChild);
  }
  return this;
};
