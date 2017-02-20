var arrays = require('../../../lib/util/array');

describe('Element#classes.array()', function() {
  it('should return array with classes', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;

    expect(classes.array()).to.eql(arrays.from(i1.classList));
  });

  it('should not return array with empty strings', function() {
    i1.className = 'meh waff    ';
    const classes = i1.classes;

    expect(classes.array()).to.eql(arrays.from(i1.classList));
  });

  it('should not return array with dupes', function() {
    i1.className = 'meh waff meh';
    const classes = i1.classes;

    expect(classes.array()).to.eql(arrays.from(i1.classList));
  });

  it('should return array with classes after updated', function() {
    const classes = i1.classes;
    i1.className = 'meh waff';

    expect(classes.array()).to.eql(arrays.from(i1.classList));
  });
});

describe('Element#classes.has()', function() {
  it('should check if element has class', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;

    expect(classes.has('meh')).to.be(true);
    expect(classes.has('nah')).to.be(false);
  });

  it('should check if element has class after updated', function() {
    const classes = i1.classes;
    i1.className = 'meh waff';

    expect(classes.has('meh')).to.be(true);
    expect(classes.has('nah')).to.be(false);
  });
});

describe('Element#classes.add()', function() {
  it('should add class', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;
    classes.add('nah');

    expect(arrays.has(i1.classList, 'nah')).to.be(true);
  });

  it('should not add dupe', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;
    classes.add('waff');

    expect(i1.className.split(' ').length).to.be(2);
  });

  it('should not add empty string', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;
    classes.add('');

    expect(i1.className.split(' ').length).to.be(2);
  });
});

describe('Element#classes.remove()', function() {
  it('should remove class', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;
    classes.remove('meh');

    expect(arrays.has(i1.classList, 'meh')).to.be(false);
  });

  it('should not remove non-existing class', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;
    classes.remove('nah');

    expect(i1.className.split(' ').length).to.be(2);
  });

  it('should not add remove string', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;
    classes.remove('');

    expect(i1.className.split(' ').length).to.be(2);
  });
});

describe('Element#classes.toggle()', function() {
  it('should toggle class', function() {
    i1.className = 'meh waff';
    const classes = i1.classes;

    classes.toggle('meh');
    expect(arrays.has(i1.classList, 'meh')).to.be(false);

    classes.toggle('meh');
    expect(arrays.has(i1.classList, 'meh')).to.be(true);
  });
});

describe('Element#classes', function() {
  it('should set array as classes', function() {
    i1.classes = [ 'meh', 'waff', 'buff' ];

    expect(arrays.has(i1.classList, 'meh')).to.be(true);
    expect(arrays.has(i1.classList, 'waff')).to.be(true);
    expect(arrays.has(i1.classList, 'buff')).to.be(true);
    expect(arrays.has(i1.classList, 'nah')).to.be(false);
  });

  it('should not set an empty array as classes', function() {
    i1.classes = [];

    expect(i1.attributes.length).to.be(1);
  });
});
