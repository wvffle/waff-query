/*
 * waff-query v1.0.2
 * https://github.com/wvffle/waff-query.js#readme
 *
 * Copyright wvffle.net
 * Released under the MIT license
 *
 * Date: 2016-08-29
 */

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

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

  /**
   * @global waff
   */
  var Target, j, k, l, len, len1, len2, len3, o, ref, ref1, ref2, ref3, waff;
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
       * @alias waff#q.all
       * @alias waff#qq
       * @desc Query all elements
       * @param {String|String[]} qs - Query Selector. Default: body
       * @param {Element|Array|NodeList} [root] - Element to perform query on
       * @param {Boolean} [single] - Specifies if the query is single. Default: false
       * @example
       * var divs = waff.query.all('div')
       * var divs = waff.qq('div')
       * var divs = waff.q.all('div')
       * @returns {Element[]} - Returns found elements
       */
      var queryAll;
      queryAll = function(qs, root, single) {
        var _arr, arr, c, element, j, k, l, len, len1, len2, len3, o, pass, query, ref, ret, s;
        if (qs == null) {
          qs = 'body';
        }
        if (single == null) {
          single = false;
        }
        if (qs === '') {
          qs = '*';
        }
        query = function(qs, root) {
          if (single === true) {
            return [root.querySelector(qs)];
          } else {
            return root.querySelectorAll(qs);
          }
        };
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
              _arr.push.apply(_arr, query(qs, root));
            }
          }
          arr = _arr;
        } else {
          arr = [].slice.call(query(qs, root));
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
       * @desc Query single element
       * @param {String} qs - Query Selector
       * @param {Element|Array|NodeList} [root] - Element to perform query on
       * @example
       * var body = waff.query('body')
       * var body = waff.q('body')
       * @returns {Element|null} - Returns found element or null
       */
      var query;
      query = function(qs, root) {
        return this.qq(qs, root, true)[0] || null;
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
       * waff.element('.white-text')
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
       * var text = waff.text('The number of a waffle')
       * text.set('<div></div>')
       * text.get() // &lt;div&gt;&lt;/div&gt;
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
  waff._version = '1.0.2';
  waff._get = (function() {

    /**
     * @func waff#get
     * @desc Performs XHR GET
     * @param {String} url - URL to get
     * @param {Object} options
     * `json` (boolean) - determines if response is json. Default - `false` <br>
     * `timeout` (number) - determines timeout in ms. Default - `2000`
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
     * `json` (boolean) - determines if response is json. Default - `false` <br>
     * `form` (boolean) - determines if data should be converted to FormData or just pure JSON. Default - `true` <br>
     * `timeout` (number) - determines timeout in ms. Default - `2000`
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
  waff._EventTargets = [Element, Document, Window, Node, XMLHttpRequest];
  waff._EventEmitter = (function() {
    var EventEmitter;
    EventEmitter = (function() {

      /**
       * @class waff.EventEmitter
       * @static
       * @classdesc Own implementation of EventEmitter. (untested)
       * @example
       * var ee = new waff.EventEmitter();
       */
      function EventEmitter() {
        this._emitter = waff.e();
      }


      /**
       * @function waff.EventEmitter.on
       * @instance
       * @desc Adds handler for event
       * @param {String|Array<String>} event - name of event
       * @param {Function} handler - Handler function
       * @param {Boolean} [capture] - Use capture
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
       * @function waff.EventEmitter.once
       * @instance
       * @desc Adds handler only for one event emit
       * @param {String|Array<String>} event - name of event
       * @param {Function} handler - Handler function
       * @param {Boolean} [capture] - Use capture
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
       * @function waff.EventEmitter.off
       * @instance
       * @desc Removes specific event handler
       * @param {String|Array<String>} event - name of event
       * @param {Function} [handler] - Handler function
       * @param {Boolean} [capture] - Use capture
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
       * @function waff.EventEmitter.emit
       * @desc Emits event
       * @instance
       * @param {String} event - name of event
       * @param {Object} [data] - Data to pass
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
     * @function waff.EventEmitter.extend
     * @static
     * @desc Extends events on object
     * @param {Object} object - object to extend
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
       * @class waff.Promise
       * @extends waff.EventEmitter
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
       * @function waff.Promise.then
       * @desc Adds handler when fulfilled or rejected
       * @param {Function} onFulfill - Fulfiull function
       * @param {Function} [onReject] - Reject function
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
       * @function waff.Promise.catch
       * @desc Adds handler when rejected
       * @param {Function} onReject - Reject function
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
           * @event waff.Promise.fulfill
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

      Promise.prototype.resolve = function() {
        return this._resolve(this).apply(this, arguments);
      };

      Promise.prototype._reject = function(self) {
        return function() {

          /**
           * @event waff.Promise.reject
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

      Promise.prototype.reject = function() {
        return this._reject(this).apply(this, arguments);
      };

      return Promise;

    })(waff._EventEmitter);
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
   * @typicalname Element.prototype.append
   * @desc Adds element at the end
   * @param {Element} element - element to append
   * @example
   * var span = waff.element('span.red')
   * var body = waff.element('body')
   * body.append(span
   * // body
   * //   <content>
   * //   span.red
   */
  Element.prototype.append = function() {
    var element, j, len;
    for (j = 0, len = arguments.length; j < len; j++) {
      element = arguments[j];
      this.appendChild(element);
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element.prototype.prepend
   * @desc Adds element at the beginning
   * @param {Element} element - element to prepend
   * @example
   * var span = waff.element('span.red')
   * var body = waff.element('body')
   * body.prepend(span)
   * // body
   * //   span.red
   * //   <content>
   */
  Element.prototype.prepend = function() {
    var element, j, len;
    for (j = 0, len = arguments.length; j < len; j++) {
      element = arguments[j];
      if (this.firstChild != null) {
        this.insertBefore(element, this.firstChild);
      } else {
        this.append(element);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element.prototype.before
   * @desc Adds element before
   * @param {Element} element - element to add
   * @example
   * var span = waff.element('span.red')
   * var div = waff.element('div')
   * waff.query('body').append(span)
   * div.before(span)
   * // body
   * //   div
   * //   span.red
   */
  Element.prototype.before = function() {
    var element, j, len;
    for (j = 0, len = arguments.length; j < len; j++) {
      element = arguments[j];
      if (element.parentElement) {
        element.parentElement.insertBefore(this, element);
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element.prototype.after
   * @desc Adds element after
   * @param {Element} element - element to add
   * @example
   * var span = waff.element('span.red')
   * var div = waff.element('div')
   * waff.query('body').append(span)
   * div.after(span)
   * // body
   * //   span.red
   * //   div
   */
  Element.prototype.after = function() {
    var element, j, len;
    for (j = 0, len = arguments.length; j < len; j++) {
      element = arguments[j];
      if (element.parentElement) {
        if (this.nextSibling != null) {
          element.parentElement.insertBefore(this, element.nextSibling);
        } else {
          element.parentElement.append(this);
        }
      }
    }
    return this;
  };

  /**
   * @function
   * @typicalname Element.prototype.text
   * @desc Sets text of Element to the given string
   * @param {String} [text] - text to set
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
    if (text instanceof NodeList || text instanceof Array) {
      _text = '';
      ref = [].slice.call(text);
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
   * @typicalname Element.prototype.html
   * @desc Sets text of Element to the given string
   * @param {String} [html] - html string to set
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
    if (html instanceof NodeList || html instanceof Array) {
      arr = [].slice.call(html);
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

  /**
   * @function
   * @typicalname Element.prototype.path
   * @desc Get unique path of an element
   * @example
   * waff.element('body').path() // html > body:nth-child(2)
   */
  Object.defineProperty(Element.prototype, 'path', {
    configurable: true,
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
   * @typicalname Element.prototype.css
   * @desc Get or set  elements CSS
   * @param {String|Object} attr - attribute name or object with values
   * @param {String} [value] - attribute value
   * @example
   * waff.element('body').css() // Object containing all properties
   * waff.element('body').css('background-color') // Only `background-color`
   * waff.element('body').css('background-color', '#f00') // sets `background-color` to #f00
   * waff.element('body').css({'background-color': '#f00', 'color', '#ffa500'}) // sets `background-color` to #f00 and `color` to #ffa500
   */
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
   * @typicalname Element.prototype.attr
   * @desc Sets attributes of element
   * @param {String|Object} attr - attribute name or object with values
   * @param {String} [value] - attribute value
   * @example
   * var span = waff.element('span.red')
   * span.attr('name', 'waffles!')
   * span.attr({'name': 'waffles!', 'sth': true})
   */
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
   * @typicalname Element.prototype.clear
   * @desc Clears element content
   * @example
   * waff.element('body').clear()
   */
  Element.prototype.clear = function() {
    while (this.childNodes.length > 0) {
      this.firstChild.remove();
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

  /**
   * @function
   * @typicalname Element.prototype.class
   * @desc classList shortcut
   * @example
   * waff.element('body').class.contains('cls')
   * waff.element('body').class.remove('cls')
   * waff.element('body').class.add('cls')
   * waff.element('body').class.toggle('cls')
   */
  Object.defineProperty(Element.prototype, 'class', {
    configurable: true,
    get: function() {
      return this.classList;
    },
    set: function() {
      return this.classList;
    }
  });

  /**
   * @function
   * @typicalname Element.prototype.watch
   * @desc Observes for DOM changes
   * @param {MutationObserverInit} [options] - MutationObserver options
   * @fires attr change
   * @fires attr:*
   * @fires child add
   * @fires child remove
   * @fires text change
   * @example
   * var element = waff.query('span.red')
   * element.watch()
   */
  Element.prototype.watch = function(options) {
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
              if (-1 !== knownattrs.indexOf(m.attributeName)) {
                _this.emit(m.attributeName + ' change', event);
              }

              /**
               * @event Element.prototype.watch.attr change
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
               * @event Element.prototype.watch.attr:*
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
            }
            if (m.type = 'childList') {
              if (m.addedNodes.length > 0) {

                /**
                 * @event Element.prototype.watch.child add
                 * @desc Event emitted on child addition
                 * @example
                 * element.on('child add', function(e){
                 *  // e.target
                 *  // e.nodes
                 * })
                 */
                _this.emit('child add', {
                  target: m.target,
                  nodes: m.addedNodes
                });
              }
              if (m.removedNodes.length > 0) {

                /**
                 * @event Element.prototype.watch.child remove
                 * @desc Event emitted on child remove
                 * @example
                 * element.on('child remove', function(e){
                 *  // e.target
                 *  // e.nodes
                 * })
                 */
                _this.emit('child remove', {
                  target: m.target,
                  nodes: m.removedNodes
                });
              }
            }
            if (m.type = 'characterData') {

              /**
               * @event Element.prototype.watch.text change
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
   * @typicalname Element.prototype.unwatch
   * @desc Stops observing for DOM changes
   * @example
   * var element = waff.query('span.red')
   * element.watch()
   * element.unwatch()
   */
  Element.prototype.unwatch = function() {
    if (this._observer != null) {
      this._observer.disconnect();
      delete this._observer;
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
  ref = waff._EventTargets;
  for (j = 0, len = ref.length; j < len; j++) {
    Target = ref[j];
    Target.prototype.on = function(name, next, capture) {
      var _this, event, k, len1, listen, self;
      listen = function() {
        var args, el, ev;
        args = [].slice.call(arguments);
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
      for (k = 0, len1 = name.length; k < len1; k++) {
        event = name[k];
        if (self._events[event] == null) {
          self._events[event] = [];
        }
        self._events[event].push(next);
        if (self._eventsInited[event] !== true) {
          listen(self, event, (function(ev) {
            var handler, l, len2, ref1, results;
            if (ev.waffData != null) {
              ev = ev.waffData;
            }
            ref1 = self._events[event];
            results = [];
            for (l = 0, len2 = ref1.length; l < len2; l++) {
              handler = ref1[l];
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
  for (k = 0, len1 = ref1.length; k < len1; k++) {
    Target = ref1[k];
    Target.prototype.off = function(name, next, capture) {
      var detach, event, l, len2, self;
      if (!(name instanceof Array)) {
        name = [name];
      }
      self = this.emitter != null ? this.emitter : this;
      if (self._events == null) {
        self._events = {};
      }
      for (l = 0, len2 = name.length; l < len2; l++) {
        event = name[l];
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
  }
  ref2 = waff._EventTargets;
  for (l = 0, len2 = ref2.length; l < len2; l++) {
    Target = ref2[l];
    Target.prototype.once = function(name, next, capture) {
      var _this, event, fn, len3, o, self;
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
      for (o = 0, len3 = name.length; o < len3; o++) {
        event = name[o];
        fn(event);
      }
      return self;
    };
  }
  ref3 = waff._EventTargets;
  for (o = 0, len3 = ref3.length; o < len3; o++) {
    Target = ref3[o];
    Target.prototype.emit = function(event, data) {
      var _this, dispatch, self;
      dispatch = function() {
        var args, el, ev;
        args = [].slice.call(arguments);
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
   * @function
   * @typicalname Text.prototype.set
   * @desc set nodeValue easier
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
   * @typicalname Text.prototype.get
   * @desc get nodeValue easier
   * @example
   * var text = waff.text('The number of a waffle')
   * text.get() // The number of a waffle
   */
  Text.prototype.get = function() {
    return this.nodeValue;
  };
  return waff;
})());
