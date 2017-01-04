/**
 * Set nodeValue of textnode
 *
 * @param {String} str - String to set
 *
 * @example
 * var text = waff.text('wq');
 * text.set('waff-query');
 * text.get(); // => 'waff-query
 */
Text.prototype.set = function(str) {
  this.nodeValue = str || '';
  return this;
};
