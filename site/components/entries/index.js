var html = require('choo/html')
var format = require('../format')

var formats = {
  blocks: require('./blocks'),
  default: require('./default'),
  longform: require('./longform'),
  quote: require('./quote')
}

module.exports = entry

function entry (props) {
  var entryFormat = getFormat(props.format)
  if (!entryFormat) return ''

  return html`
    <div class="c12">
      <div class="c12 py2">
        ${entryFormat(props)}
      </div>
      <div class="c12 p1"><div class="bb1"></div></div>
    </div>
  `
}

function getFormat (entryFormat) {
  return formats[entryFormat] || formats.default
}