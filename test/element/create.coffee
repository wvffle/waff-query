describe 'e()', ->

  beforeEach ->
    workspace.reset()

  it 'should create plain div', ->
    div = e 'div'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal ''
    expect div.id
    	.to.equal ''

  it 'should create plain div without providing args', ->
    div = e()
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal ''
    expect div.id
    	.to.equal ''

  it 'should create div.red', ->
    div = e 'div.red'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'red'
    expect div.id
    	.to.equal ''

  it 'should create div.red without providing tag name', ->
    div = e '.red'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'red'
    expect div.id
    	.to.equal ''

  it 'should create div#text', ->
    div = e 'div#text'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal ''
    expect div.id
    	.to.equal 'text'

  it 'should create div#text without providing tag name', ->
    div = e '#text'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal ''
    expect div.id
    	.to.equal 'text'

  it 'should create div#text.cl1.cl2', ->
    div = e 'div#text.cl1.cl2'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'cl1 cl2'
    expect div.id
    	.to.equal 'text'

  it 'should create div#text.cl1.cl2 without providing tag name', ->
    div = e '#text.cl1.cl2'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'cl1 cl2'
    expect div.id
    	.to.equal 'text'

  it 'should create div.cl1.cl2#text', ->
    div = e 'div.cl1.cl2#text'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'cl1 cl2'
    expect div.id
    	.to.equal 'text'

  it 'should create div#text.cl1.cl2 without providing tag name', ->
    div = e '.cl1.cl2#text'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'cl1 cl2'
    expect div.id
    	.to.equal 'text'

  it 'should create div.cl1#text.cl2', ->
    div = e 'div.cl1#text.cl2'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'cl1 cl2'
    expect div.id
    	.to.equal 'text'

  it 'should create div#text.cl1.cl2 without providing tag name', ->
    div = e '.cl1#text.cl2'
    expect div.tagName.toLowerCase()
    	.to.be.equal 'div'
    expect div.className
   		.to.equal 'cl1 cl2'
    expect div.id
    	.to.equal 'text'

describe 'element()', ->
  it 'should be same as e()', ->
    expect element
    	.to.be.equal e
