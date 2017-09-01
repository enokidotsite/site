var html = require('choo/html')
var wrapper = require('../components/wrapper')
var entry = require('../components/entries')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div class="x xw p1" style="margin-bottom: -1.6rem">
      ${entry(state.page)}
    </div>
  `
}
