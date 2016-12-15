var array = require('../util/array');

var tags    = /^\*|[A-Za-z0-9*_-]+$/;
var ids     = /^#[A-Za-z0-9_-]+$/;
var classes = /^\.[A-Za-z0-9_.-]+$/;

/**
 * @func
 * @alias module:waff.query
 */
var query = function(selector, options) {
  options = options || {};
  options.root = options.root || document;
  options.single = options.single === false ? false : true;
  options.array = options.array === false ? false : true;

  selector = selector === '' ? options.root.children[0] : selector;
  selector = selector || options.root === document ? document.body : 'body';

  if (selector instanceof Element) {
    return options.single ? selector : [ selector ];
  }

  var querySelector = function(selector) {
    if (options.single) return [ options.root.querySelector(selector) ];
    else return options.root.querySelectorAll(selector);
  };

  var queryElements = function(selector) {
    if (tags.test(selector)) {
      return options.root.getElementsByTagName(selector);
    } else if (ids.test(selector)) {
      return [ options.root.getElementById(selector) ];
    } else if (classes.test(selector)) {
      return options.root.getElementsByClassName(selector);
    }
    if (selector[0] === '>') {
      options.root = options.root.children;
    }
    return querySelector(selector);
  };

  if (array.arrayLike(selector)) {
    var res = [];
    for (var i = 0; i < selector.length; ++i) {
      if (selector[i] instanceof Element) {
        res.push(selector[i]);
      } else if (typeof selector[i] === 'string') {
        var element = queryElements(selector[i]);
        if (element != null) [].push.apply(res, element);
      }
      if (options.single && !!res.length) return res[0];
    }

    return options.single ? undefined : res;
  } else {
    if (typeof selector !== 'string') {
      throw 'selector must be a String, Element or an Array';
    }
    var res = queryElements(selector);
    return options.single ? res[0] : options.array ? array.from(res) : res;
  }

};

query.all = function(selector, options) {
  options = options || {};
  options.single = false;
  return query(selector, options);
};

Element.prototype.query = function(selector, options) {
  options = options || {};
  options.root = this;
  return query(selector, options);
};

Element.prototype.query.all = function(selector, options) {
  options = options || {};
  options.root = this;
  return query.all(selector, options);
};

Element.prototype.q = Element.prototype.query;
Element.prototype.qq = Element.prototype.query.all;

module.exports = query;
