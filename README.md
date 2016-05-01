### Querying elements

To query an element just use `q(selector)`. You can call it either on the `window` or any instance of `Element`.

```js
  var header = q('header');
  var nav = header.q('nav');
```

For multiple query just use `qq(selector)` which is a replacement for `document.querySelectorAll(selector)` but it's returned as an   `Array` instead of `NodeList` so you can easily call functions like `forEach` or other like that.

```js
  var containers = qq('.container');
  var rows = [];
  containers.forEach(function(element){
    rows.push(element.qq('.row'));
  });
```

You can also query elements inside an array.

```js
  var images = qq('img');
  var logo = q('#logo', images);
  var thumbnails = qq('.thumbnails', images);
```

### Getting element path

You can get unique path of `Element` instance by calling `Element.prototype.path()`

```js
  var path = q('.logo').path(); // html > body:nth-child(2) > main:nth-child(2) > div:nth-child(2)
```

### Parsing selector string

`gs` is an easy function to parse selector string.

```js
  var selector = gs('div#header.white-text');
  //  {
  //    tag: 'div',
  //    id: 'header',
  //    classList: [ 'white-text' ]
  //  }
  var selector2 = gs('.right.red-text');
  //  {
  //    tag: false,
  //    id: false,
  //    classList: [ 'right', 'red-text' ]
  //  }
  var selector3 = gs('div');
  //  {
  //    tag: 'div',
  //    id: false,
  //    classList: []
  //  }
  
```

### Binding events
Well, there is a nice replacement for `Element.prototype.addEventListener(onEvent, function)` which is actually `Element.prototype.on(event, function)`
```js
  var logo = q('.logo');
  logo.on('click', function(ev){
    this.classList.add('clicked');
    ev.preventDefault();
  })
```
Below you can find a list of supported classes. If you want to add more just create pull request or new issue.
 * `Element`
 * `Text`
 * `Window`
 * `Document`
 * `FormData`
 * `FileReader`
 * `XMLHttpRequest`

### Manipulating content

To create a text node you can use `t(text)`
Then you can set or get elements text by `Text.prototype.set(text)` and `Text.prototype.get()`
```js
  var logoText = t('my app');
  logoText.set(logoText.get().replace(' ', ' awesome '));
```
You can also easily create elements with selectors.
```js
  var logo = e('img.logo'); // Creates <img class='logo'>
  e.src = '/img/logo.png';
```
To append one element to another just use `Element.prototype.append(element)`
```js
  var div = e('#logo'); // Creates <div id='logo'>
  div.append(logo);
  div.append(logoText);
  q('header').append(div);
```
To get or set html or text of element use `Element.prototype.html(html)` and `Element.prototype.html(text)`.
```js
  var html = q('html').html();
  q('body').html('<div class="red">hello.</div>');
  q('.red').text(html);
  console.log(q('.red').text());
```

###Observing element changes

To observe an element changes you must initiate the observer by `Element.prototype.observe()`
You can also disable element observation by `Element.prototype.stopObserving()`
Mutations can be accessed by `mutation` event triggered on `Element` instance
```js
  var html = q('html');
  html.observe()
  html.on('mutation', function(mutation){
    console.log(mutation)
  })
```

###Manipulating CSS

You can also change or get CSS of the element with  `Element.prototype.css(css, ignoreDefaults)`
```js
  var body = q('body');
  body.css({
    color: 'red',
    background: 'rgba(0,0,0,'+Math.random()+')'
  })
  var wholeCSS = body.css();
  var onlyModifiedCSS = body.css(true);
  
  var onlyColor = body.css('color');
  
```
