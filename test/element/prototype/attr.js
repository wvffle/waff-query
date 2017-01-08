describe('Element#attr()', function() {
  it('should return object of attributes of i1', function() {
    var attrs = i1.attr();

    expect(attrs).to.be.object;
    expect(attrs.id).to.be('i1');
  });

  it('should set data-meh of i1 to meh', function() {
    i1.attr('data-meh', 'meh');

    expect(i1.attributes['data-meh'].nodeValue).to.be('meh');
  });

  it('should set data-meh of i1 to meh', function() {
    i1.attr({'data-meh': 'meh'});

    expect(i1.attributes['data-meh'].nodeValue).to.be('meh');
  });

  it('should return id of i1', function() {
    expect(i1.attr('id')).to.be('i1');
  });
});
