var camel = function(str) {
  return str.replace(/(\-[a-z])/g, function(match) {
    return match.toUpperCase().slice(1);
  });
};

var dash = function(str) {
  return str.replace(/([A-Z])/g, function(match) {
    return '-' + match.toLowerCase();
  });
};

var spaces = function(str) {
  return str.trim();
};

var has = function(str, str2) {
  return !!~str.indexOf(str2);
};

var string = {
  camel: camel,
  dash: dash,
  spaces: spaces,
  has: has
};

module.exports = string;
