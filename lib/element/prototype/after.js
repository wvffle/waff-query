Element.prototype.after = function(element) {
  if (element.parentElement != null) {
    if (element.nextSibling != null) {
      element.parentElement.insertBefore(this, element.nextSibling);
    } else {
      element.parentElement.appendChild(this);
    }
  } else {
    throw 'cannot insert after root element';
  }

  return this;
};
