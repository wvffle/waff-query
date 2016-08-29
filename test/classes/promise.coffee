console.warn 'cannot perform promise tests with mocha'

# it should resolve
p = new waff.Promise (res) ->
  setTimeout res
p.then ->
  console.log '[1] passed'

# it should resolve with args
p = new waff.Promise (res) ->
  setTimeout ->
    res '!', '#'
p.then (arg, arg2) ->
  passed = arg == '!' and arg2 == '#'
  console.warn arguments unless passed == true
  console.log '[2] ' + (if passed == true then '' else 'not ') + 'passed'

# it should reject
p = new waff.Promise (res, rej) ->
  setTimeout rej
p.then ->
  console.log '[3] not passed'
p.catch ->
  console.log '[3] passed'

# it should reject with args
p = new waff.Promise (res, rej) ->
  setTimeout ->
    rej '!', '#'
p.then ->
  console.log '[4] not passed'
p.catch (arg, arg2) ->
  passed = arg == '!' and arg2 == '#'
  console.warn arguments unless passed == true
  console.log '[4] ' + (if passed == true then '' else 'not ') + 'passed'

# it should resolve manually
p = new waff.Promise ->
p.then ->
  console.log '[5] passed'
((p)->setTimeout ->p.resolve()) p

# it should resolve manually with args
p = new waff.Promise ->
p.then (arg, arg2) ->
  passed = arg == '!' and arg2 == '#'
  console.warn arguments unless passed == true
  console.log '[6] ' + (if passed == true then '' else 'not ') + 'passed'
((p)->setTimeout ->p.resolve '!', '#') p

# it should reject manually
p = new waff.Promise ->
p.catch ->
  console.log '[7] passed'
((p)->setTimeout ->p.reject()) p

# it should reject manually with args
p = new waff.Promise ->
p.catch (arg, arg2) ->
  passed = arg == '!' and arg2 == '#'
  console.warn arguments unless passed == true
  console.log '[8] ' + (if passed == true then '' else 'not ') + 'passed'
((p)->setTimeout ->p.reject '!', '#') p
