var prop = function(object, prop, desc) {
  Object.defineProperty(object, prop, {
    enumerable: true,
    configurable: true,
    get: desc.get,
    set: desc.set
  });
};

var objects = {
  prop: prop
};

module.exports = objects;
