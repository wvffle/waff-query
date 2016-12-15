var extend = function(_extended, _super) {
  _extended.prototype = Object.create(_super.prototype);
};

var _super = function(instance) {
  var params = [].slice.call(arguments);
  params.shift();
  instance.constructor.apply(instance, params);
};

var classes = {
  extend: extend,
  super: _super
};

module.exports = classes;
