var html = require('choo/html')
var objectValues = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="x xw c12 px1" style="padding-top: 6.25vh; padding-bottom: 6.25vh">
      ${objectValues(state.page.children).map(entry)}
    </div>
  `
}

function entry (props) {
  var image = props.files[props.thumbnail] || { }
  return html`
    <a href="${props.url}" class="x xw c12" style="margin: 6.25vh 0">
      <div class="c8 p1 mb2 fs4 ase wmxheading tid" sm="c12">
        ${props.title}
      </div>
      <div class="c4 p1 ase mb2" sm="c12">
        <div
          class="psr bggreylight"
          style="padding-bottom: ${image.ratioY * 100}%"
        >
          <img src="${image.url}" class="psa t0 l0 c12" />
        </div>
      </div>
      <div class="c4 p1 tcgrey" sm="c12">
        <ul>
          <li>${props.date}</li>
          <li>${props.tags.join(', ')}</li>
        </ul>
      </div>
      <div class="c6 p1" sm="c12">
        <div class="copy wmxcopy">
          ${format(props.excerpt)}
        </div>
      </div>
    </a>
  `
}
