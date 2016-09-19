do ->
  defineProp = (obj, prop, desc) ->
    try
      Object.defineProperty obj, prop, desc
    catch err
      if desc.get?
        Object::__defineGetter__.call obj, prop, desc.get
      if desc.set?
        Object::__defineSetter__.call obj, prop, desc.set
      if desc.value?
        obj[prop] = desc.value
  defineProp
