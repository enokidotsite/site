var html = require('choo/html')
var objectValues = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(log)

function log (state, emit) {
  return html`
    <div class="x xw p1">
      <div class="c12">
        ${objectValues(state.page.children).map(entry)}
      </div>
    </div>
  `
}

function entry (props) {
  var format = getFormat(props.format)
  return format(props)
}

function getFormat (format) {
  switch (format) {
    case 'blocks': return blocks
    return basic
  }
}

function blocks (props) {
  return html`
    <div class="x xw psr">
      <div class="c4 psr" sm="c12">
        <div class="psst" style="top: 1rem">
          <div class="p1 copy">
            ${props.text ? format(props.text) : ''}
          </div>
          <div class="p1 tcgrey">
            <a href="${props.url}">Permalink</a>
          </div>
        </div>
      </div>
      <div class="x xw c8" sm="c12">
        ${props.blocks.map(block)}
      </div>
    </div>
  `

  function block (props) {
    var image = getImage(props.image)
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
    <div>default</div>
  `
}