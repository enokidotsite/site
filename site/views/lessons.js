var html = require('choo/html')
var objectValues = require('object-values')
var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="x xw c12 p1">
      ${objectValues(state.page.children).map(entry)}
    </div>
  `
}

function entry (props) {
  return html`
    <a href="${props.url}" class="db p1">
      <div>
        <h2>${props.title}</h2>
      </div>
      <div>
        ${props.excerpt}
      </div>
    </a>
  `
}
