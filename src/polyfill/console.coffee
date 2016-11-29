do ->
  # Polyfill
  # IE support
  unless window.console
    window.console =
      log: ->
      warn: ->
      error: ->
