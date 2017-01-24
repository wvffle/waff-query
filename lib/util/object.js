var prop = function(object, prop, desc) {
  var descriptor = {
    enumerable: true,
    configurable: true,
    get: desc.get,
    set: desc.set,
    wiratable: desc.writable
  };
  if (desc.value != null) {
    descriptor.value = desc.value;
    delete descriptor.set;
    delete descriptor.get;
  }
  Object.defineProperty(object, prop, descriptor);
};

var exports = function(objs, names, value) {
  for (var i = 0; i < objs.length; ++i) {
    for (var j = 0; j < names.length; ++j) {
      objs[i][names[j]] = value;
    }
  }
};

var isObject = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

var objects = {
  prop: prop,
  export: exports,
  object: isObject
};

module.exports = objects;
