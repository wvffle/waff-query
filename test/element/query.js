describe('waff.query()', function() {
  it('should find i1 with \'div#i1\'', function() {
    const el = q('div#i1');
    expect(el).to.be(i1);
  });

  it('should find i1 with \'#i1\'', function() {
    const el = q('#i1');
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

});
