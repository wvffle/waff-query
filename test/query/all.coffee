describe 'qq()', ->

  beforeEach ->
    workspace.reset()

  it 'should return all spans', ->
    expect [].slice.call document.querySelectorAll 'span'
    	.to.deep.equal qq 'span'

  it 'should return all div.red', ->
    expect [].slice.call document.querySelectorAll 'div.red'
    	.to.deep.equal qq 'div.red'

  it 'should find all span.green in Array and NodeList', ->
    expect [].slice.call document.querySelectorAll 'span.green'
    	.to.deep.equal qq '.green', [].slice.call document.querySelectorAll 'span'
    expect [].slice.call document.querySelectorAll 'span.green'
    	.to.deep.equal qq '.green', document.querySelectorAll 'span'

  it 'should find all span.green and dir.red', ->
    arr = [].slice.call document.querySelectorAll 'span.green'
    arr2 = [].slice.call document.querySelectorAll 'div.red'
    arr.push.apply arr, arr2
    expect arr
    	.to.deep.equal qq [
      	'span.green'
      	'div.red'
    	]

  it 'should find body', ->
    expect [ document.body ]
    	.to.deep.equal qq()

  it 'should find *', ->
    expect [].slice.call document.querySelectorAll '*'
    	.to.deep.equal qq ''

describe 'query.all()', ->

  beforeEach ->
    workspace.reset()

  it 'should be same as qq()', ->
    expect query.all
    	.to.be.equal qq

  it 'should be same as q.all()', ->
    expect query.all
    	.to.be.equal q.all
