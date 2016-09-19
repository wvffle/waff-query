do ->
  try
    EventTarget::waff = ':3'
    # firefox 4 support
    throw '' unless EventTarget::waff == Element::waff

    [ EventTarget ]
  catch
    targets = [
      Element
      Document
      Node
      # after polyfill
      FormData
      # safari 5.1 support
      window.constructor
    ]
    targets.push window.XMLHttpRequest if 'XMLHttpRequest' of window
    targets.push window.FileReader if 'FileReader' of window
    targets.push window.Blob if 'Blob' of window
    targets
