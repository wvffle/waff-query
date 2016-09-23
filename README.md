[![Bower](https://img.shields.io/bower/v/waff-query.svg?maxAge=3600&style=flat-square)](https://libraries.io/bower/waff-query)
[![npm](https://img.shields.io/npm/v/waff-query.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/waff-query)
[![license](https://img.shields.io/github/license/wvffle/waff-query.js.svg?maxAge=3600&style=flat-square)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/wvffle/waff-query.js.svg?maxAge=3600&style=flat-square)](https://github.com/wvffle/waff-query.js/issues)
<!--
[![npm](https://img.shields.io/npm/dt/waff-query.svg?maxAge=3600&style=flat-square)]()
[![Waffle.io](https://img.shields.io/waffle/label/wvffle/waff-query.js/in%20progress.svg?maxAge=3600&style=flat-square)]()
-->
# waff-query.js
This is a simple Document Object Model library for lazy people to make their things faster.

# Contents
 * [Contents](#contents)
 * [Browser support](#browser-support)
 * [Global functions](#global-functions)
 * [Element prototypes](#element-prototypes)
 * [Text prototypes](#text-prototypes)
 * [License](#license)

# Browser support

Function | Firefox 4+ | Safari 6+ | Opera 16+ | Chrome 18+ | IE 9+ | IE 10
--- | --- | --- | --- | --- | --- | ---
Element query | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
Element append | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
Element watch | ✓ | ✓ | ✓ | ✓ | ✓ | ?
Element create | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
EventEmitter | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
Promise | ✓ | ✓ | ✓ | ✓ | ✓ | ✓
XHR | ✓ | ✓ | ✓ | ✓ | ~ | ?

# Global functions
<a name="waff"></a>

## waff : <code>object</code>
**Kind**: global namespace  

* [waff](#waff) : <code>object</code>
    * [.EventEmitter](#waff+EventEmitter)
        * _instance_
            * [.on(event, handler, [capture])](#waff+EventEmitter+on) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
            * [.once(event, handler, [capture])](#waff+EventEmitter+once) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
            * [.off(event, [handler], [capture])](#waff+EventEmitter+off) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
            * [.emit(event, [data])](#waff+EventEmitter+emit) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * _static_
            * [.extend(object)](#waff+EventEmitter.extend) ⇒
    * [.Promise](#waff+Promise) ⇐ <code>[EventEmitter](#waff+EventEmitter)</code>
        * [new Promise(executor)](#new_waff+Promise_new)
        * [.then(onFulfill, [onReject])](#waff+Promise+then) ⇒ <code>[Promise](#waff+Promise)</code>
        * [.catch(onReject)](#waff+Promise+catch) ⇒ <code>[Promise](#waff+Promise)</code>
        * [.resolve()](#waff+Promise+resolve) ⇒ <code>[Promise](#waff+Promise)</code>
        * [.reject()](#waff+Promise+reject) ⇒ <code>[Promise](#waff+Promise)</code>
        * [.on(event, handler, [capture])](#waff+EventEmitter+on) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * [.once(event, handler, [capture])](#waff+EventEmitter+once) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * [.off(event, [handler], [capture])](#waff+EventEmitter+off) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * [.emit(event, [data])](#waff+EventEmitter+emit) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * ["fulfill"](#waff+Promise+event_fulfill)
        * ["reject"](#waff+Promise+event_reject)
    * [.query(selector, [root])](#waff+query) ⇒ <code>[Element](#Element)</code> &#124; <code>null</code>
        * [.all(selector, [root], [single])](#waff+query.all) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
    * [.element(selector)](#waff+element) ⇒ <code>[Element](#Element)</code>
    * [.text(str)](#waff+text) ⇒ <code>TextNode</code>
    * [.get(url, options)](#waff+get) ⇒ <code>[Promise](#waff+Promise)</code>
    * [.post(url, data, options)](#waff+post) ⇒ <code>[Promise](#waff+Promise)</code>

<a name="waff+EventEmitter"></a>

### waff.EventEmitter
Own implementation of EventEmitter. (untested)

**Kind**: instance class of <code>[waff](#waff)</code>  

* [.EventEmitter](#waff+EventEmitter)
    * _instance_
        * [.on(event, handler, [capture])](#waff+EventEmitter+on) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * [.once(event, handler, [capture])](#waff+EventEmitter+once) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * [.off(event, [handler], [capture])](#waff+EventEmitter+off) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
        * [.emit(event, [data])](#waff+EventEmitter+emit) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
    * _static_
        * [.extend(object)](#waff+EventEmitter.extend) ⇒

<a name="waff+EventEmitter+on"></a>

#### eventEmitter.on(event, handler, [capture]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Adds handler for event

**Kind**: instance method of <code>[EventEmitter](#waff+EventEmitter)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Name of event |
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
<a name="waff+EventEmitter+once"></a>

#### eventEmitter.once(event, handler, [capture]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Adds handler only for one event emit

**Kind**: instance method of <code>[EventEmitter](#waff+EventEmitter)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Name of event |
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
<a name="waff+EventEmitter+off"></a>

#### eventEmitter.off(event, [handler], [capture]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Removes specific event handler

**Kind**: instance method of <code>[EventEmitter](#waff+EventEmitter)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Name of event |
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
<a name="waff+EventEmitter+emit"></a>

#### eventEmitter.emit(event, [data]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Emits event

**Kind**: instance method of <code>[EventEmitter](#waff+EventEmitter)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of event |
| [data] | <code>Object</code> | Data to pass |

**Example**  
```js
var ee = new waff.EventEmitter();
// Emitting event
ee.emit('event-name')
// Emitting event with data
ee.emit('event-name', {my: 'data'})
```
<a name="waff+EventEmitter.extend"></a>

#### EventEmitter.extend(object) ⇒
Extends events on object

**Kind**: static method of <code>[EventEmitter](#waff+EventEmitter)</code>  
**Returns**: object  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | Object to extend |

**Example**  
```js
var obj = {};
EventEmitter.extend(obj);
obj.emit('event!')
```
<a name="waff+Promise"></a>

### waff.Promise ⇐ <code>[EventEmitter](#waff+EventEmitter)</code>
Own implementation of Promises. Can bind `this` to functions called in `then` and `catch` and also passes all arguments to them.

**Kind**: instance class of <code>[waff](#waff)</code>  
**Extends:** <code>[EventEmitter](#waff+EventEmitter)</code>  
**Emits**: <code>event:fulfill</code>, <code>event:reject</code>  

* [.Promise](#waff+Promise) ⇐ <code>[EventEmitter](#waff+EventEmitter)</code>
    * [new Promise(executor)](#new_waff+Promise_new)
    * [.then(onFulfill, [onReject])](#waff+Promise+then) ⇒ <code>[Promise](#waff+Promise)</code>
    * [.catch(onReject)](#waff+Promise+catch) ⇒ <code>[Promise](#waff+Promise)</code>
    * [.resolve()](#waff+Promise+resolve) ⇒ <code>[Promise](#waff+Promise)</code>
    * [.reject()](#waff+Promise+reject) ⇒ <code>[Promise](#waff+Promise)</code>
    * [.on(event, handler, [capture])](#waff+EventEmitter+on) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
    * [.once(event, handler, [capture])](#waff+EventEmitter+once) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
    * [.off(event, [handler], [capture])](#waff+EventEmitter+off) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
    * [.emit(event, [data])](#waff+EventEmitter+emit) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
    * ["fulfill"](#waff+Promise+event_fulfill)
    * ["reject"](#waff+Promise+event_reject)

<a name="new_waff+Promise_new"></a>

#### new Promise(executor)

| Param | Type | Description |
| --- | --- | --- |
| executor | <code>function</code> | Executor function |

<a name="waff+Promise+then"></a>

#### promise.then(onFulfill, [onReject]) ⇒ <code>[Promise](#waff+Promise)</code>
Adds handler when fulfilled or rejected

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[Promise](#waff+Promise)</code> - instance  

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
<a name="waff+Promise+catch"></a>

#### promise.catch(onReject) ⇒ <code>[Promise](#waff+Promise)</code>
Adds handler when rejected

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[Promise](#waff+Promise)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| onReject | <code>function</code> | Reject function |

**Example**  
```js
var promise = new waff.Promise(function(){})
promise.catch(function(){

})
```
<a name="waff+Promise+resolve"></a>

#### promise.resolve() ⇒ <code>[Promise](#waff+Promise)</code>
Resolves promise

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[Promise](#waff+Promise)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| ..arg | <code>\*</code> | Arguments to pass |

**Example**  
```js
var promise = new waff.Promise(function(){})
promise.resolve()
```
<a name="waff+Promise+reject"></a>

#### promise.reject() ⇒ <code>[Promise](#waff+Promise)</code>
Rejects promise

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[Promise](#waff+Promise)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| ..arg | <code>\*</code> | Arguments to pass |

**Example**  
```js
var promise = new waff.Promise(function(){})
promise.reject()
```
<a name="waff+EventEmitter+on"></a>

#### promise.on(event, handler, [capture]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Adds handler for event

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Name of event |
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
<a name="waff+EventEmitter+once"></a>

#### promise.once(event, handler, [capture]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Adds handler only for one event emit

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Name of event |
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
<a name="waff+EventEmitter+off"></a>

#### promise.off(event, [handler], [capture]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Removes specific event handler

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> &#124; <code>Array.&lt;String&gt;</code> | Name of event |
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
<a name="waff+EventEmitter+emit"></a>

#### promise.emit(event, [data]) ⇒ <code>[EventEmitter](#waff+EventEmitter)</code>
Emits event

**Kind**: instance method of <code>[Promise](#waff+Promise)</code>  
**Returns**: <code>[EventEmitter](#waff+EventEmitter)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | Name of event |
| [data] | <code>Object</code> | Data to pass |

**Example**  
```js
var ee = new waff.EventEmitter();
// Emitting event
ee.emit('event-name')
// Emitting event with data
ee.emit('event-name', {my: 'data'})
```
<a name="waff+Promise+event_fulfill"></a>

#### "fulfill"
Event emitted on fulfill

**Kind**: event emitted by <code>[Promise](#waff+Promise)</code>  
**Example**  
```js
var promise = new waff.Promise(function(){})
promise.on('fulfill', function(){
 // same as promise.then
})
```
<a name="waff+Promise+event_reject"></a>

#### "reject"
Event emitted on reject

**Kind**: event emitted by <code>[Promise](#waff+Promise)</code>  
**Example**  
```js
var promise = new waff.Promise(function(){})
promise.on('reject', function(){
 // same as promise.catch
})
```
<a name="waff+query"></a>

### waff.query(selector, [root]) ⇒ <code>[Element](#Element)</code> &#124; <code>null</code>
Query single element

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>[Element](#Element)</code> &#124; <code>null</code> - Returns found element or null  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> | <code>&#x27;body&#x27;</code> | CSS Selector |
| [root] | <code>[Element](#Element)</code> | <code>document</code> | Element to perform query on |

**Example**  
```js
var body = waff.query('body')
var body = waff.q('body')
```
<a name="waff+query.all"></a>

#### query.all(selector, [root], [single]) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
Query all elements

**Kind**: static method of <code>[query](#waff+query)</code>  
**Returns**: <code>[Array.&lt;Element&gt;](#Element)</code> - Returns found elements  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> | <code>&#x27;body&#x27;</code> | CSS Selector |
| [root] | <code>[Element](#Element)</code> | <code>document</code> | Element to perform query on |
| [single] | <code>Boolean</code> | <code>false</code> | Specifies if the query is single |

**Example**  
```js
var divs = waff.query.all('div')
var divs = waff.qq('div')
var divs = waff.q.all('div')
```
<a name="waff+element"></a>

### waff.element(selector) ⇒ <code>[Element](#Element)</code>
Creates element with CSS selector

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>[Element](#Element)</code> - Returns new element  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | CSS Selector |

**Example**  
```js
waff.element('.white-text')
```
<a name="waff+text"></a>

### waff.text(str) ⇒ <code>TextNode</code>
Creates TextNode

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>TextNode</code> - Returns new TextNode  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | Text |

**Example**  
```js
var text = waff.text('The number of a waffle')
text.set('<div></div>')
text.get() // &lt;div&gt;&lt;/div&gt;
```
<a name="waff+get"></a>

### waff.get(url, options) ⇒ <code>[Promise](#waff+Promise)</code>
Performs XHR GET

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>[Promise](#waff+Promise)</code> - Returns promise of request  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>String</code> |  | URL to get |
| options | <code>Object</code> |  | Options object |
| options.json | <code>Boolean</code> | <code>false</code> | Determines if response is json |
| options.timeout | <code>Boolean</code> | <code>2000</code> | Determines timeout in ms |

**Example**  
```js
waff.get('https://wvffle.net')
  .then(function(res){

  })
  .catch(function(err){

  })
```
<a name="waff+post"></a>

### waff.post(url, data, options) ⇒ <code>[Promise](#waff+Promise)</code>
Performs XHR POST

**Kind**: instance method of <code>[waff](#waff)</code>  
**Returns**: <code>[Promise](#waff+Promise)</code> - Returns promise of request  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>String</code> |  | URL to post |
| data | <code>Object</code> | <code>{}</code> | POST data |
| options | <code>Object</code> |  | Options object |
| options.json | <code>Boolean</code> | <code>false</code> | Determines if response is json |
| options.form | <code>Boolean</code> | <code>true</code> | Determines if data should be converted to FormData or just pure json |
| options.timeout | <code>Boolean</code> | <code>2000</code> | Determines timeout in ms |

**Example**  
```js
waff.post('http://httpbin.org/post', { waffle_id: 666 })
  .then(function(res){

  })
  .catch(function(err){

  })
```


# Element prototypes
<a name="Element"></a>

## Element
**Kind**: global class  

* [Element](#Element)
    * [.query(selector)](#Element+query) ⇒ <code>[Element](#Element)</code> &#124; <code>null</code>
        * [.all(selector)](#Element+query.all) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
    * [.append()](#Element+append)
    * [.prepend()](#Element+prepend)
    * [.before(element)](#Element+before)
    * [.after(element)](#Element+after)
    * [.text([text])](#Element+text)
    * [.html([html])](#Element+html)
    * [.path()](#Element+path)
    * [.css(attr, [value])](#Element+css)
    * [.attr(attr, [value])](#Element+attr)
    * [.clear()](#Element+clear)
    * [.classes()](#Element+classes)
        * [.has(class)](#Element+classes+has) ⇒
        * [.add(class)](#Element+classes+add) ⇒ <code>[classes](#Element+classes)</code>
        * [.remove(class)](#Element+classes+remove) ⇒ <code>[classes](#Element+classes)</code>
        * [.toggle(class)](#Element+classes+toggle) ⇒ <code>[classes](#Element+classes)</code>
    * [.unwatch()](#Element+unwatch)
    * [.clone([deep])](#Element+clone)
    * [.selector()](#Element+selector)

<a name="Element+query"></a>

### element.query(selector) ⇒ <code>[Element](#Element)</code> &#124; <code>null</code>
Query single element

**Kind**: instance method of <code>[Element](#Element)</code>  
**Returns**: <code>[Element](#Element)</code> &#124; <code>null</code> - Returns found element or null  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> | <code>&#x27;body&#x27;</code> | CSS Selector |

**Example**  
```js
var nav = document.body.query('nav')
```
<a name="Element+query.all"></a>

#### query.all(selector) ⇒ <code>[Array.&lt;Element&gt;](#Element)</code>
Query single element

**Kind**: static method of <code>[query](#Element+query)</code>  
**Returns**: <code>[Array.&lt;Element&gt;](#Element)</code> - Returns found elements  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>String</code> | <code>&#x27;body&#x27;</code> | CSS Selector |

**Example**  
```js
var divs = document.body.query.all('div')
```
<a name="Element+append"></a>

### element.append()
Adds element at the end

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...element | <code>[Element](#Element)</code> &#124; <code>[Array.&lt;Element&gt;](#Element)</code> | Element to append |

**Example**  
```js
var span = waff.element('span.red')
var body = waff.query('body')
body.append(span)
// body
//   <content>
//   span.red

var span = waff.element('span.orange')
var span2 = waff.element('span.red')
var body = waff.query('body')
body.append(span, span2)
// body
//   <content>
//   span.orange
//   span.red

var span = waff.element('span.orange')
var span2 = waff.element('span.red')
var body = waff.query('body')
body.append([span, span2])
// body
//   <content>
//   span.orange
//   span.red
```
<a name="Element+prepend"></a>

### element.prepend()
Adds element at the beginning

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...element | <code>[Element](#Element)</code> &#124; <code>[Array.&lt;Element&gt;](#Element)</code> | Element to prepend |

**Example**  
```js
var span = waff.element('span.red')
var body = waff.query('body')
body.prepend(span)
// body
//   span.red
//   <content>

var span = waff.element('span.orange')
var span2 = waff.element('span.red')
var body = waff.query('body')
body.prepend(span, span2)
// body
//   span.orange
//   span.red
//   <content>

var span = waff.element('span.orange')
var span2 = waff.element('span.red')
var body = waff.query('body')
body.prepend([span, span2])
// body
//   span.orange
//   span.red
//   <content>
```
<a name="Element+before"></a>

### element.before(element)
Adds element before

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>[Element](#Element)</code> | Next element |

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
<a name="Element+after"></a>

### element.after(element)
Adds element after

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>[Element](#Element)</code> | Previous element |

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
<a name="Element+text"></a>

### element.text([text])
Sets text of Element to the given string or returns text string

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [text] | <code>String</code> | Text to set |

**Example**  
```js
var span = waff.element('span')
span.text('<div></div>')
span.text() // <div></div> as a string
```
<a name="Element+html"></a>

### element.html([html])
Sets text of Element to the given string or returns html string

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [html] | <code>String</code> | Html string to set |

**Example**  
```js
var span = waff.element('span')
span.html('<div></div>')
span.html() // <div></div> as a string
```
<a name="Element+path"></a>

### element.path()
Get unique path of an element

**Kind**: instance method of <code>[Element](#Element)</code>  
**Example**  
```js
waff.query('body').path // html > body:nth-child(2)
```
<a name="Element+css"></a>

### element.css(attr, [value])
Gets or sets  elements CSS

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>String</code> &#124; <code>Object</code> | Attribute name or object with values |
| [value] | <code>String</code> | Attribute value |

**Example**  
```js
// Object containing all properties
waff.element('body').css()

// Only `background-color`
waff.element('body').css('background-color')

// sets `background-color` to #f00
waff.element('body').css('background-color', '#f00')

// sets `background-color` to #f00 and `color` to #ffa500
// (supports camelcase and kebabcase)
waff.element('body').css({backgroundColor: '#f00', 'color', '#ffa500'})
```
<a name="Element+attr"></a>

### element.attr(attr, [value])
Gets or sets attributes of element

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Description |
| --- | --- | --- |
| attr | <code>String</code> &#124; <code>Object</code> | Attribute name or object with values |
| [value] | <code>String</code> | Attribute value |

**Example**  
```js
var span = waff.element('span.red')
span.attr('name', 'waffles!')
span.attr({'name': 'waffles!', 'sth': true})
```
<a name="Element+clear"></a>

### element.clear()
Clears element content

**Kind**: instance method of <code>[Element](#Element)</code>  
**Example**  
```js
waff.query('body').clear()
```
<a name="Element+classes"></a>

### element.classes()
custom class list

**Kind**: instance method of <code>[Element](#Element)</code>  

* [.classes()](#Element+classes)
    * [.has(class)](#Element+classes+has) ⇒
    * [.add(class)](#Element+classes+add) ⇒ <code>[classes](#Element+classes)</code>
    * [.remove(class)](#Element+classes+remove) ⇒ <code>[classes](#Element+classes)</code>
    * [.toggle(class)](#Element+classes+toggle) ⇒ <code>[classes](#Element+classes)</code>

<a name="Element+classes+has"></a>

#### element#classese.has(class) ⇒
Checks if element has class or classes

**Kind**: instance method of <code>[classes](#Element+classes)</code>  
**Returns**: Boolean  

| Param | Type | Description |
| --- | --- | --- |
| class | <code>String</code> &#124; <code>Array</code> | class to check |
| [...class] | <code>String</code> | classes to check |

**Example**  
```js
waff.query('body').class.has('cls')
waff.query('body').class.has('cls', 'cls2')
waff.query('body').class.has(['cls', 'cls2'])
```
<a name="Element+classes+add"></a>

#### element#classese.add(class) ⇒ <code>[classes](#Element+classes)</code>
Adds class or classes

**Kind**: instance method of <code>[classes](#Element+classes)</code>  
**Returns**: <code>[classes](#Element+classes)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| class | <code>String</code> &#124; <code>Array</code> | class to add |
| [...class] | <code>String</code> | classes to add |

**Example**  
```js
waff.query('body').class.add('cls')
waff.query('body').class.add('cls', 'cls2')
waff.query('body').class.add(['cls', 'cls2'])
```
<a name="Element+classes+remove"></a>

#### element#classese.remove(class) ⇒ <code>[classes](#Element+classes)</code>
Removes class or classes

**Kind**: instance method of <code>[classes](#Element+classes)</code>  
**Returns**: <code>[classes](#Element+classes)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| class | <code>String</code> &#124; <code>Array</code> | class to remove |
| [...class] | <code>String</code> | classes to remove |

**Example**  
```js
waff.query('body').class.remove('cls')
waff.query('body').class.remove('cls', 'cls2')
waff.query('body').class.remove(['cls', 'cls2'])
```
<a name="Element+classes+toggle"></a>

#### element#classese.toggle(class) ⇒ <code>[classes](#Element+classes)</code>
Toggles class or classes

**Kind**: instance method of <code>[classes](#Element+classes)</code>  
**Returns**: <code>[classes](#Element+classes)</code> - instance  

| Param | Type | Description |
| --- | --- | --- |
| class | <code>String</code> &#124; <code>Array</code> | class to toggle |
| [...class] | <code>String</code> | classes to toggle |

**Example**  
```js
waff.query('body').class.toggle('cls')
waff.query('body').class.toggle('cls', 'cls2')
waff.query('body').class.toggle(['cls', 'cls2'])
```
<a name="Element+unwatch"></a>

### element.unwatch()
Stops observing for DOM changes

**Kind**: instance method of <code>[Element](#Element)</code>  
**Example**  
```js
var element = waff.query('span.red')
element.watch()
element.unwatch()
```
<a name="Element+clone"></a>

### element.clone([deep])
Clones element

**Kind**: instance method of <code>[Element](#Element)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [deep] | <code>Boolean</code> | <code>false</code> | Deep clone |

**Example**  
```js
waff.query('body').clone()
```
<a name="Element+selector"></a>

### element.selector()
Get selector of an element

**Kind**: instance method of <code>[Element](#Element)</code>  
**Example**  
```js
waff.query('body').selector // body
```


# Text prototypes
<a name="Text"></a>

## Text
**Kind**: global class  

* [Text](#Text)
    * [.set()](#Text+set)
    * [.get()](#Text+get)

<a name="Text+set"></a>

### text.set()
Sets nodeValue

**Kind**: instance method of <code>[Text](#Text)</code>  
**Example**  
```js
var text = waff.text('The number of a waffle')
text.set('666')
text.get() // 666 as a string
```
<a name="Text+get"></a>

### text.get()
Gets nodeValue

**Kind**: instance method of <code>[Text](#Text)</code>  
**Example**  
```js
var text = waff.text('The number of a waffle')
text.get() // The number of a waffle
```


# License
Licensed under MIT license.

Copyright (c) 2016 [Casper Seweryn](https://wvffle.net)
