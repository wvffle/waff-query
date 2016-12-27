var objects = require('../../util/object');

Element.prototype.attr = function(name, value) {
  if (objects.object(name)) {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        this.setAttribute(i, name[i].toString());
      }
    }
  } else if (name == null || typeof name === 'string') {
    if (name == null) {
      var attributes = this.attributes;
      var res = {};

      for (var i = 0; i < attributes.length; ++i) {
        res[attributes[i].nodeName] = attributes[i].nodeValue;
      }

      return res;
    } else if (value === null) {

      this.removeAttribute(name);
    } else if (value === undefined) {

      return this.attr()[name];
    } else {

      return this.getAttribute(name);
    }
  } else {
    throw 'argument 1 has to be String, Object or null';
  }
};
