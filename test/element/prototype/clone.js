describe('Element#clone()', function() {
  it('should clone i1', function() {
    const clone = i1.clone();

    expect(clone.textContent).not.to.be(i1.textContent);
    expect(clone.id).to.be(i1.id);
  });

  it('should deep clone i1', function() {
    const clone = i1.deepClone();

    expect(clone.textContent).to.be(i1.textContent);
    expect(clone.id).to.be(i1.id);
  });
});
