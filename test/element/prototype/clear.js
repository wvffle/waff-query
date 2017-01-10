describe('Element#clear()', function() {
  it('should set innerHTML of i1 to an empty string', function() {
    i1.clear();

    expect(i1.innerHTML).to.be('');
  });
});
