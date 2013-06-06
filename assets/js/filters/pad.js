
var app = require('../');

function padFilter() {
  return function(text, length, padChar) {
    if (! text) return '';
    if (! length) length = 2;
    if (! padChar) padChar = '0';
    while (text.length < length) {
      text = padChar + text;
    }
    return text;
  }
}

app.filter('pad', [ padFilter ]);
