## query.js
A simple tool for faster querySelector usage.

## Querying elements

To query an element just use `q(selector)`.

```js
  var body = q('head');
```

For multiple query just use `qq(selector)` which is a replacement for `document.querySelectorAll(selector)`.
You can call it either on the `window` or any instance of `Element`.
```js
  var containers = qq('.container');
  var rows = [];
  for(var i = 0; i<containers.length;i++) {
    rows.push(containers[i].qq('.row'))
  }
```
