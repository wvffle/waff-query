/**
 * Create TextNode
 *
 * @func
 * @alias module:waff.text
 * @param {String} [str] - String to set
 */
var text = function(str) {
  return document.createTextNode(str || '');
};

module.exports = text;
