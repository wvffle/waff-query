var isArrayLike = function(array) {
  return array instanceof Array ||
    array instanceof NodeList ||
    array instanceof HTMLCollection;
};

var from = function(array) {
  if (array instanceof Array) return array;
  var res = [];
  [].push.apply(res, array);
  return res;
};

var join = function(array, str) {
  return [].join.call(array, str);
};

var indexOf = function(array, element) {
  for (var i = 0; i < array.length; ++i) {
    if (array[i] == element) {
      return i;
    }
  }
  return -1;
};

var splice = function(array, from, to) {
  return [].splice.call(array, from, to);
};

var remove = function(array, element) {
  var index = indexOf(array, element);
  return !!splice(array, index, 1).length;
};

var has = function(array, element) {
  return !!~indexOf(array, element);
};

var add = function(array, array2) {
  [].push.apply(array, array2);
};

var isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var array = {
  arrayLike: isArrayLike,
  from: from,
  join: join,
  index: indexOf,
  splice: splice,
  remove: remove,
  has: has,
  add: add,
  array: isArray
};

module.exports = array;
