var html = require('choo/html')

var wrapper = require('../components/wrapper')
var format = require('../components/format')

module.exports = wrapper(home)

function home (state, emit) {
  return html`
    <div class="p1">
      <div class="c12 p1 fs2 lh1-25">
        ${text()}
      </div>
    </div>
  `

  function text () {
    return html`
      <div class="c12 copy wmxcopy">
        ${format(state.page.text)}
      </div>
    `
  }
}

