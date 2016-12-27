Text.prototype.set = function(str) {
  this.nodeValue = str || '';
  return this;
};
