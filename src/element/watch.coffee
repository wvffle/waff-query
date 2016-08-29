###*
# @function
# @typicalname Element.prototype.watch
# @desc Observes for DOM changes
# @param {MutationObserverInit} [options] - MutationObserver options
# @fires attr change
# @fires attr:*
# @fires child add
# @fires child remove
# @fires text change
# @example
# var element = waff.query('span.red')
# element.watch()
###
Element::watch = (options) ->
  unless @_observer?
    @_observer = new MutationObserver (mutations) =>
      for m in mutations
        if m.type == 'attributes'
          knownattrs = [ 'class', 'id', 'style', 'href', 'src' ]
          event = { target: m.target, attr: m.attributeName, oldValue: m.oldValue, value: m.target.attr m.attributeName }
          if -1 != knownattrs.indexOf m.attributeName
            @emit m.attributeName+' change', event
          ###*
          # @event Element.prototype.watch.attr change
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
          # @event Element.prototype.watch.attr:*
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
        if m.type = 'childList'
          if m.addedNodes.length > 0
            ###*
            # @event Element.prototype.watch.child add
            # @desc Event emitted on child addition
            # @example
            # element.on('child add', function(e){
            #  // e.target
            #  // e.nodes
            # })
            ###
            @emit 'child add', { target: m.target, nodes: m.addedNodes }
          if m.removedNodes.length > 0
            ###*
            # @event Element.prototype.watch.child remove
            # @desc Event emitted on child remove
            # @example
            # element.on('child remove', function(e){
            #  // e.target
            #  // e.nodes
            # })
            ###
            @emit 'child remove', { target: m.target, nodes: m.removedNodes }
        if m.type = 'characterData'
          ###*
          # @event Element.prototype.watch.text change
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
