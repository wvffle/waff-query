(->
  # Polyfill
  # IE support
  try
    new Event 'waff :3'
  catch err
    window.Event = (name, init) ->
      init ?= {}
      ev = document.createEvent 'Event'
      ev.initEvent name, !!init.bubbles, !!init.cancelable
      ev
)()
