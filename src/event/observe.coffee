Element::observe = ->
  unless @_observer?
    @_observerHandlers = []
    @_observer = new MutationObserver (mutations) =>
      for handler in @_observerHandlers
        for mutation in mutations
          handler.call @, mutation
      return @
    config =
      attributes: true
      childList: true
      characterData: true
      subtree: true
      attributeOldValue: true
      characterDataOldValue: true
    @_observer.observe @, config
  @
  
Element::stopObserving = ->
  if @_observer?
    @_observer.disconnect()
    delete @_observer
  @
