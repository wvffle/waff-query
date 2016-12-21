var prop = function(object, prop, desc) {
  Object.defineProperty(object, prop, {
    enumerable: true,
    configurable: true,
    get: desc.get,
    set: desc.set
  });
};

var exports = function(objs, names, value) {
  for (var i = 0; i < obj.length; ++i) {
    for (var j = 0; j < names.length; ++j) {
      objs[i][names[j]] = value;
    }
  }
};

var objects = {
  prop: prop,
  export: exports
};

module.exports = objects;
