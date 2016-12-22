var attributes = /\[([a-z][a-z0-9-_]*)(\||\*|\^|\$|~|)=([^\]]+)\]/gi;

var parse = function(selector) {
  var tag = false;
  var id = false;
  var attr = {};

  selector = selector.replace(attributes, function(_, name, operator, value) {
    attr[name] = {
      operator: operator,
      value: value,
      toString: function() {
        return value;
      }
    };
    return '';
  });

  var classes = selector.split('.');
  if (selector[0] !== '.') {
    var tagid = classes[0].split('#');
    tag = tagid[0] || false;
    id = tagid[1] || false;
  }
  classes.splice(0, 1);
  for (var i = 0; i < classes.length; ++i) {
    var classid = classes[i].split('#');
    if (classid.length > 1) {
      id = id || classid[1];
      classes[i] = classid[0];
    }
  }
  return {
    tag: tag,
    id: id,
    classes: classes,
    attr: attr
  };
};

var selector = {
  parse: parse
};

module.exports = selector;
