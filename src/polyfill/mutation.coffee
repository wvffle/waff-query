do ->
  try
    window.MutationObserver = window.MutationObserver or window.WebKitMutationObserver or window.MozMutationObserver or do -> throw '-,-'
  catch _
    class MutationObserver
      constructor: (@callback) ->
        @elements = []
      observe: (element, init) ->
        @elements.push element
        if init.childList == true
          element.on 'DOMNodeInserted', (e) =>
            return unless e.relatedNode == e.currentTarget or init.subtree == true
            @callback [
              target: e.relatedNode
              type: 'childList'
              addedNodes: [ e.target ]
              removedNodes: []
            ]
          element.on 'DOMNodeRemoved', (e) =>
            return unless e.relatedNode == e.currentTarget or init.subtree == true
            @callback [
              target: e.relatedNode
              type: 'childList'
              removedNodes: [ e.target ]
              addedNodes: []
            ]
        if init.attributes == true
          element.on 'DOMAttrModified', (e) =>
            return unless e.target == e.currentTarget or init.subtree == true
            p =
              target: e.target
              type: 'attributes'
              attributeName: e.attrName
            if init.attributeOldValue == true
              p.oldValue = e.prevValue
            @callback [ p ]
        if init.characterData == true
          element.on 'DOMCharacterDataModified', (e) =>
            return unless e.target == e.currentTarget or init.subtree == true
            p =
              target: e.target
              type: 'characterData'
            if init.characterDataOldValue == true
              p.oldValue = e.prevValue
            @callback [ p ]
      disconnect: ->
        for element in @elements
          element.off 'DOMNodeInserted'
          element.off 'DOMNodeRemoved'
          element.off 'DOMAttrModified'
          element.off 'DOMCharacterDataModified'
    window.MutationObserver = MutationObserver
