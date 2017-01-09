describe('Text#set()', function() {
  it('should set textContent of i1', function() {
    i1.childNodes[0].set('meh');
    expect(i1.textContent).to.be('meh');
  });

  it('should set textContent of i1 to empty string', function() {
    i1.childNodes[0].set();
    expect(i1.textContent).to.be('');
  });
});
