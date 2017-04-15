describe('waff.element()', function() {
  it('should create \'div\' with \'div\'', function() {
    const el = e('div');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(0);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div\' with \'\'', function() {
    const el = e('');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(0);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div\' without passing selector', function() {
    const el = e();
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(0);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div#vid\' with \'div#vid\'', function() {
    const el = e('div#vid');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('');
    expect(el.id).to.be('vid');
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div#vid\' with \'#vid\'', function() {
    const el = e('#vid');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('');
    expect(el.id).to.be('vid');
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'p.meh.waff\' with \'p.meh.waff\'', function() {
    const el = e('p.meh.waff');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('P');
    expect(el.className).to.be('meh waff');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div.meh.waff\' with \'.meh.waff\'', function() {
    const el = e('.meh.waff');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('meh waff');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div#meh.waff\' with \'div#meh.waff\'', function() {
    const el = e('div#meh.waff');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('waff');
    expect(el.id).to.be('meh');
    expect(el.attributes.length).to.be(2);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div#meh.waff\' with \'#meh.waff\'', function() {
    const el = e('#meh.waff');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('waff');
    expect(el.id).to.be('meh');
    expect(el.attributes.length).to.be(2);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div#meh.waff\' with \'div.waff#meh\'', function() {
    const el = e('div.waff#meh');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('waff');
    expect(el.id).to.be('meh');
    expect(el.attributes.length).to.be(2);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'div#meh.waff\' with \'.waff#meh\'', function() {
    const el = e('.waff#meh');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('waff');
    expect(el.id).to.be('meh');
    expect(el.attributes.length).to.be(2);
    expect(el.childElementCount).to.be(0);
  });

  it('should create \'a[href="#"]\' with \'a[href=\'#\']\'', function() {
    const el = e('a[href=\'#\']');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('A');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(0);
    expect(el.attributes.href.nodeValue).to.be('#');
  });

  it('should create \'a[href="#"]\' with \'a[href="#"]\'', function() {
    const el = e('a[href="#"]');
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('A');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(0);
    expect(el.attributes.href.nodeValue).to.be('#');
  });

  it('should create \'a[href="#"]\' with attribute map', function() {
    const el = e('a', {
      href: '#',
    });
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('A');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(0);
    expect(el.attributes.href.nodeValue).to.be('#');
  });

  it('should create \'div.meh\' with i1 inside of it', function() {
    const el = e('', {
      class: 'meh',
    }, [
      i1,
    ]);
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('meh');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(1);
    expect(el.children[0]).to.be(i1);
  });

  it('should create \'div\' with i1 inside of it', function() {
    const el = e('', [
      i1,
    ]);
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(0);
    expect(el.childElementCount).to.be(1);
    expect(el.children[0]).to.be(i1);
  });

  it('should create \'div\' with i1 inside of it and empty \'meh\' attribute', function() {
    const el = e('', [
      'meh',
    ], [
      i1,
    ]);
    expect(el).to.be.an(Element);
    expect(el.tagName).to.be('DIV');
    expect(el.className).to.be('');
    expect(el.id).to.be.null;
    expect(el.attributes.length).to.be(1);
    expect(el.childElementCount).to.be(1);
    expect(el.children[0]).to.be(i1);
    expect(el.attributes.meh.nodeValue).to.be('');
  });

});
