describe('element', function() {

  beforeEach(function () {
    workspace.reset()
  })

  context('Element.after()', function() {

    it('should put span.red after span.green', function () {
      document.querySelector('span.red').after(document.querySelector('span.green'));

      expect( document.querySelector('span.green').nextSibling ).to.be.equal( document.querySelector('span.red') );
    });

  });

  context('Element.append()', function() {

    it('should put #text at the end of .workspace', function () {
      workspace.element.append(document.querySelector('#text'));

      expect( workspace.element.lastChild ).to.be.equal( document.querySelector('#text') );
    });

  });

  context('Element.attr()', function() {

    it('should set [name="passed"] of span.green', function () {
      var green = document.querySelector('span.green');
      var at = green.attr('name', 'passed');

      expect( green.getAttribute('name') ).to.be.equal( 'passed' );
      expect( at ).to.be.deep.equal( green );
    });

    it('should set [name="passed" attr2="passed2"] of span.green', function () {
      var green = document.querySelector('span.green');
      var at = green.attr({'name': 'passed', 'attr2': 'passed2'});

      expect( green.getAttribute('name') ).to.be.equal( 'passed' );
      expect( green.getAttribute('attr2') ).to.be.equal( 'passed2' );
      expect( at ).to.be.deep.equal( green );
    });

    it('should get [name] of span.green', function () {
      var green = document.querySelector('span.green');
      green.setAttribute('name', 'passed');
      var at = green.attr('name');

      expect( at ).to.be.equal( 'passed' );
    });

  });

  context('Element.before()', function() {

    it('should put span.green before span.red', function () {
      document.querySelector('span.green').before(document.querySelector('span.red'));

      expect( document.querySelector('span.green').nextSibling ).to.be.deep.equal( document.querySelector('span.red') );
    });

  });

  context('e()', function() {

    it('should create plain div', function () {
      var div = e('div');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( div.classList ).to.have.lengthOf( 0 );
      expect( div.id ).to.equal( '' );
    });

    it('should create plain div without providing args', function () {
      var div = e();

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( div.classList ).to.have.lengthOf( 0 );
      expect( div.id ).to.equal( '' );
    });

    it('should create div.red', function () {
      var div = e('div.red');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 1 );
      expect( [].slice.call(div.classList) ).to.include( 'red' );
      expect( div.id ).to.equal( '' );
    });

    it('should create div.red without providing tag name', function () {
      var div = e('.red');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 1 );
      expect( [].slice.call(div.classList) ).to.include( 'red' );
      expect( div.id ).to.equal( '' );
    });

    it('should create div#text', function () {
      var div = e('div#text');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 0 );
      expect( div.id ).to.equal( 'text' );
    });

    it('should create div#text without providing tag name', function () {
      var div = e('#text');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 0 );
      expect( div.id ).to.equal( 'text' )
    });

    it('should create div#text.cl1.cl2', function () {
      var div = e('div#text.cl1.cl2');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
      expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                        .and.to.include( 'cl2' );
      expect( div.id ).to.equal( 'text' )
    });

    it('should create div#text.cl1.cl2 without providing tag name', function () {
      var div = e('#text.cl1.cl2');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
      expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                        .and.to.include( 'cl2' );
      expect( div.id ).to.equal( 'text' )
    });

    it('should create div.cl1.cl2#text', function () {
      var div = e('div.cl1.cl2#text');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
      expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                        .and.to.include( 'cl2' );
      expect( div.id ).to.equal( 'text' )
    });

    it('should create div#text.cl1.cl2 without providing tag name', function () {
      var div = e('.cl1.cl2#text');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
      expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                        .and.to.include( 'cl2' );
      expect( div.id ).to.equal( 'text' )
    });

    it('should create div.cl1#text.cl2', function () {
      var div = e('div.cl1#text.cl2');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
      expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                        .and.to.include( 'cl2' );
      expect( div.id ).to.equal( 'text' )
    });

    it('should create div#text.cl1.cl2 without providing tag name', function () {
      var div = e('.cl1#text.cl2');

      expect( div.tagName.toLowerCase() ).to.be.equal( 'div' );
      expect( [].slice.call(div.classList) ).to.have.lengthOf( 2 );
      expect( [].slice.call(div.classList) ).to.include( 'cl1' )
                                        .and.to.include( 'cl2' );
      expect( div.id ).to.equal( 'text' )
    });

  });

  context('element()', function() {

    it('should be same as e()', function () {
      expect( element ).to.be.equal( e );
    });

  });

  context('Element.css()', function() {

    it('should set color of span.green to red', function () {
      var span = document.querySelector('span.green');
      span.css({color:'rgb(255, 0, 0)'});

      expect( getComputedStyle(span).color ).to.be.equal( 'rgb(255, 0, 0)' );
    });

    it('should set color of span.green to red the other way', function () {
      var span = document.querySelector('span.green');
      span.css('color', 'rgb(255, 0, 0)');

      expect( getComputedStyle(span).color ).to.be.equal( 'rgb(255, 0, 0)' );
    });

    it('should get color of span.green', function () {
      var span = document.querySelector('span.green');

      expect( span.css('color') ).to.be.equal( 'rgb(0, 255, 0)' );
    });

  });

  context('Element.html()', function() {

    it('should clear span.green', function () {
      var span = document.querySelector('span.green');
      span.html('');

      expect( span.innerHTML ).to.equal( '' );
    });

    it('should return span.green\'s html', function () {
      var span = document.querySelector('span.green');
      var html = span.html();

      expect( span.innerHTML ).to.equal( html );
    });

    it('should set span.green\'s html to <div></div>', function () {
      var span = document.querySelector('span.green');
      span.html('<div></div>');

      expect( span.innerHTML ).to.equal( '<div></div>' );
    });

    it('should set span.green\'s html to all divs', function () {
      var span = document.querySelector('span.green');
      var divs = workspace.element.querySelectorAll('div');
      span.html(divs);

      expect( [].slice.call(span.children) ).to.deep.equal( [].slice.call(divs) );
    });

  });

  context('Element.path()', function() {

    it('should return element\'s path', function () {
      var span = document.querySelector('span.green');

      expect( document.querySelector(span.path()) ).to.be.equal( span );
    });

  });

  context('Element.prepend()', function() {

    it('should put #text at the begining of .workspace', function () {
      workspace.element.prepend(document.querySelector('#text'));

      expect( workspace.element.firstChild ).to.be.equal( document.querySelector('#text') );
    });

  });

  context('Element.q()', function() {

    it('should return span.green', function () {
      expect( workspace.element.q('span.green') ).to.be.equal( workspace.element.querySelector('span.green') );
    });

  });

  context('Element.query()', function() {

    it('should be equal to Element.q()', function () {
      expect( workspace.element.query ).to.be.equal( workspace.element.q );
    });

  });

  context('Element.qq()', function() {

    it('should return all spans', function () {
      expect( workspace.element.qq('span') ).to.deep.equal( [].slice.call(workspace.element.querySelectorAll('span')) );
    });

  });

  context('Element.query.all()', function() {

    it('should be equal to Element.qq()', function () {
      expect( workspace.element.query.all ).to.be.equal( workspace.element.qq );
    });

    it('should be equal to Element.q.all()', function () {
      expect( workspace.element.query.all ).to.be.equal( workspace.element.q.all );
    });

  });

  context('Element.text()', function() {

    it('should clear span.green', function () {
      var span = document.querySelector('span.green');
      span.text('');

      expect( span.childNodes ).to.have.lengthOf( 1 );
      expect( span.childNodes[0].nodeValue ).to.equal( '' );
    });

    it('should return span.green\'s text', function () {
      var span = document.querySelector('span.green');

      expect( span.text() ).to.equal( span.textContent );
    });

    it('should set span.green\'s text to <div></div>', function () {
      var span = document.querySelector('span.green');
      span.text('<div></div>');

      expect( span.childNodes ).to.have.lengthOf( 1 );
      expect( span.childNodes[0].nodeValue ).to.equal( '<div></div>' );
    });

    it('should set span.green\'s text to array of strings', function () {
      var span = document.querySelector('span.green');
      span.text(['well', ' ', 'then']);

      expect( span.childNodes ).to.have.lengthOf( 1 );
      expect( span.childNodes[0].nodeValue ).to.equal( 'well then' );
    });

  });











});
