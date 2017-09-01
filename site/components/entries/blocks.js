var html = require('choo/html')
var format = require('../format')

module.exports = blocks

function blocks (props) {
  return html`
    <div class="x xw psr">
      ${props.text ? text() : ''}
      <div class="c12 x xw" sm="c12">
        ${props.blocks.map(block)}
      </div>
    </div>
  `

  function text () {
    return html` 
      <div class="c12 p1" sm="c12">
        <div class="wmxcopy copy">
          ${props.text ? format(props.text) : ''}
        </div>
      </div>
    `
  }

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