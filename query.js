(function (_export) {
  // -- Query functions
  var qq = function(qs, root){
    root = root instanceof Element
      ? root
      : document;
    return qs instanceof Element
      ? [qs]
      : Array.from(
          root.querySelectorAll(qs)
        ).filter(e => e instanceof Element);
    }
  var q = function(qs, root){
    return qq(qs, root)[0]||null;
  }
  //-- Create elements
  var c = function(_class){
    var e = document.createElement('div');
    e.classList.add(_class);
    return e;
  }
  // -- Query inside element
  Element.prototype.qq = function(qs){
    return qq(qs, this);
  }
  Element.prototype.q = function(qs){
    return q(qs, this);
  }
  // -- Create elements inside elements
  Element.prototype.c = function (_class) {
    var e = c(_class);
    this.appendChild(e);
    return e;
  }
  // -- Event
  var _ev = function(event, next){
    var self = this;
    this.addEventListener(event, function(ev){next.call(self,ev)});
  }
  // -- Binding events
  Element.prototype.on = _ev;
  Window.prototype.on = _ev;
  Document.prototype.on = _ev;
  // -- Changing css
  Element.prototype.css = function(css){
    var self = this;
    Object.keys(css).forEach(k => self.style[k] = css[k]);
  }

  _export.q = q;
  _export.qq = qq;
  _export.c = c;

})(window);
