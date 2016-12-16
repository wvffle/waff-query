Element.prototype.before = function(element) {
  if (element.parentElement != null) {
    element.parentElement.insertBefore(this, element);
  } else {
    throw 'cannot insert before root element';
  }

  return this;
};
