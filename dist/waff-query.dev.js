/*
 * waff-query v2.0.0-beta2
 * https://wvffle.net
 *
 * Copyright wvffle.net
 * Released under the MIT license
 *
 * Date: 2016-09-23
 */

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(function(coffeFix, _waff) {
  var key, value, waff;
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
    for (key in _waff) {
      value = _waff[key];
      if (_waff.hasOwnProperty(key)) {
        if (key[0] === '_') {
          this.waff[key.slice(1)] = value;
        }
      }
    }
    this.ps = this.waff.ps;
    this.qq = this.waff.qq;
    this.q = this.waff.q;
    this.e = this.waff.e;
    this.t = this.waff.t;
    this.selector = this.waff.selector;
    this.element = this.waff.element;
    this.text = this.waff.text;
    return this.query = this.waff.query;
  }
})(null, (function() {

  /**
   * @namespace waff
   */
  var Target, arropts, j, l, len, len1, len2, len3, o, opts, ref, ref1, ref2, ref3, u, waff;
  waff = {
    ps: (function() {

      /**
       * @func waff#selector.parse
       * @alias waff#ps
       * @desc Parse CSS selectors
       * @param {String} cs - CSS Selector
       * @example
       * selector.parse('div#header.white-text')
       * //  {
       * //    tag: 'div',
       * //    id: 'header',
       * //    class: [ 'white-text' ]
       * //  }
       * @returns {Object} - Returns parsed selector
       */
      var parseSelector;
      parseSelector = function(cs) {
        var _id, _tag, at, atr, c, char, cn, i, id, j, l, len, len1, parseAttr, sel, selector, tag;
        tag = false;
        id = false;
        at = false;
        selector = cs || '';
        sel = '';
        atr = '';
        parseAttr = function(res) {
          var char, j, last, len, op, str, vel;
          res = res.slice(1, -1);
          cs = -1 !== res.indexOf(' i', res.length - 2);
          op = false;
          if (cs) {
            res = res.slice(0, -2);
          }
          vel = {};
          last = '';
          str = '';
          if (res === '') {
            return;
          }
          for (j = 0, len = res.length; j < len; j++) {
            char = res[j];
            if (vel.op == null) {
              if (-1 !== waff.__index(['=', '|', '*', '^', '$', '~'], char)) {
                vel.op = char;
                vel.na = str;
                str = '';
                char = '';
              }
            } else {
              if (char === '=') {
                if (-1 !== waff.__index(['|', '*', '^', '$', '~'], vel.op)) {
                  vel.op += char;
                  char = '';
                }
              }
            }
            str += char;
            last = char;
          }
          if (!((vel.op != null) && (vel.na != null))) {
            vel.na = str;
            str = null;
          }
          if (vel.na == null) {
            return;
          }
          if ((vel.op != null) && str === '') {
            return;
          }
          if ((vel.op != null) && vel.na === '') {
            return;
          }
          if (at === false) {
            at = {};
          }
          if ((str != null) && ((str[0] === '\'' && str[str.length - 1] === '\'') || (str[0] === '"' && str[str.length - 1] === '"'))) {
            str = JSON.parse(str);
          }
          return at[vel.na] = {
            operator: vel.op || false,
            value: str || false,
            caseSensitive: cs
          };
        };
        for (j = 0, len = selector.length; j < len; j++) {
          char = selector[j];
          if (char === '[') {
            atr += char;
          } else if (char === ']') {
            atr += char;
            parseAttr(atr);
            atr = '';
          } else {
            if (atr.length === 0) {
              sel += char;
            } else {
              atr += char;
            }
          }
        }
        selector = sel;
        cn = selector.split('.');
        if (selector[0] !== '.') {
          tag = cn[0];
        }
        cn.splice(0, 1);
        if (tag === '') {
          tag = false;
        }
        if (tag !== false && -1 !== waff.__index(tag, '#')) {
          _tag = tag.split('#');
          tag = _tag[0];
          id = _tag[1];
        }
        if (id === false) {
          for (i = l = 0, len1 = cn.length; l < len1; i = ++l) {
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
          "class": cn,
          attr: at
        };
      };
      return parseSelector;
    })(),
    qq: (function() {

      /**
       * @func waff#query.all
       * @alias waff#q.all
       * @alias waff#qq
       * @desc Query all elements
       * @param {String} selector='body' - CSS Selector
       * @param {Element} [root=document] - Element to perform query on
       * @param {Boolean} [single=false] - Specifies if the query is single
       * @example
       * var divs = waff.query.all('div')
       * var divs = waff.qq('div')
       * var divs = waff.q.all('div')
       * @returns {Element[]} Returns found elements
       */
      var queryAll, queryElement, querySelector;
      querySelector = function(qs, root, single) {
        if (single === true) {
          return [root.querySelector(qs)];
        } else {
          return root.querySelectorAll(qs);
        }
      };
      queryElement = function(qs, root, single) {
        if (/^[A-z0-9*-]+$/.test(qs)) {
          return root.getElementsByTagName(qs);
        } else if (/^#[A-z0-9*-]+$/.test(qs)) {
          return [document.getElementById(qs.slice(1))];
        } else if (/^\.[A-z0-9*-.]+$/.test(qs)) {
          return root.getElementsByClassName((qs.replace(/\./g, ' ')).slice(1));
        } else {
          return querySelector(qs, root, single);
        }
      };
      queryAll = function(qs, root, single) {
        var _arr, arr, attr, c, element, i, j, l, len, len1, len2, len3, o, parsed, pass, q, ref, ref1, ret, s, u, v;
        if (qs == null) {
          qs = 'body';
        }
        if (root == null) {
          root = document;
        }
        if (single == null) {
          single = false;
        }
        if (qs === '') {
          qs = '*';
        }
        if (waff.__isarray(root)) {
          s = this.ps(qs);
          arr = waff.__toarray(root);
          ret = [];
          _arr = [];
          for (j = 0, len = arr.length; j < len; j++) {
            element = arr[j];
            if (element instanceof Element) {
              _arr.push(element);
            }
          }
          arr = _arr;
          _arr = null;
          if (s.tag === '*') {
            if (single === true) {
              return arr[0];
            } else {
              return arr;
            }
          }
          for (l = 0, len1 = arr.length; l < len1; l++) {
            element = arr[l];
            pass = true;
            if (pass === true && s.tag !== false && element.tagName.toLowerCase() !== s.tag.toLowerCase()) {
              pass = false;
            }
            if (pass === true && s.id !== false && element.id !== s.id) {
              pass = false;
            }
            if (pass === true) {
              ref = s["class"];
              for (o = 0, len2 = ref.length; o < len2; o++) {
                c = ref[o];
                if (!element["class"].has(c)) {
                  pass = false;
                }
              }
            }
            if (pass === true && s.attr !== false) {
              ref1 = s.attr;
              for (attr in ref1) {
                parsed = ref1[attr];
                if (pass === true) {
                  switch (parsed.operator) {
                    case false:
                      pass = element.hasAttribute(attr);
                      break;
                    case '=':
                      pass = parsed.value === element.attr(attr);
                      break;
                    case '^=':
                      pass = 0 === waff.__index(element.attr(attr), parsed.value);
                      break;
                    case '$=':
                      v = element.attr(attr);
                      pass = -1 !== v.indexOf(parsed.value, v.length - parsed.value);
                      break;
                    case '~=':
                      pass = -1 !== waff.__index(element.attr(attr).split(' '), parsed.value);
                      break;
                    case '|=':
                      v = element.attr(attr);
                      pass = parsed.value === v;
                      if (pass !== true) {
                        pass = 0 === waff.__index(v, parsed.value + '-');
                      }
                      break;
                    case '*=':
                      pass = -1 !== waff.__index(element.attr(attr), parsed.value);
                  }
                }
              }
            }
            if (pass === true) {
              if (single === true) {
                return element;
              }
              ret.push(element);
            }
          }
          return ret;
        }
        if (qs instanceof Element) {
          return [qs];
        }
        if (waff.__isarray(qs)) {
          arr = waff.__toarray(qs);
          _arr = [];
          for (i = u = 0, len3 = arr.length; u < len3; i = ++u) {
            qs = arr[i];
            if (qs instanceof Element) {
              if (single === true) {
                return qs;
              }
              _arr.push(qs);
            } else {
              q = queryElement(qs, root, single);
              if (single === true) {
                return q[0];
              }
              _arr.push.apply(_arr, q);
            }
          }
          return _arr;
        } else {
          if (single === true) {
            return queryElement(qs, root, single)[0];
          } else {
            return waff.__toarray(queryElement(qs, root, single));
          }
        }
      };
      return queryAll;
    })(),
    q: (function() {

      /**
       * @func waff#query
       * @alias waff#q
       * @desc Query single element
       * @param {String} selector='body' - CSS Selector
       * @param {Element} [root=document] - Element to perform query on
       * @example
       * var body = waff.query('body')
       * var body = waff.q('body')
       * @returns {Element|null} Returns found element or null
       */
      var query;
      query = function(qs, root) {
        return this.qq(qs, root, true) || null;
      };
      return query;
    })(),
    e: (function() {

      /**
       * @func waff#element
       * @alias waff#e
       * @desc Creates element with CSS selector
       * @param {String} selector - CSS Selector
       * @example
       * waff.element('.white-text')
       * @returns {Element} Returns new element
       */
      var create;
      create = function(cs) {
        var attr, c, el, j, len, parsed, ref, ref1, s;
        s = this.ps(cs);
        el = document.createElement(s.tag || 'div');
        if (s.id) {
          el.id = s.id;
        }
        ref = s["class"];
        for (j = 0, len = ref.length; j < len; j++) {
          c = ref[j];
          el["class"].add(c);
        }
        if (s.attr) {
          ref1 = s.attr;
          for (attr in ref1) {
            parsed = ref1[attr];
            if (parsed.operator === '=') {
              el.attr(attr, parsed.value);
            }
          }
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
       * @param {String} str - Text
       * @example
       * var text = waff.text('The number of a waffle')
       * text.set('<div></div>')
       * text.get() // &lt;div&gt;&lt;/div&gt;
       * @returns {TextNode} Returns new TextNode
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
  waff._version = '2.0.0-beta2';
  waff.__isarray = (function() {
    var isarray;
    isarray = function(arr) {
      return arr instanceof Array || arr instanceof NodeList;
    };
    return isarray;
  })();
  waff.__toarray = (function() {
    var toarray;
    toarray = function(arr) {
      var a;
      a = [];
      Array.prototype.push.apply(a, arr);
      return a;
    };
    return toarray;
  })();
  waff.__has = (function() {
    var has;
    has = function(arr, element) {
      var el, i, j, len;
      for (i = j = 0, len = arr.length; j < len; i = ++j) {
        el = arr[i];
        if (el === element) {
          return true;
        }
      }
      return false;
    };
    return has;
  })();
  waff.__index = (function() {
    var index;
    index = function(arr, target) {
      var i, j, len, subject;
      for (i = j = 0, len = arr.length; j < len; i = ++j) {
        subject = arr[i];
        if (subject === target) {
          return i;
        }
      }
      return -1;
    };
    return index;
  })();
  waff.__prop = (function() {
    var defineProp;
    defineProp = function(obj, prop, desc) {
      var err, error;
      try {
        return Object.defineProperty(obj, prop, desc);
      } catch (error) {
        err = error;
        if (desc.get != null) {
          Object.prototype.__defineGetter__.call(obj, prop, desc.get);
        }
        if (desc.set != null) {
          Object.prototype.__defineSetter__.call(obj, prop, desc.set);
        }
        if (desc.value != null) {
          return obj[prop] = desc.value;
        }
      }
    };
    return defineProp;
  })();
  (function() {
    if (!window.console) {
      return window.console = {
        log: function() {},
        warn: function() {},
        error: function() {}
      };
    }
  })();
  (function() {
    window.XMLHttpRequest = window.XMLHttpRequest || function() {
      var _, error, error1, error2, error3;
      try {
        return new XDomainRequest;
      } catch (error) {
        _ = error;
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (error1) {
        _ = error1;
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (error2) {
        _ = error2;
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (error3) {
        _ = error3;
      }
    };
    XMLHttpRequest.UNSENT = 0;
    XMLHttpRequest.OPENED = 1;
    XMLHttpRequest.HEADERS_RECEIVED = 2;
    XMLHttpRequest.LOADING = 3;
    XMLHttpRequest.DONE = 4;
    return (function() {
      var FormData, send;
      FormData = function(form) {
        var element, i, results;
        this._data = [];
        if (!form) {
          return;
        }
        i = 0;
        results = [];
        while (i < form.elements.length) {
          element = form.elements[i];
          if (element.name !== '') {
            this.append(element.name, element.value);
          }
          results.push(++i);
        }
        return results;
      };
      if ('FormData' in window) {
        return;
      }
      FormData.prototype = {
        append: function(name, value) {
          if ('Blob' in window && value instanceof window.Blob) {
            throw TypeError('Blob not supported');
          }
          name = String(name);
          return this._data.push([name, value]);
        },
        toString: function() {
          return this._data.map(function(pair) {
            return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
          }).join('&');
        }
      };
      window.FormData = FormData;
      send = window.XMLHttpRequest.prototype.send;
      return window.XMLHttpRequest.prototype.send = function(body) {
        if (body instanceof FormData) {
          if (this.setRequestHeader != null) {
            this.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          }
          arguments[0] = body.toString();
        }
        return send.apply(this, arguments);
      };
    })();
  })();
  (function() {
    var err, error;
    try {
      return new Event('waff :3');
    } catch (error) {
      err = error;
      return window.Event = function(name, init) {
        var ev;
        if (init == null) {
          init = {};
        }
        ev = document.createEvent('Event');
        ev.initEvent(name, !!init.bubbles, !!init.cancelable);
        return ev;
      };
    }
  })();
  (function() {
    var MutationObserver, _, error;
    try {
      return window.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || (function() {
        throw '-,-';
      })();
    } catch (error) {
      _ = error;
      MutationObserver = (function() {
        function MutationObserver(callback) {
          this.callback = callback;
          this.elements = [];
        }

        MutationObserver.prototype.observe = function(element, init) {
          this.elements.push(element);
          if (init.childList === true) {
            element.on('DOMNodeInserted', (function(_this) {
              return function(e) {
                if (!(e.relatedNode === e.currentTarget || init.subtree === true)) {
                  return;
                }
                return _this.callback([
                  {
                    target: e.relatedNode,
                    type: 'childList',
                    addedNodes: [e.target],
                    removedNodes: []
                  }
                ]);
              };
            })(this));
            element.on('DOMNodeRemoved', (function(_this) {
              return function(e) {
                if (!(e.relatedNode === e.currentTarget || init.subtree === true)) {
                  return;
                }
                return _this.callback([
                  {
                    target: e.relatedNode,
                    type: 'childList',
                    removedNodes: [e.target],
                    addedNodes: []
                  }
                ]);
              };
            })(this));
          }
          if (init.attributes === true) {
            element.on('DOMAttrModified', (function(_this) {
              return function(e) {
                var p;
                if (!(e.target === e.currentTarget || init.subtree === true)) {
                  return;
                }
                p = {
                  target: e.target,
                  type: 'attributes',
                  attributeName: e.attrName
                };
                if (init.attributeOldValue === true) {
                  p.oldValue = e.prevValue;
                }
                return _this.callback([p]);
              };
            })(this));
          }
          if (init.characterData === true) {
            return element.on('DOMCharacterDataModified', (function(_this) {
              return function(e) {
                var p;
                if (!(e.target === e.currentTarget || init.subtree === true)) {
                  return;
                }
                p = {
                  target: e.target,
                  type: 'characterData'
                };
                if (init.characterDataOldValue === true) {
                  p.oldValue = e.prevValue;
                }
                return _this.callback([p]);
              };
            })(this));
          }
        };

        MutationObserver.prototype.disconnect = function() {
          var element, j, len, ref, results;
          ref = this.elements;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            element = ref[j];
            element.off('DOMNodeInserted');
            element.off('DOMNodeRemoved');
            element.off('DOMAttrModified');
            results.push(element.off('DOMCharacterDataModified'));
          }
          return results;
        };

        return MutationObserver;

      })();
      return window.MutationObserver = MutationObserver;
    }
  })();
  waff._EventTargets = (function() {
    var error, targets;
    try {
      EventTarget.prototype.waff = ':3';
      if (EventTarget.prototype.waff !== Element.prototype.waff) {
        throw '';
      }
      return [EventTarget];
    } catch (error) {
      targets = [Element, Document, Node, FormData, window.constructor];
      if ('XMLHttpRequest' in window) {
        targets.push(window.XMLHttpRequest);
      }
      if ('FileReader' in window) {
        targets.push(window.FileReader);
      }
      if ('Blob' in window) {
        targets.push(window.Blob);
      }
      return targets;
    }
  })();
  waff._EventEmitter = (function() {
    var EventEmitter;
    EventEmitter = (function() {

      /**
       * @class waff#EventEmitter
       * @classdesc Own implementation of EventEmitter. (untested)
       * @example
       * var ee = new waff.EventEmitter();
       */
      function EventEmitter() {
        this._emitter = waff.e();
      }


      /**
       * @function waff#EventEmitter#on
       * @desc Adds handler for event
       * @param {String|Array<String>} event - Name of event
       * @param {Function} handler - Handler function
       * @param {Boolean} [capture] - Use capture
       * @returns {waff#EventEmitter} instance
       * @example
       * var ee = new waff.EventEmitter();
       * // Single event binding
       * ee.on('event-name', function(data){})
       * // Multi event binding
       * ee.on(['event-name', 'event-name2'], function(data){})
       */

      EventEmitter.prototype.on = function(event, handler, capture) {
        return this._emitter.on.call({
          emitter: this._emitter,
          obj: this
        }, event, handler, capture);
      };


      /**
       * @function waff#EventEmitter#once
       * @desc Adds handler only for one event emit
       * @param {String|Array<String>} event - Name of event
       * @param {Function} handler - Handler function
       * @param {Boolean} [capture] - Use capture
       * @returns {waff#EventEmitter} instance
       * @example
       * var ee = new waff.EventEmitter();
       * // Single event binding
       * ee.once('event-name', function(data){})
       * // Multi event binding
       * ee.once(['event-name', 'event-name2'], function(data){})
       */

      EventEmitter.prototype.once = function(event, handler, capture) {
        return this._emitter.once.call({
          emitter: this._emitter,
          obj: this
        }, event, handler, capture);
      };


      /**
       * @function waff#EventEmitter#off
       * @desc Removes specific event handler
       * @param {String|Array<String>} event - Name of event
       * @param {Function} [handler] - Handler function
       * @param {Boolean} [capture] - Use capture
       * @returns {waff#EventEmitter} instance
       * @example
       * var ee = new waff.EventEmitter();
       * // Single event unbinding for a specific handler
       * ee.off('event-name', function(){})
       * // Multi event unbinding for a specific handler
       * ee.off(['event-name', 'event-name2'], function(){})
       * // Unbinding all handlers for event
       * ee.off('event-name')
       */

      EventEmitter.prototype.off = function(event, handler, capture) {
        return this._emitter.off.call({
          emitter: this._emitter,
          obj: this
        }, event, handler, capture);
      };


      /**
       * @function waff#EventEmitter#emit
       * @desc Emits event
       * @param {String} event - Name of event
       * @param {Object} [data] - Data to pass
       * @returns {waff#EventEmitter} instance
       * @example
       * var ee = new waff.EventEmitter();
       * // Emitting event
       * ee.emit('event-name')
       * // Emitting event with data
       * ee.emit('event-name', {my: 'data'})
       */

      EventEmitter.prototype.emit = function(event, data) {
        return this._emitter.emit.call({
          emitter: this._emitter,
          obj: this
        }, event, data);
      };

      EventEmitter.prototype.dispatchEvent = function(event, handler, capture) {
        return this._emitter.dispatchEvent.call(this._emitter, event, handler, capture);
      };

      return EventEmitter;

    })();

    /**
     * @function waff#EventEmitter.extend
     * @static
     * @desc Extends events on object
     * @param {Object} object - Object to extend
     * @returns object
     * @example
     * var obj = {};
     * EventEmitter.extend(obj);
     * obj.emit('event!')
     */
    EventEmitter.extend = function(object) {
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
    return EventEmitter;
  })();
  waff._Promise = (function() {
    var Promise;
    Promise = (function(superClass) {
      extend(Promise, superClass);


      /**
       * @class waff#Promise
       * @extends waff#EventEmitter
       * @classdesc Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.
       * @param {Function} executor - Executor function
       * @fires fulfill
       * @fires reject
       */

      function Promise(executor) {
        Promise.__super__.constructor.call(this);
        this._then = [];
        this._catch = [];
        executor(this._resolve(this), this._reject(this));
      }


      /**
       * @function waff#Promise#then
       * @desc Adds handler when fulfilled or rejected
       * @param {Function} onFulfill - Fulfiull function
       * @param {Function} [onReject] - Reject function
       * @returns {waff#Promise} instance
       * @example
       * var promise = new waff.Promise(function(){})
       * promise.then(function(){
       *
       * })
       */

      Promise.prototype.then = function(handler, errHandler) {
        this._then.push(handler);
        if (errHandler != null) {
          this._catch.push(errHandler);
        }
        return this;
      };


      /**
       * @function waff#Promise#catch
       * @desc Adds handler when rejected
       * @param {Function} onReject - Reject function
       * @returns {waff#Promise} instance
       * @example
       * var promise = new waff.Promise(function(){})
       * promise.catch(function(){
       *
       * })
       */

      Promise.prototype["catch"] = function(handler) {
        this._catch.push(handler);
        return this;
      };

      Promise.prototype._resolve = function(self) {
        return function() {

          /**
           * @event waff#Promise#fulfill
           * @desc Event emitted on fulfill
           * @example
           * var promise = new waff.Promise(function(){})
           * promise.on('fulfill', function(){
           *  // same as promise.then
           * })
           */
          var handler, j, len, ref, results;
          self.emit('fulfill', arguments);
          ref = self._then;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            handler = ref[j];
            results.push(handler.apply(this, arguments));
          }
          return results;
        };
      };


      /**
       * @function waff#Promise#resolve
       * @desc Resolves promise
       * @param {*} ..arg - Arguments to pass
       * @returns {waff#Promise} instance
       * @example
       * var promise = new waff.Promise(function(){})
       * promise.resolve()
       */

      Promise.prototype.resolve = function() {
        this._resolve(this).apply(this, arguments);
        return this;
      };

      Promise.prototype._reject = function(self) {
        return function() {

          /**
           * @event waff#Promise#reject
           * @desc Event emitted on reject
           * @example
           * var promise = new waff.Promise(function(){})
           * promise.on('reject', function(){
           *  // same as promise.catch
           * })
           */
          var handler, j, len, ref, results;
          self.emit('reject', arguments);
          ref = self._catch;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            handler = ref[j];
            results.push(handler.apply(this, arguments));
          }
          return results;
        };
      };


      /**
       * @function waff#Promise#reject
       * @desc Rejects promise
       * @param {*} ..arg - Arguments to pass
       * @returns {waff#Promise} instance
       * @example
       * var promise = new waff.Promise(function(){})
       * promise.reject()
       */

      Promise.prototype.reject = function() {
        return this._reject(this).apply(this, arguments);
      };

      return Promise;

    })(waff._EventEmitter);
    return Promise;
  })();
  waff._get = (function() {

    /**
     * @func waff#get
     * @desc Performs XHR GET
     * @param {String} url - URL to get
     * @param {Object} options - Options object
     * @param {Boolean} options.json=false - Determines if response is json
     * @param {Boolean} options.timeout=2000 - Determines timeout in ms
     * @example
     * waff.get('https://wvffle.net')
     *   .then(function(res){
     *
     *   })
     *   .catch(function(err){
     *
     *   })
     * @returns {waff#Promise} Returns promise of request
     */
    var get;
    get = function(url, options) {
      if (options == null) {
        options = {};
      }
      return new waff._Promise(function(f, r) {
        var err, error, req;
        try {
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
            return r.call(req, req.res);
          });
          req.on('timeout', function(e) {
            req.res = {
              status: req.status,
              error: req.statusText
            };
            return r.call(req, req.res);
          });
          try {
            req.overrideMimeType('text/plain');
          } catch (undefined) {}
          return req.send();
        } catch (error) {
          err = error;
          if (-1 === err.message.indexOf('Access is denied.')) {
            throw err;
          }
          return console.error('IE<11 does not handle xhr well');
        }
      });
    };
    return get;
  })();
  waff._post = (function() {

    /**
     * @func waff#post
     * @desc Performs XHR POST
     * @param {String} url - URL to post
     * @param {Object} data={} - POST data
     * @param {Object} options - Options object
     * @param {Boolean} options.json=false - Determines if response is json
     * @param {Boolean} options.form=true - Determines if data should be converted to FormData or just pure json
     * @param {Boolean} options.timeout=2000 - Determines timeout in ms
     * @example
     * waff.post('http://httpbin.org/post', { waffle_id: 666 })
     *   .then(function(res){
     *
     *   })
     *   .catch(function(err){
     *
     *   })
     * @returns {waff#Promise} Returns promise of request
     */
    var post;
    post = function(url, data, options) {
      var err, error;
      if (data == null) {
        data = {};
      }
      if (options == null) {
        options = {};
      }
      try {
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
            return r.call(req, req.res);
          });
          req.on('timeout', function(e) {
            req.res = {
              status: req.status,
              error: req.statusText
            };
            return r.call(req, req.res);
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
      } catch (error) {
        err = error;
        if (-1 === err.message.indexOf('Access is denied.')) {
          throw err;
        }
        return console.error('IE<11 does not handle xhr well');
      }
    };
    return post;
  })();

  /**
   * @class Element
   * @global
   */

  /**
   * @function
   * @name Element#query
   * @desc Query single element
   * @param {String} selector='body' - CSS Selector
   * @example
   * var nav = document.body.query('nav')
   * @returns {Element|null} Returns found element or null
   */
  Element.prototype.q = function(qs) {
    return waff.q(qs, this);
  };

  /**
   * @function
   * @name Element#query.all
   * @desc Query single element
   * @param {String} selector='body' - CSS Selector
   * @example
   * var divs = document.body.query.all('div')
   * @returns {Element[]} Returns found elements
   */
  Element.prototype.qq = function(qs) {
    return waff.qq(qs, this);
  };
  Element.prototype.query = Element.prototype.q;
  Element.prototype.query.all = Element.prototype.qq;
  Element.prototype.q.all = Element.prototype.qq;
  Array.prototype.q = function(qs) {
    return waff.q(qs, this);
  };
  Array.prototype.qq = function(qs) {
    return waff.qq(qs, this);
  };
  Array.prototype.query = Array.prototype.q;
  Array.prototype.query.all = Array.prototype.qq;
  Array.prototype.q.all = Array.prototype.qq;

  /**
   * @function
   * @typicalname Element#append
   * @desc Adds element at the end
   * @param {Element|Element[]} ...element - Element to append
   * @example
   * var span = waff.element('span.red')
   * var body = waff.query('body')
   * body.append(span)
   * // body
   * //   <content>
   * //   span.red
   *
   * var span = waff.element('span.orange')
   * var span2 = waff.element('span.red')
   * var body = waff.query('body')
   * body.append(span, span2)
   * // body
   * //   <content>
   * //   span.orange
   * //   span.red
   *
   * var span = waff.element('span.orange')
   * var span2 = waff.element('span.red')
   * var body = waff.query('body')
   * body.append([span, span2])
   * // body
   * //   <content>
   * //   span.orange
   * //   span.red
   */
  Element.prototype.append = function() {
    var el, element, j, l, len, len1, ref;
    for (j = 0, len = arguments.length; j < len; j++) {
      element = arguments[j];
      if (waff.__isarray(element)) {
        ref = waff.__toarray(element);
        for (l = 0, len1 = ref.length; l < len1; l++) {
          el = ref[l];
          this.appendChild(element);
        }
      } else {
        this.appendChild(element);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#prepend
   * @desc Adds element at the beginning
   * @param {Element|Element[]} ...element - Element to prepend
   * @example
   * var span = waff.element('span.red')
   * var body = waff.query('body')
   * body.prepend(span)
   * // body
   * //   span.red
   * //   <content>
   *
   * var span = waff.element('span.orange')
   * var span2 = waff.element('span.red')
   * var body = waff.query('body')
   * body.prepend(span, span2)
   * // body
   * //   span.orange
   * //   span.red
   * //   <content>
   *
   * var span = waff.element('span.orange')
   * var span2 = waff.element('span.red')
   * var body = waff.query('body')
   * body.prepend([span, span2])
   * // body
   * //   span.orange
   * //   span.red
   * //   <content>
   */
  Element.prototype.prepend = function() {
    var el, element, j, l, ref;
    for (j = arguments.length - 1; j >= 0; j += -1) {
      element = arguments[j];
      if (waff.__isarray(element)) {
        ref = waff.__toarray(element);
        for (l = ref.length - 1; l >= 0; l += -1) {
          el = ref[l];
          if (this.firstChild != null) {
            this.insertBefore(el, this.firstChild);
          } else {
            this.append(el);
          }
        }
      } else {
        if (this.firstChild != null) {
          this.insertBefore(element, this.firstChild);
        } else {
          this.append(element);
        }
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#before
   * @desc Adds element before
   * @param {Element} element - Next element
   * @example
   * var span = waff.element('span.red')
   * var div = waff.element('div')
   * waff.query('body').append(span)
   * div.before(span)
   * // body
   * //   div
   * //   span.red
   */
  Element.prototype.before = function(element) {
    if (element.parent != null) {
      element.parent.insertBefore(this, element);
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#after
   * @desc Adds element after
   * @param {Element} element - Previous element
   * @example
   * var span = waff.element('span.red')
   * var div = waff.element('div')
   * waff.query('body').append(span)
   * div.after(span)
   * // body
   * //   span.red
   * //   div
   */
  Element.prototype.after = function(element) {
    if (element.parent != null) {
      if (element.nextSibling != null) {
        element.parent.insertBefore(this, element.nextSibling);
      } else {
        element.parent.append(this);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#text
   * @desc Sets text of Element to the given string or returns text string
   * @param {String} [text] - Text to set
   * @example
   * var span = waff.element('span')
   * span.text('<div></div>')
   * span.text() // <div></div> as a string
   */
  Element.prototype.text = function(text) {
    var _text, content, e, j, len, ref, t;
    if (text == null) {
      return this.textContent;
    }
    content = !(this.childNodes.length === 1 && this.childNodes[0] instanceof Text);
    if (content) {
      this.clear();
    }
    if (waff.__isarray(text)) {
      _text = '';
      ref = waff.__toarray(text);
      for (j = 0, len = ref.length; j < len; j++) {
        t = ref[j];
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
      if (!content) {
        return this.childNodes[0].set(_text);
      } else {
        e = waff.t(_text);
        this.append(e);
        return e;
      }
    }
    if (text instanceof Text) {
      text = text.get();
    }
    if (!content) {
      return this.childNodes[0].set(text);
    } else {
      e = waff.t(text);
      this.append(e);
      return e;
    }
  };
  Array.prototype.text = function() {
    var element, j, len;
    for (j = 0, len = this.length; j < len; j++) {
      element = this[j];
      if (element instanceof Element) {
        element.text.apply(element, arguments);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#html
   * @desc Sets text of Element to the given string or returns html string
   * @param {String} [html] - Html string to set
   * @example
   * var span = waff.element('span')
   * span.html('<div></div>')
   * span.html() // <div></div> as a string
   */
  Element.prototype.html = function(html) {
    var arr, h, j, len;
    if (html == null) {
      return this.innerHTML;
    }
    this.clear();
    if (html instanceof Element) {
      this.append(html);
      return this;
    }
    if (html instanceof NodeList || waff.__isarray(html)) {
      arr = waff.__toarray(html);
      for (j = 0, len = arr.length; j < len; j++) {
        h = arr[j];
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
  Array.prototype.html = function() {
    var element, j, len;
    for (j = 0, len = this.length; j < len; j++) {
      element = this[j];
      if (element instanceof Element) {
        element.html.apply(element, arguments);
      }
    }
    return this;
  };
  waff.__prop(Element.prototype, 'path', {
    configurable: true,

    /**
     * @function Element#path
     * @typicalname Element#path
     * @desc Get unique path of an element
     * @example
     * waff.query('body').path // html > body:nth-child(2)
     */
    get: function() {
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
    },
    set: function() {
      return this;
    }
  });

  /**
   * @function
   * @typicalname Element#css
   * @desc Gets or sets  elements CSS
   * @param {String|Object} attr - Attribute name or object with values
   * @param {String} [value] - Attribute value
   * @example
   * // Object containing all properties
   * waff.element('body').css()
   *
   * // Only `background-color`
   * waff.element('body').css('background-color')
   *
   * // sets `background-color` to #f00
   * waff.element('body').css('background-color', '#f00')
   *
   * // sets `background-color` to #f00 and `color` to #ffa500
   * // (supports camelcase and kebabcase)
   * waff.element('body').css({backgroundColor: '#f00', 'color', '#ffa500'})
   */
  Element.prototype.css = function(css, values) {
    var camel, j, kebab, knownProps, len, prop, props, res, rule, style, text, trbl;
    camel = function(str) {
      return str.replace(/(\-[a-z])/g, function(m) {
        return m.toUpperCase().slice(1);
      });
    };
    kebab = function(str) {
      return str.replace(/([A-Z])/g, function(m) {
        return "-" + m.toLowerCase();
      });
    };
    trbl = function(prop, suf) {
      if (suf == null) {
        suf = '';
      }
      prop = camel(prop);
      return [prop + suf, prop + 'Top' + suf, prop + 'Bottom' + suf, prop + 'Left' + suf, prop + 'Right' + suf];
    };
    knownProps = ['width', 'height', 'lineHeight', 'fontSize', 'textIndent', 'top', 'left', 'right', 'bottom', 'wordSpacing'];
    [].push.apply(knownProps, trbl('margin'));
    [].push.apply(knownProps, trbl('padding'));
    [].push.apply(knownProps, trbl('border', 'Width'));
    if (typeof css === 'string') {
      if (values == null) {
        return this.css()[camel(css)] || this.css()[kebab(css)];
      }
      this.style[camel(css)] = values;
    }
    if (typeof css === 'object') {
      for (prop in css) {
        style = css[prop];
        prop = camel(prop);
        if (!((isNaN(+style)) || -1 === waff.__index(knownProps, prop))) {
          style += 'px';
        }
        this.style[prop] = style;
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
      if (res.color === void 0) {
        text = res.cssText;
        res = {};
        props = text.split(';');
        for (j = 0, len = props.length; j < len; j++) {
          prop = props[j];
          rule = prop.split(':');
          if (rule[1] !== void 0) {
            res[rule[0].replace(/^\s+|\s+$/, '')] = rule[1].replace(/^\s+|\s+$/, '');
          }
        }
      }
    }
    return res;
  };
  Array.prototype.css = function() {
    var element, j, len;
    for (j = 0, len = this.length; j < len; j++) {
      element = this[j];
      if (element instanceof Element) {
        element.css.apply(element, arguments);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#attr
   * @desc Gets or sets attributes of element
   * @param {String|Object} attr - Attribute name or object with values
   * @param {String} [value] - Attribute value
   * @example
   * var span = waff.element('span.red')
   * span.attr('name', 'waffles!')
   * span.attr({'name': 'waffles!', 'sth': true})
   */
  Element.prototype.attr = function(attr, value) {
    var attrs, j, key, len, res, val;
    if (typeof attr === 'object') {
      for (key in attr) {
        val = attr[key];
        this.attr(key, val);
      }
      return this;
    } else if (attr == null) {
      attrs = waff.__toarray(this.attributes);
      res = {};
      for (j = 0, len = attrs.length; j < len; j++) {
        attr = attrs[j];
        res[attr.nodeName] = attr.value;
      }
      return res;
    } else {
      if (value != null) {
        this.setAttribute(attr, value);
      } else if (value === null) {
        this.removeAttribute(attr);
      } else {
        return this.attr()[attr];
      }
    }
    return this;
  };
  Array.prototype.attr = function() {
    var element, j, len;
    for (j = 0, len = this.length; j < len; j++) {
      element = this[j];
      if (element instanceof Element) {
        element.attr.apply(element, arguments);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#clear
   * @desc Clears element content
   * @example
   * waff.query('body').clear()
   */
  Element.prototype.clear = function() {
    while (this.childNodes.length > 0) {
      this.removeChild(this.firstChild);
    }
    return this;
  };
  Array.prototype.clear = function() {
    var element, j, len;
    for (j = 0, len = this.length; j < len; j++) {
      element = this[j];
      if (element instanceof Element) {
        element.clear.apply(element, arguments);
      }
    }
    return this;
  };
  opts = {
    configurable: true,

    /**
     * @function Element#classes
     * @instance
     * @typicalname Element#classese
     * @desc custom class list
     */
    get: function() {
      var cn;
      cn = this.className.split(' ');
      return {
        target: this,

        /**
         * @function Element#classes#has
         * @desc Checks if element has class or classes
         * @returns Boolean
         * @param {String|Array} class - class to check
         * @param {String} [...class] - classes to check
         * @example
         * waff.query('body').class.has('cls')
         * waff.query('body').class.has('cls', 'cls2')
         * waff.query('body').class.has(['cls', 'cls2'])
         */
        has: function(c) {
          var cl, cl2, j, l, len, len1, ref;
          for (j = 0, len = arguments.length; j < len; j++) {
            cl = arguments[j];
            if (typeof cl === 'string') {
              if (!waff.__has(cn, cl)) {
                return false;
              }
            } else {
              ref = waff.__toarray(cl);
              for (l = 0, len1 = ref.length; l < len1; l++) {
                cl2 = ref[l];
                if (!this.has(cn, cl2)) {
                  return false;
                }
              }
            }
          }
          return true;
        },

        /**
         * @function Element#classes#add
         * @desc Adds class or classes
         * @param {String|Array} class - class to add
         * @param {String} [...class] - classes to add
         * @returns {Element#classes} instance
         * @example
         * waff.query('body').class.add('cls')
         * waff.query('body').class.add('cls', 'cls2')
         * waff.query('body').class.add(['cls', 'cls2'])
         */
        add: function(c) {
          var cl, cl2, j, l, len, len1, ref;
          for (j = 0, len = arguments.length; j < len; j++) {
            cl = arguments[j];
            if (typeof cl === 'string') {
              if (!(cl === '' || waff.__has(cn, cl))) {
                cn.push(cl);
                c = cn.join(' ');
                while (c[0] === ' ') {
                  c = c.slice(1);
                }
                this.target.className = c;
              }
            } else {
              ref = waff.__toarray(cl);
              for (l = 0, len1 = ref.length; l < len1; l++) {
                cl2 = ref[l];
                if (!(cl2 === '' || waff.__has(cn, cl2))) {
                  cn.push(cl2);
                  c = cn.join(' ');
                  while (c[0] === ' ') {
                    c = c.slice(1);
                  }
                  this.target.className = c;
                }
              }
            }
          }
          return this;
        },

        /**
         * @function Element#classes#remove
         * @desc Removes class or classes
         * @param {String|Array} class - class to remove
         * @param {String} [...class] - classes to remove
         * @returns {Element#classes} instance
         * @example
         * waff.query('body').class.remove('cls')
         * waff.query('body').class.remove('cls', 'cls2')
         * waff.query('body').class.remove(['cls', 'cls2'])
         */
        remove: function(c) {
          var cl, cl2, i, j, l, len, len1, ref;
          for (j = 0, len = arguments.length; j < len; j++) {
            cl = arguments[j];
            if (typeof cl === 'string') {
              if (cl !== '' && waff.__has(cn, cl)) {
                while (-1 !== (i = waff.__index(cn, cl))) {
                  cn.splice(i, 1);
                  c = cn.join(' ');
                  while (c[0] === ' ') {
                    c = c.slice(1);
                  }
                }
                this.target.className = c;
              }
            } else {
              ref = waff.__toarray(cl);
              for (l = 0, len1 = ref.length; l < len1; l++) {
                cl2 = ref[l];
                if (cl !== '' && waff.__has(cn, cl2)) {
                  while (-1 !== (i = waff.__index(cn, cl2))) {
                    cn.splice(i, 1);
                    c = cn.join(' ');
                    while (c[0] === ' ') {
                      c = c.slice(1);
                    }
                  }
                  this.target.className = c;
                }
              }
            }
          }
          return this;
        },

        /**
         * @function Element#classes#toggle
         * @desc Toggles class or classes
         * @param {String|Array} class - class to toggle
         * @param {String} [...class] - classes to toggle
         * @returns {Element#classes} instance
         * @example
         * waff.query('body').class.toggle('cls')
         * waff.query('body').class.toggle('cls', 'cls2')
         * waff.query('body').class.toggle(['cls', 'cls2'])
         */
        toggle: function(c) {
          var cl, cl2, j, len, results;
          results = [];
          for (j = 0, len = arguments.length; j < len; j++) {
            cl = arguments[j];
            if (typeof cl === 'string') {
              if (waff.__has(cn, cl)) {
                results.push(this.remove(cl));
              } else {
                results.push(this.add(cl));
              }
            } else {
              results.push((function() {
                var l, len1, ref, results1;
                ref = waff.__toarray(cl);
                results1 = [];
                for (l = 0, len1 = ref.length; l < len1; l++) {
                  cl2 = ref[l];
                  if (waff.__has(cn, cl2)) {
                    results1.push(this.remove(cl2));
                  } else {
                    results1.push(this.add(cl2));
                  }
                }
                return results1;
              }).call(this));
            }
          }
          return results;
        }
      };
    },
    set: function(c) {
      var cl, j, len, results;
      results = [];
      for (j = 0, len = arguments.length; j < len; j++) {
        cl = arguments[j];
        if (typeof cl === 'string') {
          results.push(this.className = cl);
        } else if (waff.__isarray(cl)) {
          results.push(this.className = (waff.__toarray(cl)).join(' '));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };
  waff.__prop(Element.prototype, 'class', opts);
  waff.__prop(Element.prototype, 'classes', opts);
  arropts = {
    configurable: true,
    get: function() {
      return {
        add: function() {
          var el, element, j, len, results;
          results = [];
          for (j = 0, len = this.length; j < len; j++) {
            element = this[j];
            if (waff.__isarray(element)) {
              results.push((function() {
                var l, len1, results1;
                results1 = [];
                for (l = 0, len1 = element.length; l < len1; l++) {
                  el = element[l];
                  results1.push(el["class"].add.apply(el, arguments));
                }
                return results1;
              }).apply(this, arguments));
            } else {
              results.push(element["class"].add.apply(element, arguments));
            }
          }
          return results;
        },
        remove: function() {
          var el, element, j, len, results;
          results = [];
          for (j = 0, len = this.length; j < len; j++) {
            element = this[j];
            if (waff.__isarray(element)) {
              results.push((function() {
                var l, len1, results1;
                results1 = [];
                for (l = 0, len1 = element.length; l < len1; l++) {
                  el = element[l];
                  results1.push(el["class"].remove.apply(el, arguments));
                }
                return results1;
              }).apply(this, arguments));
            } else {
              results.push(element["class"].remove.apply(element, arguments));
            }
          }
          return results;
        },
        toggle: function() {
          var el, element, j, len, results;
          results = [];
          for (j = 0, len = this.length; j < len; j++) {
            element = this[j];
            if (waff.__isarray(element)) {
              results.push((function() {
                var l, len1, results1;
                results1 = [];
                for (l = 0, len1 = element.length; l < len1; l++) {
                  el = element[l];
                  results1.push(el["class"].toggle.apply(el, arguments));
                }
                return results1;
              }).apply(this, arguments));
            } else {
              results.push(element["class"].toggle.apply(element, arguments));
            }
          }
          return results;
        }
      };
    },
    set: function() {
      var el, element, j, len, results;
      results = [];
      for (j = 0, len = this.length; j < len; j++) {
        element = this[j];
        if (waff.__isarray(element)) {
          results.push((function() {
            var l, len1, results1;
            results1 = [];
            for (l = 0, len1 = element.length; l < len1; l++) {
              el = element[l];
              results1.push(el["class"] = arguments);
            }
            return results1;
          }).apply(this, arguments));
        } else {
          results.push(element["class"] = arguments);
        }
      }
      return results;
    }
  };
  waff.__prop(Array.prototype, 'class', arropts);
  waff.__prop(Array.prototype, 'classes', arropts);

  /**
   * @function Element#watch
   * @typicalname Element#watch
   * @desc Observes for DOM changes
   * @param {MutationObserverInit} [options={ attributes: true, childList: true, characterData: true, attributeOldValue: true, characterDataOldValue: true, subtree: false }] - MutationObserver options
   * @fires attr:*
   * @fires attr change
   * @fires child add
   * @fires child remove
   * @fires text change
   * @example
   * var element = waff.query('span.red')
   * element.watch()
   */
  Node.prototype.watch = function(options) {
    var config;
    if (this._observer == null) {
      this._observer = new MutationObserver((function(_this) {
        return function(mutations) {
          var event, j, knownattrs, len, m;
          for (j = 0, len = mutations.length; j < len; j++) {
            m = mutations[j];
            if (m.type === 'attributes') {
              knownattrs = ['class', 'id', 'style', 'href', 'src'];
              event = {
                target: m.target,
                attr: m.attributeName,
                oldValue: m.oldValue,
                value: m.target.attr(m.attributeName)
              };
              if (-1 !== waff.__index(knownattrs, m.attributeName)) {
                _this.emit(m.attributeName + ' change', event);
              }

              /**
               * @event Element#watch.attr change
               * @desc Event emitted on attribute change
               * @example
               * element.on('attr change', function(e){
               *  // e.target
               *  // e.attr
               *  // e.value
               *  // e.oldValue
               * })
               */
              _this.emit('attr change', event);
              _this.emit('attr:*', event);

              /**
               * @event Element#watch.attr:*
               * @desc Event emitted on specific attribute change
               * @example
               * element.on('attr:class', function(e){
               *  // e.target
               *  // e.attr
               *  // e.value
               *  // e.oldValue
               * })
               */
              _this.emit('attr:' + m.attributeName, event);
            } else if (m.type === 'childList') {
              if (m.addedNodes.length > 0) {

                /**
                 * @event Element#watch.child add
                 * @desc Event emitted on child addition
                 * @example
                 * element.on('child add', function(e){
                 *  // e.target
                 *  // e.nodes
                 * })
                 */
                _this.emit('child add', {
                  target: m.target,
                  nodes: waff.__toarray(m.addedNodes)
                });
              }
              if (m.removedNodes.length > 0) {

                /**
                 * @event Element#watch.child remove
                 * @desc Event emitted on child remove
                 * @example
                 * element.on('child remove', function(e){
                 *  // e.target
                 *  // e.nodes
                 * })
                 */
                _this.emit('child remove', {
                  target: m.target,
                  nodes: waff.__toarray(m.removedNodes)
                });
              }
            } else if (m.type === 'characterData') {

              /**
               * @event Element#watch.text change
               * @desc Event emitted on text change
               * @example
               * element.on('text change', function(e){
               *  // e.target
               *  // e.value
               *  // e.oldValue
               * })
               */
              _this.emit('text change', {
                target: m.target,
                oldValue: m.oldValue,
                value: m.target.get()
              });
            }
          }
          return _this;
        };
      })(this));
      config = {
        attributes: true,
        childList: true,
        characterData: true,
        attributeOldValue: true,
        characterDataOldValue: true,
        subtree: false
      };
      this._observer.observe(this, config);
    }
    return this;
  };
  Array.prototype.watch = function() {
    var element, j, len;
    for (j = 0, len = this.length; j < len; j++) {
      element = this[j];
      if (element instanceof Element) {
        element.watch.apply(element, arguments);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#unwatch
   * @desc Stops observing for DOM changes
   * @example
   * var element = waff.query('span.red')
   * element.watch()
   * element.unwatch()
   */
  Element.prototype.unwatch = function() {
    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    }
    return this;
  };
  Array.prototype.unwatch = function() {
    var element, j, len;
    for (j = 0, len = this.length; j < len; j++) {
      element = this[j];
      if (element instanceof Element) {
        element.unwatch.apply(element, arguments);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element#parent
   * @desc Get parent element
   * @example
   * waff.query('body').parent() // html
   */
  waff.__prop(Element.prototype, 'parent', {
    configurable: true,
    get: function() {
      if (this.parentNode instanceof Element) {
        return this.parentNode;
      }
      return this.parentElement;
    },
    set: function(parent) {
      if (parent instanceof Element) {
        parent.append(this);
      }
      return this;
    }
  });

  /**
   * @function
   * @typicalname Element#clone
   * @desc Clones element
   * @param {Boolean} [deep=false] - Deep clone
   * @example
   * waff.query('body').clone()
   */
  Element.prototype.clone = function(deep) {
    var clone;
    if (deep == null) {
      deep = false;
    }
    clone = this.cloneNode(deep);
    clone.original = this;
    return clone;
  };
  waff.__prop(Element.prototype, 'selector', {
    configurable: true,

    /**
     * @function Element#selector
     * @typicalname Element#selector
     * @desc Get selector of an element
     * @example
     * waff.query('body').selector // body
     */
    get: function() {
      var c, j, k, len, ref, ref1, sel, tn, v;
      tn = this.tagName.toLowerCase();
      sel = tn === 'div' ? '' : tn;
      if (this.id != null) {
        sel += this.id;
      }
      ref = this.className.split(' ');
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        if (c !== '') {
          sel += '.' + c;
        }
      }
      ref1 = this.attr();
      for (k in ref1) {
        v = ref1[k];
        if (k !== 'id' && k !== 'class') {
          if (v != null) {
            sel += "[" + k + "=\"" + v + "\"]";
          } else {
            sel += "[" + k + "]";
          }
        }
      }
      return sel;
    },
    set: function() {
      return this;
    }
  });
  ref = waff._EventTargets;
  for (j = 0, len = ref.length; j < len; j++) {
    Target = ref[j];
    Target.prototype.on = function(name, next, capture) {
      var _this, event, l, len1, listen, self;
      listen = function() {
        var args, el, ev;
        args = waff.__toarray(arguments);
        el = args.shift();
        ev = args.shift();
        if (el.addEventListener != null) {
          args.unshift(ev);
          return el.addEventListener.apply(el, args);
        } else {
          args.unshift('on' + ev);
          return el.attachEvent.apply(el, args);
        }
      };
      if (!waff.__isarray(name)) {
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
      for (l = 0, len1 = name.length; l < len1; l++) {
        event = name[l];
        if (self._events[event] == null) {
          self._events[event] = [];
        }
        self._events[event].push(next);
        if (self._eventsInited[event] !== true) {
          listen(self, event, (function(ev) {
            var handler, len2, o, ref1, results;
            if (ev.waffData != null) {
              ev = ev.waffData;
            }
            ref1 = self._events[event];
            results = [];
            for (o = 0, len2 = ref1.length; o < len2; o++) {
              handler = ref1[o];
              results.push(handler.call(_this, ev));
            }
            return results;
          }), capture);
        }
        self._eventsInited[event] = true;
      }
      return self;
    };
  }
  ref1 = waff._EventTargets;
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    Target = ref1[l];
    Target.prototype.off = function(name, next, capture) {
      var detach, event, len2, o, self;
      if (!waff.__isarray(name)) {
        name = [name];
      }
      self = this.emitter != null ? this.emitter : this;
      if (self._events == null) {
        self._events = {};
      }
      for (o = 0, len2 = name.length; o < len2; o++) {
        event = name[o];
        if (self._events[event] == null) {
          self._events[event] = [];
        }
        if (next == null) {
          self._events[event] = [];
        }
        detach = (function(_this) {
          return function(next) {
            var index;
            index = waff.__index(self._events[event], next);
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
  }
  ref2 = waff._EventTargets;
  for (o = 0, len2 = ref2.length; o < len2; o++) {
    Target = ref2[o];
    Target.prototype.once = function(name, next, capture) {
      var _this, event, fn, len3, self, u;
      if (!waff.__isarray(name)) {
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
      for (u = 0, len3 = name.length; u < len3; u++) {
        event = name[u];
        fn(event);
      }
      return self;
    };
  }
  ref3 = waff._EventTargets;
  for (u = 0, len3 = ref3.length; u < len3; u++) {
    Target = ref3[u];
    Target.prototype.emit = function(event, data) {
      var _this, dispatch, self;
      dispatch = function() {
        var args, el, ev;
        args = waff.__toarray(arguments);
        el = args.shift();
        ev = args.shift();
        if (el.dispatchEvent != null) {
          args.unshift(ev);
          return el.dispatchEvent.apply(el, args);
        } else {
          args.unshift('on' + ev);
          return el.fireEvent.apply(el, args);
        }
      };
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
      return dispatch(self, event);
    };
  }

  /**
   * @class Text
   * @global
   */

  /**
   * @function
   * @typicalname Text#set
   * @desc Sets nodeValue
   * @example
   * var text = waff.text('The number of a waffle')
   * text.set('666')
   * text.get() // 666 as a string
   */
  Text.prototype.set = function(text) {
    this.nodeValue = text;
    return this;
  };

  /**
   * @function
   * @typicalname Text#get
   * @desc Gets nodeValue
   * @example
   * var text = waff.text('The number of a waffle')
   * text.get() // The number of a waffle
   */
  Text.prototype.get = function() {
    return this.nodeValue;
  };
  return waff;
})());
