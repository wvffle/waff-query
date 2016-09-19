describe 'parse()', ->
  it 'should correctly parse empty function', ->
    s = ps ''
    expect s.tag
    	.to.be.false
    expect s.attr
    	.to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

  it 'should correctly parse plain div', ->
    s = ps 'div'
    expect s.tag
    	.to.be.equal 'div'
    expect s.attr
    	.to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

  it 'should correctly parse div#id', ->
    s = ps 'div#id'
    expect s.tag
    	.to.be.equal 'div'
    expect s.attr
    	.to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.equal 'id'

  it 'should correctly parse div.cls1.cls2', ->
    s = ps 'div.cls1.cls2'
    expect s.tag
    	.to.be.equal 'div'
    expect s.attr
    	.to.be.false
    expect s.class
    	.to.have.lengthOf 2
    expect s.class
    	.to.include 'cls1'
      .and.to.include 'cls2'
    expect s.id
    	.to.be.false

  it 'should correctly parse div#id.cls1.cls2', ->
    s = ps 'div#id.cls1.cls2'
    expect s.tag
    	.to.be.equal 'div'
    expect s.attr
    	.to.be.false
    expect s.class
    	.to.have.lengthOf 2
    expect s.class
    	.to.include 'cls1'
     	.and.to.include 'cls2'
    expect s.id
    	.to.equal 'id'

  it 'should correctly parse div.cls1.cls2#id', ->
    s = ps 'div.cls1.cls2#id'
    expect s.tag
    	.to.be.equal 'div'
    expect s.attr
    	.to.be.false
    expect s.class
    	.to.have.lengthOf 2
    expect s.class
    	.to.include 'cls1'
      .and.to.include 'cls2'
    expect s.id
    	.to.equal 'id'

  it 'should correctly parse div.cls1#id.cls2', ->
    s = ps 'div.cls1#id.cls2'
    expect s.tag
    	.to.be.equal 'div'
    expect s.attr
    	.to.be.false
    expect s.class
    	.to.have.lengthOf 2
    expect s.class
    	.to.include 'cls1'
      .and.to.include 'cls2'
    expect s.id
    	.to.equal 'id'

  it 'should correctly parse [name]', ->
    s = ps '[name]'
    expect s.tag
    	.to.be.false
    expect s.attr
    	.to.be.an 'object'
    expect s.attr
    	.to.ownProperty 'name'
    expect s.attr.name.operator
      .to.be.false
    expect s.attr.name.value
      .to.be.false
    expect s.attr.name.caseSensitive
      .to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

  it 'should correctly parse [name][type]', ->
    s = ps '[name][type]'
    expect s.tag
    	.to.be.false
    expect s.attr
    	.to.be.an 'object'
    expect s.attr
    	.to.ownProperty 'name'
    expect s.attr
    	.to.ownProperty 'type'
    expect s.attr.name.operator
      .to.be.false
    expect s.attr.name.value
      .to.be.false
    expect s.attr.name.caseSensitive
      .to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

  it 'should not parse [=name]', ->
    s = ps '[=name]'
    expect s.tag
    	.to.be.false
    expect s.attr
      .to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

  it 'should not parse [name=]', ->
    s = ps '[name=]'
    expect s.tag
    	.to.be.false
    expect s.attr
      .to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

  it 'should correctly parse [name=asd]', ->
    s = ps '[name=asd]'
    expect s.tag
    	.to.be.false
    expect s.attr
    	.to.be.an 'object'
    expect s.attr
    	.to.ownProperty 'name'
    expect s.attr.name.operator
      .to.be.equal '='
    expect s.attr.name.value
      .to.be.equal 'asd'
    expect s.attr.name.caseSensitive
      .to.be.false
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

  it 'should correctly parse [name=asd i]', ->
    s = ps '[name=asd i]'
    expect s.tag
    	.to.be.false
    expect s.attr
    	.to.be.an 'object'
    expect s.attr
    	.to.ownProperty 'name'
    expect s.attr.name.operator
      .to.be.equal '='
    expect s.attr.name.value
      .to.be.equal 'asd'
    expect s.attr.name.caseSensitive
      .to.be.true
    expect s.class
    	.to.have.lengthOf 0
    expect s.id
    	.to.be.false

describe 'ps()', ->
  it 'should be same as selector.parse()', ->
    expect selector.parse
    	.to.be.equal ps
