/**
 * @class Element
 */
(function() {

  // require prototypes
  require('./prototype/after');
  require('./prototype/append');
  require('./prototype/before');
  require('./prototype/clear');
  require('./prototype/prepend');
  require('./prototype/has');
  require('./prototype/inside');

  require('./prototype/html');
  require('./prototype/text');
  require('./prototype/attr');
  require('./prototype/css');

  // require properties
  require('./properties/classes');
  require('./properties/next');
  require('./properties/prev');
  require('./properties/parent');
  require('./properties/selector');
})();
