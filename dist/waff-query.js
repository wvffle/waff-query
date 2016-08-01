/*
 * waff-query v0.5.4
 * https://github.com/wvffle/waff-query.js#readme
 *
 * Copyright wvffle.net
 * Released under the MIT license
 *
 * Date: 2016-08-02
 */

(function(coffeFix, waff) {
  var key, ref, value;
  if (typeof module !== 'undefined') {
    module.exports = waff();
    console.log('[waff-query]', 'nodejs found');
  } else if (typeof define === 'function' && typeof define.amd === 'object') {
    define('waff-query', [], waff);
    console.log('[waff-query]', 'amd found');
  } else {
    ref = waff();
    for (key in ref) {
      value = ref[key];
      if (key !== 'version') {
        this[key] = value;
      }
    }
  }
})(null, function() {
  var waff;
  waff = {
    ps: function(selector) {
      var _id, _tag, c, cn, i, id, j, len, tag;
      tag = false;
      id = false;
      selector = selector || '';
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
    },
    qq: function(qs, root) {
      var arr, c, element, j, k, l, len, len1, len2, pass, ref, ret, s;
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
      } else {
        arr = [].slice.call(root.querySelectorAll(qs));
      }
      ret = [];
      for (l = 0, len2 = arr.length; l < len2; l++) {
        element = arr[l];
        if (element instanceof Element) {
          ret.push(element);
        }
      }
      return ret;
    },
    q: (function() {

      /**
       * @function waff.query
       * Query single elemnt
       * @param {String} qs - Query Selector
       * @param {Element} [root] - Element to perform query on
       */
      var query;
      query = function(qs, root) {
        return this.qq(qs, root)[0] || null;
      };
      return query;
    })(),
    e: function(selector) {
      var c, el, j, len, ref, s;
      s = this.ps(selector);
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
    },
    t: function(text) {
      return document.createTextNode(text);
    }
  };
  waff.parseSelector = waff.ps;
  waff.query = waff.q;
  waff.q.all = waff.qq;
  waff.query.all = waff.qq;
  waff.element = waff.e;
  waff.text = waff.t;
  waff.waff = waff;
  waff.waff.version = '0.5.4';
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
      return str.replace(/([A-Z])/g, function() {
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
  EventTarget.prototype.on = function(event, next, capture) {
    var _this, self;
    self = this.emitter != null ? this.emitter : this;
    _this = this.emitter != null ? this.obj : this;
    if (self._events == null) {
      self._events = {};
    }
    if (self._eventsInited == null) {
      self._eventsInited = {};
    }
    if (self._events[event] == null) {
      self._events[event] = [];
    }
    self._events[event].push(next);
    if (self._eventsInited[event] !== true) {
      self.addEventListener(event, (function(ev) {
        var handler, j, len, ref, results;
        if (ev.waffData != null) {
          ev = ev.waffData;
        }
        ref = self._events[event];
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          handler = ref[j];
          results.push(handler.call(_this, ev));
        }
        return results;
      }), capture);
    }
    self._eventsInited[event] = true;
    return self;
  };
  Element.prototype.on = function(event, next, capture) {
    var _on;
    _on = EventTarget.prototype.on;
    switch (event) {
      case 'mutation':
        this._observerHandlers.push(next);
        break;
      default:
        _on.apply(this, arguments);
    }
    return this;
  };
  EventTarget.prototype.off = function(event, next, capture) {
    var detach, self;
    self = this.emitter != null ? this.emitter : this;
    if (self._events == null) {
      self._events = {};
    }
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
    return self;
  };
  Element.prototype.off = function(event, next, capture) {
    var _off, index;
    _off = EventTarget.prototype.off;
    switch (event) {
      case 'mutation':
        index = this._observerHandlers.indexOf(next);
        if (index !== -1) {
          this._observerHandlers.splice(index, 1);
        }
        break;
      default:
        _off.apply(this, arguments);
    }
    return this;
  };
  EventTarget.prototype.once = function(event, next, capture) {
    var _this, n, self;
    self = this.emitter != null ? this.emitter : this;
    _this = this.emitter != null ? this.obj : this;
    n = function(ev) {
      next.call(_this, ev);
      return this.off(event, n, capture);
    };
    self.on(event, n, capture);
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
    emitter = object._emitter = e();
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
});
