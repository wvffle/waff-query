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

// -- Query inside element
Element.prototype.qq = function(qs){
  return qq(qs, this);
}
Element.prototype.q = function(qs){
  return q(qs, this);
}

// -- Binding events
Element.prototype.on = function(event, next){
  var self = this;
  this.addEventListener(event, function(ev){next.call(self,ev)});
}

// -- Changing css
Element.prototype.css = function(css){
  var self = this;
  Object.keys(css).forEach(k => self.style[k] = css[k]);
}
