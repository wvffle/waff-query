describe('waff.query()', function() {
  it('should find i1 with \'div#i1\'', function() {
    const el = q('div#i1');
    expect(el).to.be(i1);
  });

  it('should find i1 with \'#i1\'', function() {
    const el = q('#i1');
    expect(el).to.be(i1);
  });

  it('should find i1 with [\'#i1\', \'#i2\']', function() {
    const el = q(['#i1', '#i2']);
    expect(el).to.be(i1);
  });

  it('should find first div with \'div\'', function() {
    const el = q('div');
    expect(el).to.be(document.getElementsByTagName('div')[0]);
  });

  it('should return html element', function() {
    const el = q('');
    expect(el).to.be(document.documentElement);
  });

  it('should return body element', function() {
    const el = q();
    expect(el).to.be(document.body);
  });

  it('should return .nah with \'div.nah\'', function() {
    const el = q('div.nah');
    expect(el).to.be(nah);
  });

  it('should return .nah with \'.nah\'', function() {
    const el = q('.nah');
    expect(el).to.be(nah);
  });

  it('should return .nah with \'.nah.empty\'', function() {
    const el = q('.nah.empty');
    expect(el).to.be(nah);
  });

  it('should return i3 with \'#i3.i3', function() {
    const el = q('#i3.i3');
    expect(el).to.be(i3);
  });

  it('should return i3 with \'.i3#i3', function() {
    const el = q('.i3#i3');
    expect(el).to.be(i3);
  });

  it('should return p with \'nah > p\' in .nah', function() {
    const el = q('.nah > p');
    expect(el).to.be(p);
  });

  it('should return p with custom function in .nah', function() {
    const el = nah.q((root, child) => child.tagName === 'P');
    expect(el).to.be(p);
  });

  it('should return p with \'> p\' in .nah', function() {
    const el = nah.q('> p');
    expect(el).to.be(p);
  });

  it('should throw an error', function() {
    try {
      const el = qq(new Date);
    } catch (e) {
      expect(e).to.be('selector must be a String, Element, Function or an Array');
    }
  });

});

describe('waff.query.all()', function() {
  it('should find i1 with \'div#i1\'', function() {
    const el = qq('div#i1');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(i1);
  });

  it('should find i1 with \'#i1\'', function() {
    const el = qq('#i1');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(i1);
  });

  it('should find i1 and i2 with [\'#i1\', \'#i2\']', function() {
    const el = qq(['#i1', '#i2']);
    expect(el.length).to.be(2);
    expect(el[0]).to.be(i1);
    expect(el[1]).to.be(i2);
  });

  it('should find i1 and i2 with [\'#i1\', i2]', function() {
    const el = qq(['#i1', i2]);
    expect(el.length).to.be(2);
    expect(el[0]).to.be(i1);
    expect(el[1]).to.be(i2);
  });

  it('should find all divs with \'div\'', function() {
    const el = qq('div');
    const all = document.getElementsByTagName('div');
    expect(el.length).to.be(all.length);
    for (var i = 0; i < el.length; ++i) {
      expect(el[i]).to.be(all[i]);
    }
  });

  it('should return html element', function() {
    const el = qq('');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(document.documentElement);
  });

  it('should return body element', function() {
    const el = qq();
    expect(el.length).to.be(1);
    expect(el[0]).to.be(document.body);
  });

  it('should return .nah with \'div.nah\'', function() {
    const el = qq('div.nah');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(nah);
  });

  it('should return .nah with \'.nah\'', function() {
    const el = qq('.nah');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(nah);
  });

  it('should return .nah with \'.nah.empty\'', function() {
    const el = qq('.nah.empty');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(nah);
  });

  it('should return i3 with \'#i3.i3', function() {
    const el = qq('#i3.i3');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(i3);
  });

  it('should return i3 with \'.i3#i3', function() {
    const el = qq('.i3#i3');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(i3);
  });

  it('should return p with \'nah > p\' in .nah', function() {
    const el = qq('.nah > p');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(p);
  });

  it('should return p with custom function in .nah', function() {
    const el = nah.qq((root, child) => child.tagName === 'P');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(p);
  });

  it('should return p with \'> p\' in .nah', function() {
    const el = nah.qq('> p');
    expect(el.length).to.be(1);
    expect(el[0]).to.be(p);
  });

  it('should throw an error', function() {
    try {
      const el = qq(new Date);
    } catch (e) {
      expect(e).to.be('selector must be a String, Element, Function or an Array');
    }
  });

});
