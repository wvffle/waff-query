###*
# @function Element#watch
# @typicalname Element#watch
# @desc Observes for DOM changes
# @param {MutationObserverInit} [options={ attributes: true, childList: true, characterData: true, attributeOldValue: true, characterDataOldValue: true, subtree: false }] - MutationObserver options
# @fires attr:*
# @fires attr change
# @fires child add
# @fires child remove
# @fires text change
# @example
# var element = waff.query('span.red')
# element.watch()
###
Node::watch = (options) ->
  unless @_observer?
    @_observer = new MutationObserver (mutations) =>
      for m in mutations
        if m.type == 'attributes'
          knownattrs = [ 'class', 'id', 'style', 'href', 'src' ]
          event = { target: m.target, attr: m.attributeName, oldValue: m.oldValue, value: m.target.attr m.attributeName }
          unless -1 == waff.__index knownattrs, m.attributeName
            @emit m.attributeName+' change', event
          ###*
          # @event Element#watch.attr change
          # @desc Event emitted on attribute change
          # @example
          # element.on('attr change', function(e){
          #  // e.target
          #  // e.attr
          #  // e.value
          #  // e.oldValue
          # })
          ###
          @emit 'attr change', event
          @emit 'attr:*', event
          ###*
          # @event Element#watch.attr:*
          # @desc Event emitted on specific attribute change
          # @example
          # element.on('attr:class', function(e){
          #  // e.target
          #  // e.attr
          #  // e.value
          #  // e.oldValue
          # })
          ###
          @emit 'attr:'+m.attributeName, event
        else if m.type == 'childList'
          if m.addedNodes.length > 0
            ###*
            # @event Element#watch.child add
            # @desc Event emitted on child addition
            # @example
            # element.on('child add', function(e){
            #  // e.target
            #  // e.nodes
            # })
            ###
            @emit 'child add', { target: m.target, nodes: waff.__toarray m.addedNodes }
          if m.removedNodes.length > 0
            ###*
            # @event Element#watch.child remove
            # @desc Event emitted on child remove
            # @example
            # element.on('child remove', function(e){
            #  // e.target
            #  // e.nodes
            # })
            ###
            @emit 'child remove', { target: m.target, nodes: waff.__toarray m.removedNodes }
        else if m.type == 'characterData'
          ###*
          # @event Element#watch.text change
          # @desc Event emitted on text change
          # @example
          # element.on('text change', function(e){
          #  // e.target
          #  // e.value
          #  // e.oldValue
          # })
          ###
          @emit 'text change', { target: m.target, oldValue: m.oldValue, value: m.target.get() }
      return @
    config =
      attributes: true
      childList: true
      characterData: true
      attributeOldValue: true
      characterDataOldValue: true
      subtree: false
    @_observer.observe @, config
  @

Array::watch = ->
  for element in @
    if element instanceof Element
      element.watch.apply element, arguments
  @
