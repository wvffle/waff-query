/*
 * waff-query v0.5.6
 * https://github.com/wvffle/waff-query.js#readme
 *
 * Copyright wvffle.net
 * Released under the MIT license
 *
 * Date: 2016-08-03
 */

(function(coffeFix, _waff) {
  var key, results, value, waff;
  if (typeof module !== 'undefined') {
    waff = {};
    for (key in _waff) {
      value = _waff[key];
      if (_waff.hasOwnProperty(key)) {
        if (key[0] !== '_') {
          waff[key] = value;
        } else {
          waff[key.slice(1)] = value;
        }
      }
    }
    return module.exports = waff;
  } else if (typeof define === 'function' && typeof define.amd === 'object') {
    return define('waff-query', [], function() {
      waff = {};
      for (key in _waff) {
        value = _waff[key];
        if (_waff.hasOwnProperty(key)) {
          if (key[0] !== '_') {
            waff[key] = value;
          } else {
            waff[key.slice(1)] = value;
          }
        }
      }
      return waff;
    });
  } else {
    this.waff = _waff;
    results = [];
    for (key in _waff) {
      value = _waff[key];
      if (_waff.hasOwnProperty(key)) {
        if (key[0] !== '_') {
          results.push(this[key] = value);
        } else {
          results.push(this.waff[key.slice(1)] = value);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
})(null, (function() {
  var waff;
  waff = {
    ps: (function() {

      /**
       * @func waff#selector.parse
       * @alias waff#ps
       * @desc Parse CSS selectors
       * @param {String} cs - CSS Selector
       * @example
       * // AMD users
       * waff.selector.parse('div#header.white-text')
       * // Non AMD users
       * selector.parse('div#header.white-text')
       * //  {
       * //    tag: 'div',
       * //    id: 'header',
       * //    classList: [ 'white-text' ]
       * //  }
       * @returns {Object} - Returns parsed selector
       */
      var parseSelector;
      parseSelector = function(cs) {
        var _id, _tag, c, cn, i, id, j, len, selector, tag;
        tag = false;
        id = false;
        selector = cs || '';
        cn = selector.split('.');
        if (selector[0] !== '.') {
          tag = cn[0];
        }
        cn.splice(0, 1);
        if (tag === '') {
          tag = false;
        }
        if (tag !== false && -1 !== tag.indexOf('#')) {
          _tag = tag.split('#');
          tag = _tag[0];
          id = _tag[1];
        }
        if (id === false) {
          for (i = j = 0, len = cn.length; j < len; i = ++j) {
            c = cn[i];
            _id = c.split('#');
            if (_id[1]) {
              id = _id[1];
              cn[i] = _id[0];
              break;
            }
          }
        }
        return {
          tag: tag,
          id: id,
          classList: cn
        };
      };
      return parseSelector;
    })(),
    qq: (function() {

      /**
       * @func waff#query.all
       * @alias waff#q#all
       * @alias waff#qq
       * @desc Query all elemnt
       * @param {String|String[]} qs - Query Selector
       * @param {Element|Array|NodeList} [root] - Element to perform query on
       * @example
       * // AMD users
       * waff.query.all('body')
       * // Non AMD users
       * query.all('body')
       * @returns {Element[]} - Returns found elements
       */
      var queryAll;
      queryAll = function(qs, root) {
        var _arr, arr, c, element, j, k, l, len, len1, len2, len3, o, pass, ref, ret, s;
        if (root instanceof Array || root instanceof NodeList) {
          s = this.ps(qs);
          arr = [].slice.call(root);
          ret = [];
          for (j = 0, len = arr.length; j < len; j++) {
            element = arr[j];
            pass = true;
            if (element instanceof Element) {
              if (pass === true && s.tag !== false && element.tagName.toLowerCase() !== s.tag.toLowerCase()) {
                pass = false;
              }
              if (pass === true && s.id !== false && element.id !== s.id) {
                pass = false;
              }
              if (pass === true) {
                ref = s.classList;
                for (k = 0, len1 = ref.length; k < len1; k++) {
                  c = ref[k];
                  if (!element.classList.contains(c)) {
                    pass = false;
                  }
                }
              }
              if (pass === true) {
                ret.push(element);
              }
            }
          }
          return ret;
        }
        if (qs instanceof Element) {
          return [qs];
        }
        root = root instanceof Element ? root : document;
        if (qs instanceof NodeList || qs instanceof Array) {
          arr = [].slice.call(qs);
          _arr = [];
          for (l = 0, len2 = arr.length; l < len2; l++) {
            qs = arr[l];
            if (qs instanceof Element) {
              _arr.push(qs);
            } else {
              _arr.push.apply(_arr, root.querySelectorAll(qs));
            }
          }
          arr = _arr;
        } else {
          arr = [].slice.call(root.querySelectorAll(qs));
        }
        ret = [];
        for (o = 0, len3 = arr.length; o < len3; o++) {
          element = arr[o];
          if (element instanceof Element) {
            ret.push(element);
          }
        }
        return ret;
      };
      return queryAll;
    })(),
    q: (function() {

      /**
       * @func waff#query
       * @alias waff#q
       * @desc Query single elemnt
       * @param {String} qs - Query Selector
       * @param {Element|Array|NodeList} [root] - Element to perform query on
       * @example
       * // AMD users
       * waff.query('body')
       * // Non AMD users
       * query('body')
       * @returns {Element|null} - Returns found element or null
       */
      var query;
      query = function(qs, root) {
        return this.qq(qs, root)[0] || null;
      };
      return query;
    })(),
    e: (function() {

      /**
       * @func waff#element
       * @alias waff#e
       * @desc Creates element by CSS selector
       * @param {String} cs - CSS Selector
       * @example
       * // AMD users
       * waff.element('.white-text')
       * // Non AMD users
       * element('.white-text')
       * @returns {Element} - Returns new element
       */
      var create;
      create = function(cs) {
        var c, el, j, len, ref, s;
        s = this.ps(cs);
        el = document.createElement(s.tag || 'div');
        if (s.id) {
          el.id = s.id;
        }
        ref = s.classList;
        for (j = 0, len = ref.length; j < len; j++) {
          c = ref[j];
          el.classList.add(c);
        }
        return el;
      };
      return create;
    })(),
    t: (function() {

      /**
       * @func waff#text
       * @alias waff#t
       * @desc Creates TextNode
       * @param {String} t - Text
       * @example
       * // AMD users
       * waff.text('.white-text')
       * // Non AMD users
       * text('.white-text')
       * @returns {TextNode} - Returns new TextNode
       */
      var text;
      text = function(t) {
        return document.createTextNode(t);
      };
      return text;
    })()
  };
  waff.selector = {
    parse: waff.ps
  };
  waff.query = waff.q;
  waff.q.all = waff.qq;
  waff.query.all = waff.qq;
  waff.element = waff.e;
  waff.text = waff.t;
  waff._version = '0.5.6';
  waff._get = (function() {

    /**
     * @func waff#get
     * @desc Performs XHR GET
     * @param {String} url - URL to get
     * @param {Object} options
     * * `json` (boolean) - determines if response is json. Default - `false`
     * * `timeout` (number) - determines timeout in ms. Default - `2000`
     * @example
     * waff.get('https://wvffle.net')
     *   .then(function(res){
     *
     *   })
     *   .catch(function(err){
     *
     *   })
     * @returns {waff.Promise} - Returns promise of request
     */
    var get;
    get = function(url, options) {
      if (options == null) {
        options = {};
      }
      return new waff._Promise(function(f, r) {
        var req;
        req = new XMLHttpRequest;
        req.open('get', url, true);
        req.timeout = options.timeout || 2000;
        req.on('readystatechange', function(e) {
          var res;
          if (req.readyState === 4) {
            if (req.status >= 200 && req.status < 400) {
              res = req.responseText;
              if (options.json === true) {
                res = JSON.parse(res);
              }
              req.res = res;
              return f.call(req, res);
            }
          }
        });
        req.on('error', function(e) {
          req.res = {
            status: req.status,
            error: req.statusText
          };
          return r.call(req, res);
        });
        req.on('timeout', function(e) {
          req.res = {
            status: req.status,
            error: req.statusText
          };
          return r.call(req, res);
        });
        req.overrideMimeType('text/plain');
        return req.send();
      });
    };
    return get;
  })();
  waff._post = (function() {

    /**
     * @func waff#post
     * @desc Performs XHR POST
     * @param {String} url - URL to post
     * @param {Object} data - POST data
     * @param {Object} options
     * * `json` (boolean) - determines if response is json. Default - `false`
     * * `form` (boolean) - determines if data should be converted to FormData or just pure JSON. Default - `true`
     * * `timeout` (number) - determines timeout in ms. Default - `2000`
     * @example
     * waff.post('http://httpbin.org/post', { waffle_id: 666 })
     *   .then(function(res){
     *
     *   })
     *   .catch(function(err){
     *
     *   })
     * @returns {waff.Promise} - Returns promise of request
     */
    var post;
    post = function(url, data, options) {
      if (data == null) {
        data = {};
      }
      if (options == null) {
        options = {};
      }
      return new waff._Promise(function(f, r) {
        var form, key, req, value;
        req = new XMLHttpRequest;
        req.open('post', url, true);
        req.timeout = options.timeout || 2000;
        req.on('readystatechange', function(e) {
          var res;
          if (req.readyState === 4) {
            if (req.status >= 200 && req.status < 400) {
              res = req.responseText;
              if (options.json === true) {
                res = JSON.parse(res);
              }
              req.res = res;
              return f.call(req, res);
            }
          }
        });
        req.on('error', function(e) {
          req.res = {
            status: req.status,
            error: req.statusText
          };
          return r.call(req, res);
        });
        req.on('timeout', function(e) {
          req.res = {
            status: req.status,
            error: req.statusText
          };
          return r.call(req, res);
        });
        if ((options.form == null) || options.form === true) {
          req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
          form = new FormData;
          for (key in data) {
            value = data[key];
            if (data.hasOwnProperty(key)) {
              form.append(key, value);
            }
          }
          data = form;
        }
        return req.send(data);
      });
    };
    return post;
  })();
  waff._Promise = (function() {

    /**
     * @class waff.Promise Promise
     * @classdesc Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.
     */
    var Promise;
    Promise = (function() {
      function Promise(executor) {
        this._then = [];
        this._catch = [];
        executor(this.resolve(this), this.reject(this));
      }

      Promise.prototype.then = function(handler, errHandler) {
        this._then.push(handler);
        if (errHandler != null) {
          this._catch.push(errHandler);
        }
        return this;
      };

      Promise.prototype["catch"] = function(handler) {
        this._catch.push(handler);
        return this;
      };

      Promise.prototype.resolve = function(self) {
        return function() {
          var handler, j, len, ref, results;
          ref = self._then;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            handler = ref[j];
            results.push(handler.apply(this, arguments));
          }
          return results;
        };
      };

      Promise.prototype.reject = function(self) {
        return function() {
          var handler, j, len, ref, results;
          ref = self._then;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            handler = ref[j];
            results.push(handler.apply(this, arguments));
          }
          return results;
        };
      };

      return Promise;

    })();
    return Promise;
  })();
  Element.prototype.qq = function(qs) {
    return waff.qq(qs, this);
  };
  Element.prototype.q = function(qs) {
    return waff.q(qs, this);
  };
  Element.prototype.query = Element.prototype.q;
  Element.prototype.query.all = Element.prototype.qq;
  Element.prototype.q.all = Element.prototype.qq;
  Element.prototype.append = function(element) {
    this.appendChild(element);
    return this;
  };
  Element.prototype.prepend = function(element) {
    if (this.firstChild != null) {
      this.insertBefore(element, this.firstChild);
    } else {
      this.append(element);
    }
    return this;
  };
  Element.prototype.before = function(element) {
    if (!this.parentElement) {
      return;
    }
    this.parentElement.insertBefore(element, this);
    return this;
  };
  Element.prototype.after = function(element) {
    if (!this.parentElement) {
      return;
    }
    if (this.nextSibling != null) {
      this.parentElement.insertBefore(element, this.nextSibling);
    } else {
      this.parentElement.append(element);
    }
    return this;
  };
  Element.prototype.text = function(text) {
    var _text, e, j, k, len, len1, node, ref, ref1, t;
    if (text == null) {
      return this.textContent;
    }
    ref = this.childNodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      node.remove();
    }
    if (text instanceof NodeList || text instanceof Array) {
      _text = '';
      ref1 = [].slice.call(text);
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        t = ref1[k];
        if (t instanceof Text) {
          _text += t.get();
        } else {
          if (typeof t === 'string') {
            _text += t;
          } else {
            _text += t.toString();
          }
        }
      }
      e = waff.t(_text);
      this.append(e);
      return e;
    }
    if (text instanceof Text) {
      text = text.get();
    }
    e = waff.t(text);
    this.append(e);
    return e;
  };
  Element.prototype.html = function(html) {
    var arr, h, j, k, len, len1, node, ref;
    if (html == null) {
      return this.innerHTML;
    }
    ref = this.childNodes;
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      node.remove();
    }
    if (html instanceof Element) {
      this.append(html);
      return this;
    }
    if (html instanceof NodeList || html instanceof Array) {
      arr = [].slice.call(html);
      for (k = 0, len1 = arr.length; k < len1; k++) {
        h = arr[k];
        if (h instanceof Element || h instanceof Text) {
          this.append(h);
        }
      }
      return this;
    }
    if (html instanceof Text) {
      html = html.get();
    }
    this.innerHTML = html;
    return this;
  };
  Element.prototype.path = function() {
    var e, i, path, root;
    root = this;
    path = [];
    while (root.parentNode) {
      if (root.id !== '') {
        path.unshift('#' + root.id);
        break;
      }
      if (root === waff.q('html')) {
        path.unshift(root.tagName.toLowerCase());
      } else {
        i = 1;
        e = root;
        while (e.previousElementSibling) {
          e = e.previousElementSibling;
          i++;
        }
        path.unshift(root.tagName.toLowerCase() + ':nth-child(' + i + ')');
      }
      root = root.parentNode;
    }
    return path.join(' > ');
  };
  Element.prototype.css = function(css, values) {
    var camel, dash, prop, res, style;
    camel = function(str) {
      return str.replace(/(\-[a-z])/g, function(m) {
        return m.toUpperCase().slice(1);
      });
    };
    dash = function(str) {
      return str.replace(/([A-Z])/g, function(m) {
        return "-" + m.toLowerCase();
      });
    };
    if (typeof css === 'string') {
      if (values == null) {
        return this.css()[camel(css)] || this.css()[dash(css)];
      }
      this.style[camel(css)] = values;
    }
    if (typeof css === 'object') {
      for (prop in css) {
        style = css[prop];
        this.style[camel(prop)] = style;
      }
      return this;
    }
    if (css == null) {
      css = getComputedStyle(this);
      res = {};
      for (prop in css) {
        style = css[prop];
        if (isNaN(+prop)) {
          res[prop] = style;
        }
      }
    }
    return res;
  };
  Element.prototype.attr = function(attr, value) {
    var key, val;
    if (typeof attr === 'object') {
      for (key in attr) {
        val = attr[key];
        this.setAttribute(key, val);
      }
      return this;
    } else {
      if (value != null) {
        this.setAttribute(attr, value);
      } else {
        return this.getAttribute(attr);
      }
    }
    return this;
  };
  Element.prototype.observe = function() {
    var config;
    if (this._observer == null) {
      this._observerHandlers = [];
      this._observer = new MutationObserver((function(_this) {
        return function(mutations) {
          var handler, j, k, len, len1, mutation, ref;
          ref = _this._observerHandlers;
          for (j = 0, len = ref.length; j < len; j++) {
            handler = ref[j];
            for (k = 0, len1 = mutations.length; k < len1; k++) {
              mutation = mutations[k];
              handler.call(_this, mutation);
            }
          }
          return _this;
        };
      })(this));
      config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
      };
      this._observer.observe(this, config);
    }
    return this;
  };
  Element.prototype.stopObserving = function() {
    if (this._observer != null) {
      this._observer.disconnect();
      delete this._observer;
    }
    return this;
  };
  EventTarget.prototype.on = function(name, next, capture) {
    var _this, event, j, len, self;
    if (!(name instanceof Array)) {
      name = [name];
    }
    self = this.emitter != null ? this.emitter : this;
    _this = this.emitter != null ? this.obj : this;
    if (self._events == null) {
      self._events = {};
    }
    if (self._eventsInited == null) {
      self._eventsInited = {};
    }
    for (j = 0, len = name.length; j < len; j++) {
      event = name[j];
      if (self._events[event] == null) {
        self._events[event] = [];
      }
      self._events[event].push(next);
      if (self._eventsInited[event] !== true) {
        self.addEventListener(event, (function(ev) {
          var handler, k, len1, ref, results;
          if (ev.waffData != null) {
            ev = ev.waffData;
          }
          ref = self._events[event];
          results = [];
          for (k = 0, len1 = ref.length; k < len1; k++) {
            handler = ref[k];
            results.push(handler.call(_this, ev));
          }
          return results;
        }), capture);
      }
      self._eventsInited[event] = true;
    }
    return self;
  };
  Element.prototype.on = function(name, next, capture) {
    var _on, event, j, len;
    if (!(name instanceof Array)) {
      name = [name];
    }
    _on = EventTarget.prototype.on;
    for (j = 0, len = name.length; j < len; j++) {
      event = name[j];
      switch (event) {
        case 'mutation':
          this._observerHandlers.push(next);
          break;
        default:
          _on.apply(this, arguments);
      }
    }
    return this;
  };
  EventTarget.prototype.off = function(name, next, capture) {
    var detach, event, j, len, self;
    if (!(name instanceof Array)) {
      name = [name];
    }
    self = this.emitter != null ? this.emitter : this;
    if (self._events == null) {
      self._events = {};
    }
    for (j = 0, len = name.length; j < len; j++) {
      event = name[j];
      if (self._events[event] == null) {
        self._events[event] = [];
      }
      if (next == null) {
        self._events[event] = [];
      }
      detach = (function(_this) {
        return function(next) {
          var index;
          index = self._events[event].indexOf(next);
          if (index !== -1) {
            self._events[event].splice(index, 1);
            return detach(next);
          }
        };
      })(this);
      detach(next);
    }
    return self;
  };
  Element.prototype.off = function(name, next, capture) {
    var _off, event, index, j, len;
    if (!(name instanceof Array)) {
      name = [name];
    }
    _off = EventTarget.prototype.off;
    for (j = 0, len = name.length; j < len; j++) {
      event = name[j];
      switch (event) {
        case 'mutation':
          index = this._observerHandlers.indexOf(next);
          if (index !== -1) {
            this._observerHandlers.splice(index, 1);
          }
          break;
        default:
          _off.apply(this, [event, next, capture]);
      }
    }
    return this;
  };
  EventTarget.prototype.once = function(name, next, capture) {
    var _this, event, fn, j, len, self;
    if (!(name instanceof Array)) {
      name = [name];
    }
    self = this.emitter != null ? this.emitter : this;
    _this = this.emitter != null ? this.obj : this;
    fn = function(event) {
      var n;
      n = function(ev) {
        next.call(_this, ev);
        return self.off(event, n, capture);
      };
      return self.on(event, n, capture);
    };
    for (j = 0, len = name.length; j < len; j++) {
      event = name[j];
      fn(event);
    }
    return self;
  };
  EventTarget.prototype.emit = function(event, data) {
    var _this, self;
    self = this.emitter != null ? this.emitter : this;
    _this = this.emitter != null ? this.obj : this;
    if (typeof event === 'string') {
      event = new Event(event);
    }
    if (typeof event === 'object') {
      if (data) {
        event.waffData = data;
      }
    }
    event.waffThis = _this;
    return self.dispatchEvent(event);
  };
  Event.extend = function(object) {
    var emitter;
    emitter = object._emitter = waff.e();
    if (object.on == null) {
      object.on = emitter.on.bind({
        emitter: emitter,
        obj: object
      });
    }
    if (object.once == null) {
      object.once = emitter.once.bind({
        emitter: emitter,
        obj: object
      });
    }
    if (object.off == null) {
      object.off = emitter.off.bind({
        emitter: emitter,
        obj: object
      });
    }
    if (object.dispatchEvent == null) {
      object.dispatchEvent = emitter.dispatchEvent.bind(emitter);
    }
    if (object.emit == null) {
      object.emit = emitter.emit.bind({
        emitter: emitter,
        obj: object
      });
    }
    return object;
  };
  Text.prototype.set = function(text) {
    return this.nodeValue = text;
  };
  Text.prototype.get = function() {
    return this.nodeValue;
  };
  return waff;
})());
