[![Bower](https://img.shields.io/bower/v/waff-query.svg?maxAge=3600&style=flat-square)]()
[![npm](https://img.shields.io/npm/v/waff-query.svg?maxAge=3600&style=flat-square)]()
[![license](https://img.shields.io/github/license/wvffle/waff-query.js.svg?maxAge=3600&style=flat-square)]()
[![GitHub issues](https://img.shields.io/github/issues/wvffle/waff-query.js.svg?maxAge=3600&style=flat-square)]()
<!--
[![npm](https://img.shields.io/npm/dt/waff-query.svg?maxAge=3600&style=flat-square)]()
[![Waffle.io](https://img.shields.io/waffle/label/wvffle/waff-query.js/in%20progress.svg?maxAge=3600&style=flat-square)]()
-->

# Contents
* [Global functions](#global-functions)
* [Content manipulation](#content-manipulation)
* [TextNode value manipulation](#textnode-value-manipulation)
* [Appending elements](#appending-elements)
* [Changing css](#changing-css)
* [Observers](#observers)
* [Element path](#element-path)

# Global functions
<a name="Target"></a>

## Target
**Kind**: global variable  
# Content manipulation
<a name="Element+clear"></a>

## Element.clear()
Clears element content

**Kind**: instance method of <code>Element</code>  
**Example**  
```js
waff.element('body').clear()
```

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

ERROR, Cannot find function.

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


# Appending elements
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


# Observers
<a name="Element+watch"></a>

## Element.watch([options])
Observes for DOM changes

**Kind**: instance method of <code>Element</code>  
**Emits**: <code>event:attr change</code>, <code>attr:\*</code>, <code>event:child add</code>, <code>event:child remove</code>, <code>event:text change</code>  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>MutationObserverInit</code> | MutationObserver options |

**Example**  
```js
var element = waff.query('span.red')
element.watch()
```

* [.watch([options])](#Element+watch)
    * ["attr change"](#Element+watch.event_attr change)
    * ["attr:*"](#Element+watch.attr_*)
    * ["child add"](#Element+watch.event_child add)
    * ["child remove"](#Element+watch.event_child remove)
    * ["text change"](#Element+watch.event_text change)

<a name="Element+watch.event_attr change"></a>

### "attr change"
Event emitted on attribute change

**Kind**: event emitted by <code>[watch](#Element+watch)</code>  
**Example**  
```js
element.on('attr change', function(e){
 // e.target
 // e.attr
 // e.value
 // e.oldValue
})
```
<a name="Element+watch.attr_*"></a>

### "attr:*"
Event emitted on specific attribute change

**Kind**: event emitted by <code>[watch](#Element+watch)</code>  
**Example**  
```js
element.on('attr:class', function(e){
 // e.target
 // e.attr
 // e.value
 // e.oldValue
})
```
<a name="Element+watch.event_child add"></a>

### "child add"
Event emitted on child addition

**Kind**: event emitted by <code>[watch](#Element+watch)</code>  
**Example**  
```js
element.on('child add', function(e){
 // e.target
 // e.nodes
})
```
<a name="Element+watch.event_child remove"></a>

### "child remove"
Event emitted on child remove

**Kind**: event emitted by <code>[watch](#Element+watch)</code>  
**Example**  
```js
element.on('child remove', function(e){
 // e.target
 // e.nodes
})
```
<a name="Element+watch.event_text change"></a>

### "text change"
Event emitted on text change

**Kind**: event emitted by <code>[watch](#Element+watch)</code>  
**Example**  
```js
element.on('text change', function(e){
 // e.target
 // e.value
 // e.oldValue
})
```

<a name="Element+unwatch"></a>

## Element.unwatch()
Stops observing for DOM changes

**Kind**: instance method of <code>Element</code>  
**Example**  
```js
var element = waff.query('span.red')
element.watch()
element.unwatch()
```


# Element path
ERROR, Cannot find function.
