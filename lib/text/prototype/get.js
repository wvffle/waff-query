/**
 * Get nodeValue of textnode
 *
 * @example
 * var text = waff.text('wq');
 * text.get(); // => 'wq'
 */
Text.prototype.get = function() {
  return this.nodeValue;
};
