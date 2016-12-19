Element.prototype.attr = function(name, value) {
  if (typeof name === 'object') {
    for (var i in name) {
      if (name.hasOwnProperty(i)) {
        this.setAttribute(i, name[i]);
      }
    }
  } else {
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
  }
};
