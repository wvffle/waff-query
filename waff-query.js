(function (exports) {

  // -- Parse selectors
  var ps = function(selector){
    selector = selector || ''
    var cn = selector.split('.');
    var tag = false;
    if(selector[0] != '.') tag = cn[0];
    cn.splice(0, 1);
    var id = false;
    if(tag && tag[0] == '#') id = tag.split('#')[1];
    if(tag && id == '' && tag.indexOf('#') != -1){
      _tag = tag.split('#')
      tag = _tag[0]
      id = _tag[1]
    }
    if(id == '')
      for(var i = 0; i<cn.length;i++){
        var _id = cn[i].split('#')
        if(_id[1]){
          id = _id[1]
          cn[i] = _id[0]
          break;
        }
      }
    if(tag == '#'+id) tag = '';
    return {
      tag: tag,
      id: id,
      classList: cn
    }
  }

  // -- Query functions
  var qq = function(qs, root){
    if(root instanceof Array || root instanceof NodeList){
      var s = ps(qs);
      var arr = [].slice.call(root);
      var ret = [];
      for (var i = 0; i < arr.length; i++){
        is = true;
        if(arr[i] instanceof Element){
          if(s.tag && arr[i].tagName.toLowerCase()!=s.tag.toLowerCase()) is = false;
          if(s.id && arr[i].id != s.id) is = false;
          for (var j = 0; j < s.classList.length; j++)
            if(!arr[i].classList.contains(s.classList[j])) is = false;
          if(is) ret.push(arr[i]);
        }
      }
      return ret;
    }
    root = root instanceof Element ? root : document;
    if(qs instanceof Element) return [qs];
    if(qs instanceof NodeList || qs instanceof Array){
      var arr = [].slice.call(qs);
      var ret = [];
      for (var i = 0; i < arr.length; i++)
        if(arr[i] instanceof Element) ret.push(arr[i]);
      return ret;
    }
    var arr = [].slice.call(root.querySelectorAll(qs));
    var ret = [];
    for (var i = 0; i < arr.length; i++)
      if(arr[i] instanceof Element) ret.push(arr[i]);
    return ret;
  }
  var q = function(qs, root){
    return qq(qs, root)[0]||null;
  }
  Element.prototype.q = Element.prototype.query = function(qs){
    return q(qs, this);
  }
  Element.prototype.qq = function(qs){
    return qq(qs, this);
  }

  //-- Create elements
  var e = function(selector){
    var s = ps(selector);
    var el = document.createElement(s.tag||'div');
    if(s.id) el.id = s.id;
    for (var i = 0; i < s.classList.length; i++)
      el.classList.add(s.classList[i]);
    return el;
  }
  var t = function(text){
    var e = document.createTextNode(text);
    return e;
  }
  Text.prototype.set = function (text) {
    this.nodeValue = text;
  }
  Text.prototype.get = function () {
    return this.nodeValue;
  }

  // -- Element actions
  Element.prototype.append = function (element) {
    this.appendChild(element);
  }
  Element.prototype.text = function (text) {
    if(!text) return this.textContent;
    if(text instanceof NodeList || text instanceof Array){
      var arr = [].slice.call(text);
      var _text = '';
      for (var i = 0; i < arr.length; i++){
        if(arr[i] instanceof Text) _text+= arr[i].get();
        else _text += arr[i].toString();
      }
      var e = t(_text);
      this.append(e);
      return e;
    }
    var nodes = this.childNodes;
    for (var i = 0; i < nodes.length; i++)
      nodes[i].remove();
    var e = t(text);
    this.append(e);
    return e;
  }
  Element.prototype.html = function (html) {
    if(html == null) return this.innerHTML;
    var nodes = this.childNodes;
    for (var i = 0; i < nodes.length; i++)
      nodes[i].remove();
    if(html instanceof Element){
      this.append(html);
      return this.innerHTML;
    }
    if(html instanceof NodeList || html instanceof Array){
      var arr = [].slice.call(html);
      for (var i = 0; i < arr.length; i++)
        if(arr[i] instanceof Element || arr[i] instanceof Text)
          this.append(arr[i]);
      return this.innerHTML;
    }
    this.innerHTML = html;
    return this.innerHTML;
  }

  // -- Observe elements
  Element.prototype.observe = function () {
    var self = this;
    if(!this._observer){
      this._observerHandlers = []
      this._observer = new MutationObserver(function(mutations) {
        for (var i = 0; i < self._observerHandlers.length; i++) {
          for (var j = 0; j < mutations.length; j++) {
            var mutation = mutations[j];
            self._observerHandlers[i].call(self, mutation);
          }
        }
      });
      var config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
      }
      this._observer.observe(this, config);
    }
  }
  Element.prototype.stopObserving = function () {
    if(this._observer){
      this._observer.disconnect();
      delete this._observer;
    }
  }
  
  // -- Path
  Element.prototype.path = function (){
    var root = this;
    var path = [];
    while (root.parentNode){
      if (root.id != ''){
        path.unshift('#' + root.id);
        break;
      }
      if (root==root.ownerDocument.documentElement) path.unshift(root.tagName.toLowerCase());
      else{
        for (var i = 1, e = root; e.previousElementSibling; e = e.previousElementSibling, i++);
        path.unshift(root.tagName.toLowerCase() + ':nth-child(' + i + ')');
      }
      root=root.parentNode;
    }
    return path.join(' > ');
  }
  
  // -- Event
  EventTarget.prototype.on = function(event, next, capture){
    if(this._events == null) this._events = {};
    if(this._eventsInited == null) this._eventsInited = {};
    if(this._events[event] == null) this._events[event] = []
    this._events[event].push(next);
    if(this._eventsInited[event] !== true) 
      this.addEventListener(event, function(ev){
        for(var i = 0; i < this._events[event].length; i++)
          this._events[event][i].call(this, ev);
      }, capture);
    this._eventsInited[event] = true
  };
  EventTarget.prototype.off = function(event, next, capture){
    if(this._events == null) this._events = {};;
    if(this._events[event] == null || next == null) this._events[event] = [];
    var index = this._events[event].indexOf(next);
    if(index != -1) this._events[event].splice(index, 1);
  };
  EventTarget.prototype.event = function(event){
    if(typeof event == 'string') return this.dispatchEvent(new Event(event));
    return this.dispatchEvent(event);
  };
  EventTarget.prototype.once = function(event, next, capture){
    var n = function(ev){
      next.call(self, ev);
      this.off(event, n, capture);
    }
    this.on(event, n, capture);
  };

  // -- Element events
  Element.prototype.on = function(event, next, capture){
    var _on = EventTarget.prototype.on;
    switch (event) {
      case 'mutation':
        this._observerHandlers.push(next);
        break;
      default:
        _on.apply(this, arguments);
      }
  }
  Element.prototype.off = function(event, next, capture){
    var _on = EventTarget.prototype.off;
    switch (event) {
      case 'mutation':
        var index = this._observerHandlers.indexOf(next);
        if(index != -1) this._observerHandlers.splice(index, 1);
        break;
      default:
        _off.apply(this, arguments);
      }
  }

  // -- Changing css
  Element.prototype.css = function(css, ignoreDefaults){
    if(typeof css === 'boolean') return this.css(null, css);
    if(typeof css === 'string') return this.css(null, ignoreDefaults)[css];
    if(!css){
      css = getComputedStyle(this);
      var ret = {};
      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        if(ignoreDefaults){
          var defaults = getComputedStyle(e(this.tagName));
          for (var k in css) {
            if (!css.hasOwnProperty(k) && isNaN(+k) && css[k] != '' && css[k] != defaults[k]) {
               ret[k] = css[k];
            }
          }
          return ret;
        }
        for (var k in css) {
          if (!css.hasOwnProperty(k) && isNaN(+k) && css[k] != '') {
             ret[k] = css[k];
          }
        }
      } else {
        if(ignoreDefaults){
          var defaults = getComputedStyle(e(this.tagName));
          for (var k in css) {
            if (css.hasOwnProperty(k) && isNaN(+k) && css[k] != '' && css[k] != defaults[k]) {
               ret[k] = css[k];
            }
          }
          return ret;
        }
        for (var k in css) {
          if (css.hasOwnProperty(k) && isNaN(+k) && css[k] != '') {
             ret[k] = css[k];
          }
        }
      }
      return ret;
    };
    var self = this;
    for (var _k in css) {
      if (css.hasOwnProperty(_k)) {
        self.style[_k] = css[_k]
      }
    }
  }

  q.all = qq;
  q.doc = function(){ return document }
  q.body = function(){ return q.doc().body }
  
  exports.q = exports.query = q;
  exports.qq = qq;
  exports.ps = exports.parseSelectors = ps;
  exports.e = exports.element = e;
  exports.t = exports.text = t;

})(window);
