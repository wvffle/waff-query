var array = require('../util/array');

var tags    = /^\*|[A-Za-z0-9*_-]+$/;
var ids     = /^#[A-Za-z0-9_-]+$/;
var classes = /^\.[A-Za-z0-9_.-]+$/;

/**
 * Find element in document with selector
 *
 * @func
 * @alias module:waff.query
 * @param {string} selector - query selector
 * @param {object} [options] - query options
 * @param {boolean} options.array=true - if true - output is an array. If false - output can be NodeList or HTMLCollection
 */
var query = function(selector, options) {
  options = options || {};
  options.root = options.root || document;
  options.single = options.single === false ? false : true;
  options.array = options.array === false ? false : true;

  selector = selector === '' ? options.root.children[0] : selector;
  if (selector == null) {
    selector = options.root === document ? document.body : 'body';
  }

  if (selector instanceof Element) {
    return options.single ? selector : [ selector ];
  }

  var querySelector = function(selector, root) {
    if (options.single) return [ root.querySelector(selector) ];
    else return root.querySelectorAll(selector);
  };

  var queryElements = function(selector) {
    if (array.arrayLike(options.root) === false) {
      options.root = [ options.root ];
    }
    if (selector[0] === '>') {
      var root = options.root;
      selector = selector.slice(1);
      options.root = [];
      if (selector[0] === ' ') selector = selector.slice(1);
      if (selector === '') selector = '*';
      for (var i = 0; i < root.length; ++i) {
        [].push.apply(options.root, root[i].children);
      }
    }

    var res = [];
    for (var i = 0; i < options.root.length; ++i) {
      var root = options.root[i];

      if (tags.test(selector)) {
        [].push.apply(res, root.getElementsByTagName(selector));
      } else if (ids.test(selector)) {
        res.push(root.getElementById(selector));
      } else if (classes.test(selector)) {
        [].push.apply(res, root.getElementsByClassName(selector));
      }
      [].push.apply(res, querySelector(selector, root));
    }
    return res;
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

/**
 * Find all elements in document with selector
 *
 * @func
 * @alias module:waff.queryAll
 * @param {string} selector - query selector
 * @param {object} [options] - query options
 * @param {boolean} options.array=true - if true - output is an array. If false - output can be NodeList or HTMLCollection
 */
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
