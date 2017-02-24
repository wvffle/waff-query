var html = '<div id="i1">aaa</div><div id="i2">bbb</div><div id="i3" class="i3">ccc</div>';
html += '<div id="empty"></div><div class="empty nah" meh="nah()"><p></p></div>';

beforeEach(function() {
  global.clean = require('jsdom-global')(html);
  global.waff = require('../');
  global.i1 = document.getElementById('i1');
  global.i2 = document.getElementById('i2');
  global.i3 = document.getElementById('i3');
  global.empty = document.getElementById('empty');
  global.nah = document.querySelector('.nah');
  global.p = document.querySelector('p');
});

afterEach(function() {
  clean();
});

global.expect = require('expect.js');
