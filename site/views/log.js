var html = require('choo/html')
var objectValues = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(log)

function log (state, emit) {
  return html`
    <div class="x xw p1" style="margin-bottom: -1.6rem">
      <div class="c12">
        ${objectValues(state.page.children).reverse().map(entry)}
      </div>
    </div>
  `
}

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
  switch (entryFormat) {
    case 'blocks': return blocks
    case 'longform': return longform
  }
  return basic
}

function longform (props) {
  return html`
    <div class="c12 x xw">
      <div class="c12 p1">
        <div class="wmxheading mb2">
          <h2>${props.title}</h2>
        </div>
      </div>
      <div class="c4 p1 tcgrey">
        ${props.date}<br>
        ${props.tags.join(', ')}
      </div>
      <div class="c8 p1">
        <div class="copy wmxcopy">
          ${props.text ? format(props.text) : ''}
        </div>
      </div>
    </div>
  `
}

function blocks (props) {
  return html`
    <div class="x xw psr">
      <div class="c12 p1" sm="c12">
        <div class="wmxcopy copy">
          ${props.text ? format(props.text) : ''}
        </div>
      </div>
      <div class="c12 x xw" sm="c12">
        ${props.blocks.map(block)}
      </div>
    </div>
  `

  function block (props) {
    var image = getImage(props.image) || { }
    return html`
      <div class="${props.style} p1">
        <div
          class="psr bggreylight"
          style="padding-bottom: ${image.ratioY * 100}%"
        >
        <a href="${props.url}" target="_blank">
          <img src="${image.url}" class="psa t0 l0 c12" />
        </a>
      </div>
    `
  }

  function getImage (filename) {
    return props.files[filename]
  }
}

function basic (props) {
  return html`
    <div class="p1">default</div>
  `
}