[![Bower](https://img.shields.io/bower/v/waff-query.svg?maxAge=3600&style=flat-square)]()
[![npm](https://img.shields.io/npm/v/waff-query.svg?maxAge=3600&style=flat-square)]()
[![license](https://img.shields.io/github/license/wvffle/waff-query.js.svg?maxAge=3600&style=flat-square)]()
[![GitHub issues](https://img.shields.io/github/issues/wvffle/waff-query.js.svg?maxAge=3600&style=flat-square)]()
<!-- 
[![npm](https://img.shields.io/npm/dt/waff-query.svg?maxAge=3600&style=flat-square)]()
[![Waffle.io](https://img.shields.io/waffle/label/wvffle/waff-query.js/in%20progress.svg?maxAge=3600&style=flat-square)]()
-->

# Global functions
<a name="waff"></a>

## waff : <code>object</code>
ok

**Kind**: global namespace  

* [waff](#waff) : <code>object</code>
    * _instance_
        * [.query(qs, [root])](#waff+query) ⇒ <code>Element</code> &#124; <code>null</code>
            * [.all(qs, [root])](#waff+query.all) ⇒ <code>Array.&lt;Element&gt;</code>
        * [.element(cs)](#waff+element) ⇒ <code>Element</code>
        * [.text(t)](#waff+text) ⇒ <code>TextNode</code>
        * [.get(url, options)](#waff+get) ⇒ <code>[Promise](#waff.Promise)</code>
        * [.post(url, data, options)](#waff+post) ⇒ <code>[Promise](#waff.Promise)</code>
    * _static_
        * [.Promise](#waff.Promise) ⇐ <code>[EventEmitter](#waff.EventEmitter)</code>
            * [new Promise(executor)](#new_waff.Promise_new)
            * [.then(onFulfill, [onReject])](#waff.Promise.then)
            * [.catch(onReject)](#waff.Promise.catch)
            * ["fulfill"](#waff.Promise.event_fulfill)
            * ["reject"](#waff.Promise.event_reject)
        * [.EventEmitter](#waff.EventEmitter)
            * [.on(event, handler, [capture])](#waff.EventEmitter.on)
            * [.once(event, handler, [capture])](#waff.EventEmitter.once)
            * [.off(event, [handler], [capture])](#waff.EventEmitter.off)
            * [.emit(event, [data])](#waff.EventEmitter.emit)

<a name="waff+query"></a>

### waff.query(qs, [root]) ⇒ <code>Element</code> &#124; <code>null</code>
Query single element

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>Element</code> &#124; <code>null</code> - - Returns found element or null  

| Param | Type | Description |
| --- | --- | --- |
| qs | <code>String</code> | Query Selector |
| [root] | <code>Element</code> &#124; <code>Array</code> &#124; <code>NodeList</code> | Element to perform query on |

**Example**  
```js
var body = waff.query('body')
var body = waff.q('body')
```
<a name="waff+query.all"></a>

#### query.all(qs, [root]) ⇒ <code>Array.&lt;Element&gt;</code>
Query all elements

**Kind**: static method of <code>[query](#waff+query)</code>  
**Returns**: <code>Array.&lt;Element&gt;</code> - - Returns found elements  

| Param | Type | Description |
| --- | --- | --- |
| qs | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Query Selector |
| [root] | <code>Element</code> &#124; <code>Array</code> &#124; <code>NodeList</code> | Element to perform query on |

**Example**  
```js
var divs = waff.query.all('div')
var divs = waff.qq('div')
var divs = waff.q.all('div')
```
<a name="waff+element"></a>

### waff.element(cs) ⇒ <code>Element</code>
Creates element by CSS selector

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>Element</code> - - Returns new element  

| Param | Type | Description |
| --- | --- | --- |
| cs | <code>String</code> | CSS Selector |

**Example**  
```js
waff.element('.white-text')
```
<a name="waff+text"></a>

### waff.text(t) ⇒ <code>TextNode</code>
Creates TextNode

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>TextNode</code> - - Returns new TextNode  

| Param | Type | Description |
| --- | --- | --- |
| t | <code>String</code> | Text |

**Example**  
```js
var text = waff.text('The number of a waffle')
text.set('<div></div>')
text.get() // &lt;div&gt;&lt;/div&gt;
```
<a name="waff+get"></a>

### waff.get(url, options) ⇒ <code>[Promise](#waff.Promise)</code>
Performs XHR GET

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>[Promise](#waff.Promise)</code> - - Returns promise of request  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to get |
| options | <code>Object</code> | `json` (boolean) - determines if response is json. Default - `false` <br> `timeout` (number) - determines timeout in ms. Default - `2000` |

**Example**  
```js
waff.get('https://wvffle.net')
  .then(function(res){

  })
  .catch(function(err){

  })
```
<a name="waff+post"></a>

### waff.post(url, data, options) ⇒ <code>[Promise](#waff.Promise)</code>
Performs XHR POST

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>[Promise](#waff.Promise)</code> - - Returns promise of request  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to post |
| data | <code>Object</code> | POST data |
| options | <code>Object</code> | `json` (boolean) - determines if response is json. Default - `false` <br> `form` (boolean) - determines if data should be converted to FormData or just pure JSON. Default - `true` <br> `timeout` (number) - determines timeout in ms. Default - `2000` |

**Example**  
```js
waff.post('http://httpbin.org/post', { waffle_id: 666 })
  .then(function(res){

  })
  .catch(function(err){

  })
```
<a name="waff.Promise"></a>

### waff.Promise ⇐ <code>[EventEmitter](#waff.EventEmitter)</code>
Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.

**Kind**: static class of <code>[waff](#waff)</code>  
**Extends:** <code>[EventEmitter](#waff.EventEmitter)</code>  
**Emits**: <code>event:fulfill</code>, <code>event:reject</code>  

* [.Promise](#waff.Promise) ⇐ <code>[EventEmitter](#waff.EventEmitter)</code>
    * [new Promise(executor)](#new_waff.Promise_new)
    * [.then(onFulfill, [onReject])](#waff.Promise.then)
    * [.catch(onReject)](#waff.Promise.catch)
    * ["fulfill"](#waff.Promise.event_fulfill)
    * ["reject"](#waff.Promise.event_reject)

<a name="new_waff.Promise_new"></a>

#### new Promise(executor)

| Param | Type | Description |
| --- | --- | --- |
| executor | <code>function</code> | Executor function |

<a name="waff.Promise.then"></a>

#### Promise.then(onFulfill, [onReject])
Adds handler when fulfilled or rejected

**Kind**: static method of <code>[Promise](#waff.Promise)</code>  

| Param | Type | Description |
| --- | --- | --- |
| onFulfill | <code>function</code> | Fulfiull function |
| [onReject] | <code>function</code> | Reject function |

**Example**  
```js
var promise = new waff.Promise(function(){})
promise.then(function(){

})
```
<a name="waff.Promise.catch"></a>

#### Promise.catch(onReject)
Adds handler when rejected

**Kind**: static method of <code>[Promise](#waff.Promise)</code>  

| Param | Type | Description |
| --- | --- | --- |
| onReject | <code>function</code> | Reject function |

**Example**  
```js
var promise = new waff.Promise(function(){})
promise.catch(function(){

})
```
<a name="waff.Promise.event_fulfill"></a>

#### "fulfill"
Event emitted on fulfill

**Kind**: event emitted by <code>[Promise](#waff.Promise)</code>  
**Example**  
```js
var promise = new waff.Promise(function(){})
promise.on('fulfill', function(){
 // same as promise.then
})
```
<a name="waff.Promise.event_reject"></a>

#### "reject"
Event emitted on reject

**Kind**: event emitted by <code>[Promise](#waff.Promise)</code>  
**Example**  
```js
var promise = new waff.Promise(function(){})
promise.on('reject', function(){
 // same as promise.catch
})
```
<a name="waff.EventEmitter"></a>

### waff.EventEmitter
Own implementation of EventEmitter. (untested)

**Kind**: static class of <code>[waff](#waff)</code>  

* [.EventEmitter](#waff.EventEmitter)
    * [.on(event, handler, [capture])](#waff.EventEmitter.on)
    * [.once(event, handler, [capture])](#waff.EventEmitter.once)
    * [.off(event, [handler], [capture])](#waff.EventEmitter.off)
    * [.emit(event, [data])](#waff.EventEmitter.emit)

<a name="waff.EventEmitter.on"></a>

#### EventEmitter.on(event, handler, [capture])
Adds handler for event

**Kind**: static method of <code>[EventEmitter](#waff.EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | name of event |
| handler | <code>function</code> | Handler function |
| [capture] | <code>Boolean</code> | Use capture |

**Example**  
```js
var ee = new waff.EventEmitter();
// Single event binding
ee.on('event-name', function(data){})
// Multi event binding
ee.on(['event-name', 'event-name2'], function(data){})
```
<a name="waff.EventEmitter.once"></a>

#### EventEmitter.once(event, handler, [capture])
Adds handler only for one event emit

**Kind**: static method of <code>[EventEmitter](#waff.EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | name of event |
| handler | <code>function</code> | Handler function |
| [capture] | <code>Boolean</code> | Use capture |

**Example**  
```js
var ee = new waff.EventEmitter();
// Single event binding
ee.once('event-name', function(data){})
// Multi event binding
ee.once(['event-name', 'event-name2'], function(data){})
```
<a name="waff.EventEmitter.off"></a>

#### EventEmitter.off(event, [handler], [capture])
Removes specific event handler

**Kind**: static method of <code>[EventEmitter](#waff.EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | name of event |
| [handler] | <code>function</code> | Handler function |
| [capture] | <code>Boolean</code> | Use capture |

**Example**  
```js
var ee = new waff.EventEmitter();
// Single event unbinding for a specific handler
ee.off('event-name', function(){})
// Multi event unbinding for a specific handler
ee.off(['event-name', 'event-name2'], function(){})
// Unbinding all handlers for event
ee.off('event-name')
```
<a name="waff.EventEmitter.emit"></a>

#### EventEmitter.emit(event, [data])
Emits event

**Kind**: static method of <code>[EventEmitter](#waff.EventEmitter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | name of event |
| [data] | <code>Object</code> | Data to pass |

**Example**  
```js
var ee = new waff.EventEmitter();
// Emitting event
ee.emit('event-name')
// Emitting event with data
ee.emit('event-name', {my: 'data'})
```
# Content manipulation
<a name="Element+html"></a>

## Element.html([html])
Sets text of Element to the given string

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| [html] | <code>String</code> | html string to set |

**Example**  
```js
var span = waff.element('span')
span.html('<div></div>')
span.html() // <div></div> as a string
```

<a name="Element+text"></a>

## Element.text([text])
Sets text of Element to the given string

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| [text] | <code>String</code> | text to set |

**Example**  
```js
var span = waff.element('span')
span.text('<div></div>')
span.text() // <div></div> as a string
```


<a name="Element+append"></a>

## Element.append(element)
Adds element at the end

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | element to append |

**Example**  
```js
var span = waff.element('span.red')
var body = waff.element('body')
body.append(span
// body
//   <content>
//   span.red
```

<a name="Element+prepend"></a>

## Element.prepend(element)
Adds element at the beginning

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | element to prepend |

**Example**  
```js
var span = waff.element('span.red')
var body = waff.element('body')
body.prepend(span)
// body
//   span.red
//   <content>
```

<a name="Element+after"></a>

## Element.after(element)
Adds element after

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | element to add |

**Example**  
```js
var span = waff.element('span.red')
var div = waff.element('div')
waff.query('body').append(span)
div.after(span)
// body
//   span.red
//   div
```

<a name="Element+before"></a>

## Element.before(element)
Adds element before

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | element to add |

**Example**  
```js
var span = waff.element('span.red')
var div = waff.element('div')
waff.query('body').append(span)
div.before(span)
// body
//   div
//   span.red
```


<a name="Element+attr"></a>

## Element.attr(attr, [value])
Sets attributes of element

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>String</code> &#124; <code>Object</code> | attribute name or object with values |
| [value] | <code>String</code> | attribute value |

**Example**  
```js
var span = waff.element('span.red')
span.attr('name', 'waffles!')
span.attr({'name': 'waffles!', 'sth': true})
```

<a name="Element+path"></a>

## Element.path()
Get unique path of an element

**Kind**: instance method of <code>Element</code>  
**Example**  
```js
waff.element('body').path() // html > body:nth-child(2)
```


# TextNode value manipulation
<a name="Text+get"></a>

## Text.get()
get nodeValue easier

**Kind**: instance method of <code>Text</code>  
**Example**  
```js
var text = waff.text('The number of a waffle')
text.get() // The number of a waffle
```

<a name="Text+set"></a>

## Text.set()
set nodeValue easier

**Kind**: instance method of <code>Text</code>  
**Example**  
```js
var text = waff.text('The number of a waffle')
text.set('666')
text.get() // 666 as a string
```


# Changing css
<a name="Element+css"></a>

## Element.css(attr, [value])
Get or set  elements CSS

**Kind**: instance method of <code>Element</code>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>String</code> &#124; <code>Object</code> | attribute name or object with values |
| [value] | <code>String</code> | attribute value |

**Example**  
```js
waff.element('body').css() // Object containing all properties
waff.element('body').css('background-color') // Only `background-color`
waff.element('body').css('background-color', '#f00') // sets `background-color` to #f00
waff.element('body').css({'background-color': '#f00', 'color', '#ffa500'}) // sets `background-color` to #f00 and `color` to #ffa500
```

